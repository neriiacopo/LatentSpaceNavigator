from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
import io
import base64
import legacy 
import dnnlib
import pickle
import torch
import numpy as np
import pandas as pd
import extcolors
from colormap import rgb2hex
import matplotlib.pyplot as plt
from skimage.transform import resize
from utils.color import hex2rgb, rgb2hsv, color_to_df, compute_hue_difference, extract_palette
from utils.color_harmony import color_harmony
import json
import PIL
import umap

print('numpy version', np.__version__)
app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": ["https://neriiacopo.github.io", "http://localhost:5173"]}})


device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(device)


mapping = 'umap'

model_file = 'data/network-snapshot-014000.pkl'
pca_file = f'data/{mapping}.pkl'
directions = f'../ui/public/vector.json'
points = f'../ui/public/cloud.json'

with dnnlib.util.open_url(model_file) as f:
     model = legacy.load_network_pkl(f)['G_ema'] # type: ignore

pca_reloaded = pickle.load(open(pca_file,'rb')) 

if mapping == 'pca':
    start_vec = np.array([0.76836109, -0.46504676, -0.04241134]) 
elif mapping == 'umap':
    start_vec = np.array([7.502209, 5.23363, 7.22592])
else: 
    start_vec = np.zeros(3)

with open(directions, "r") as infile: 
    directions = json.load(infile)
with open(points, "r") as infile: 
    points = json.load(infile)
print(points.keys())

with open('data/quantized_colors_and_names.pkl', 'rb') as infile:
    colors_dict = pickle.load(infile) 

map_colors = {rgb2hex(*(np.array(v)*255).astype(int)):k for k,v in zip(colors_dict['names'], colors_dict['RGB'])}
print(map_colors)

# Define the root route
@app.route('/')
def home():
    return 'Welcome to the Flask App!'

def convert_position(color, oldpos, lambd=7):
    color512d = directions[color]['512d']
    if '1' in color:
        lambd = 2
    position_512 = np.array(oldpos) + lambd * np.array(color512d)
    #position_512 = pca_reloaded.inverse_transform(np.array(position).reshape(1,-1))
    return position_512

def generate_image(vec):
    G = model.to(device) # type: ignore
    label = torch.zeros([1, G.c_dim], device=device)
    W = torch.from_numpy(np.repeat(vec, 14, axis=0).reshape(1, 14, 512).copy()).to(device)
    img = G.synthesis(W, noise_mode='const')
    img = (img.permute(0, 2, 3, 1) * 127.5 + 128).clamp(0, 255).to(torch.uint8)
    return PIL.Image.fromarray(img[0].cpu().numpy(), 'RGB')    
            
def get_color_harmony_plot(colors):
    color_hues = [rgb2hsv(*col)[0] for col in colors[0]]  # Example hues
    hue_wheel_image = plt.imread('data/Linear_RGB_color_wheel.png')
    hue_wheel_image = resize(hue_wheel_image, (256,256))
    # Display the hue wheel image
    fig, ax = plt.subplots(dpi=80)
    ax.imshow(hue_wheel_image)
    ax.axis('off')  # Turn off axis
    # Assuming the center of the hue wheel and the radius are known
    center_x, center_y, radius = 128, 128, 126
    # Define your color hues in degrees
    
    # Convert degrees to radians and plot the radii
    for i, hue in enumerate(color_hues):
        # Calculate the end point of the radius
        end_x = center_x + radius * np.cos(np.radians(hue - 90))
        end_y = center_y + radius * np.sin(np.radians(hue - 90))

        # Plot a line from the center to the edge of the hue wheel
        ax.plot([center_x, end_x], [center_y, end_y], 'w-', markersize=4)  # 'w-' specifies a white line
        ax.plot([end_x], [end_y], color=colors[0][i], marker='o', markerfacecolor=colors[0][i], markersize=15)  # 'w-' specifies a white line
    
    # plt.savefig('test_small.png')
    byte_arr_wheel = io.BytesIO()
    plt.savefig(byte_arr_wheel, format='PNG')  # convert the PIL image to byte array
    encoded_color_wheel = base64.encodebytes(byte_arr_wheel.getvalue()).decode('ascii')  # encode as base64
    plt.close()
    return color_hues, encoded_color_wheel    

def get_colors_harmony_type(colors):
    color_hues = [rgb2hsv(*col)[0] - 90 for col in colors[0]]  # Example hues
    scheme, confidence = color_harmony(color_hues)
    print(f"The color scheme is {scheme} with an error of {confidence}")
    return scheme, confidence
    
def get_image_as_base64(color, oldpos):
    if color is not None:
        vec = convert_position(color, oldpos).reshape((1,512))
    else:
        vec = np.array(oldpos).reshape((1,512))
    new_position = [float(v) for v in list(vec.reshape(512))]
    pil_old = generate_image(np.array(oldpos).reshape((1,512)))
    pil_img = generate_image(vec)
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG')  # convert the PIL image to byte array
    encoded_img = base64.encodebytes(byte_arr.getvalue()).decode('ascii')  # encode as base64
    
    diff_img = compute_hue_difference(pil_img, pil_old)  # encode as base64
    return encoded_img, new_position, diff_img, pil_img

def get_color_as_base64(pil_img):
    color_palette = extract_palette(pil_img, K=5)
    color_wheel, encoded_color_wheel = get_color_harmony_plot(color_palette)
    scheme, confidence = get_colors_harmony_type(color_palette)
    return color_palette, color_wheel, scheme, confidence, encoded_color_wheel

@app.route('/get-image', methods=['POST'])
# @cross_origin(origins="https://neriiacopo.github.io")  # Specify the allowed origin

def send_image():
    input_data = request.json
    color, old_pos = input_data
    # color = map_colors[color]
    encoded_img, new_position, difference_image, pil_img = get_image_as_base64(color, old_pos)
    color_palette, color_wheel, scheme, confidence, encoded_color_wheel = get_color_as_base64(pil_img)
    return jsonify(texture='data:image/png;base64,'+encoded_img, multiposition=new_position,
                   map='data:image/png;base64,'+difference_image, paletteimg='data:image/png;base64,'+encoded_color_wheel,
                   palette=[rgb2hex(*list(col.astype(int))) for col in color_palette[0] * 255], compass={'type':scheme, 'angles':color_wheel})


@app.route('/get-index', methods=['POST'])
# @cross_origin(origins="https://neriiacopo.github.io")  # Specify the allowed origin

def send_index():
    input_data = request.json
    color, idx_point = input_data
    oldpos = points[color]['cloud'][int(idx_point)]['512d']
    encoded_img, new_position, difference_image, pil_img = get_image_as_base64(None, oldpos)
    color_palette, color_wheel, scheme, confidence, encoded_color_wheel = get_color_as_base64(pil_img)
    return jsonify(texture='data:image/png;base64,'+encoded_img, multiposition=new_position, 
                   map='data:image/png;base64,'+difference_image, paletteimg='data:image/png;base64,'+encoded_color_wheel,
                   palette=[rgb2hex(*list(col.astype(int))) for col in color_palette[0] * 255], compass={'type':scheme, 'angles':color_wheel})
    

if __name__ == '__main__':
    app.run()
