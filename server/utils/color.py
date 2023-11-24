import pandas as pd
from colormap import rgb2hex
from PIL import Image
import io
import base64

def hex2rgb(hex_value):
    h = hex_value.strip("#") 
    rgb = tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
    return rgb

def rgb2hsv(r, g, b):
    # Normalize R, G, B values
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    
    # h, s, v = hue, saturation, value
    max_rgb = max(r, g, b)    
    min_rgb = min(r, g, b)   
    difference = max_rgb-min_rgb 
    
    # if max_rgb and max_rgb are equal then h = 0
    if max_rgb == min_rgb:
        h = 0
    
    # if max_rgb==r then h is computed as follows
    elif max_rgb == r:
        h = (60 * ((g - b) / difference) + 360) % 360
    
    # if max_rgb==g then compute h as follows
    elif max_rgb == g:
        h = (60 * ((b - r) / difference) + 120) % 360
    
    # if max_rgb=b then compute h
    elif max_rgb == b:
        h = (60 * ((r - g) / difference) + 240) % 360
    
    # if max_rgb==zero then s=0
    if max_rgb == 0:
        s = 0
    else:
        s = (difference / max_rgb) * 100
    
    # compute v
    v = max_rgb * 100
    # return rounded values of H, S and V
    return tuple(map(round, (h, s, v)))
 
def color_to_df(input):
    colors_pre_list = str(input).replace('([(','').split(', (')[0:-1]
    df_rgb = [i.split('), ')[0] + ')' for i in colors_pre_list]
    df_percent = [i.split('), ')[1].replace(')','') for i in colors_pre_list]
    
    #convert RGB to HEX code
    df_color_up = [rgb2hex(int(i.split(", ")[0].replace("(","")),
                          int(i.split(", ")[1]),
                          int(i.split(", ")[2].replace(")",""))) for i in df_rgb]
    
    df = pd.DataFrame(zip(df_color_up, df_percent), columns = ['c_code','occurence'])
    return df


def compute_hue_difference(image1, image2):
    # Convert images to HSV
    hsv_image1 = image1.convert("HSV")
    hsv_image2 = image2.convert("HSV")

    # Split into H, S, and V
    h1, _, _ = hsv_image1.split()
    h2, _, _ = hsv_image2.split()

    # Compute absolute difference in hue
    diff = Image.new('L', h1.size)
    for i in range(h1.size[0]):
        for j in range(h1.size[1]):
            hue_diff = abs(h1.getpixel((i, j)) - h2.getpixel((i, j)))
            # Normalize the difference to be between 0 and 255
            normalized_diff = int((hue_diff / 180.0) * 255)
            # Invert the value to match the requested representation
            inverted_diff = 255 - normalized_diff
            diff.putpixel((i, j), inverted_diff)

    diff_img = diff.convert('RGB')
    byte_arr_diff = io.BytesIO()
    diff_img.save(byte_arr_diff, format='PNG')  # convert the PIL image to byte array
    encoded_diff = base64.encodebytes(byte_arr_diff.getvalue()).decode('ascii')
    return encoded_diff
