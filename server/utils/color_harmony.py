from itertools import combinations
import numpy as np

# Function to check if the colors are monochromatic
def is_monochromatic(hues):
    confidence = np.mean([abs(hue - hues[0]) for hue in hues])
    corrects = sum([1 if abs(hue - hues[0]) < 10  else 0 for hue in hues])
    correct = True if corrects >= (len(hues)) else False
    return correct,  np.round(confidence)

# Function to check if the colors are analogous
def is_analogous(hues):
    confidence = np.mean([abs(hue - hues[0]) for hue in hues])
    corrects = sum([1 if abs(hue - hues[0]) <= 60  else 0 for hue in hues])
    correct = True if corrects >= (len(hues)) else False
    return correct,  np.round(confidence)

# Function to check if the colors are complementary
def is_complementary(hues):
    confidence = min([abs((hue - other_hue) % 360 - 180) for hue, other_hue in combinations(hues, 2)])
    return any(abs((hue - other_hue) % 360 - 180) < 15 for hue, other_hue in combinations(hues, 2)), np.round(confidence)

# Function to check if the colors are triadic
def is_triadic(hues):
    for hue, other_hue, third_hue in combinations(hues, 3):
        if abs((hue - other_hue) % 360 - 120) < 15 or abs((third_hue - other_hue) % 360 - 120) < 15:
            if abs((third_hue - other_hue) % 360 - 120) < 15 or abs((third_hue - hue) % 360 - 120) < 15:
                return True, min(abs((third_hue - other_hue) % 360 - 120), abs((third_hue - hue) % 360 - 120), abs((hue - other_hue) % 360 - 120))
    return False, 0

# Function to check if the colors are split complementary
def is_split_complementary(hues):
    for hue, other_hue, third_hue in combinations(hues, 3):
        if (abs((hue - other_hue) % 360 - 150) < 15 or abs((hue - other_hue) % 360 - 210) < 15) or (
            abs((hue - third_hue) % 360 - 150) < 15 or abs((hue - third_hue) % 360 - 210) < 15):
            if (abs((hue - other_hue) % 360 - 150) < 15 or abs((hue - other_hue) % 360 - 210) < 15) or (
                abs((other_hue - third_hue) % 360 - 150) < 15 or abs((other_hue - third_hue) % 360 - 210) < 15):
                return True, min(min(abs((hue - other_hue) % 360 - 150), abs((hue - other_hue) % 360 - 210)), 
                                 min(abs((hue - third_hue) % 360 - 150), abs((hue - third_hue) % 360 - 210)), 
                                 min(abs((third_hue - other_hue) % 360 - 150), abs((third_hue - other_hue) % 360 - 210)), )
    return False, 0

# Function to check if the colors are double complementary
def is_double_complementary(hues):
    for hues_4 in combinations(hues, 4):
        count = 0
        amount = 0
        for hues_2 in combinations(hues_4, 2):
            if is_complementary(hues_2)[0]:
                count += 1
                amount += is_complementary(hues_2)[1]
                
        if count >= 2: 
            return True, np.round(amount / count)
    return False, 0

# Main function to determine the color harmony scheme
def color_harmony(hues):
    if is_monochromatic(hues)[0]:
        return "monochromatic", is_monochromatic(hues)[1]
    elif is_analogous(hues)[0]:
        return "analogous", is_analogous(hues)[1]
    elif is_complementary(hues)[0]:
        return "complementary", is_complementary(hues)[1]
    elif is_triadic(hues)[0]:
        return "triadic", is_triadic(hues)[1]
    elif is_split_complementary(hues)[0]:
        return "split complementary", is_split_complementary(hues)[1]
    elif is_double_complementary(hues)[0]:
        return "double complementary", is_double_complementary(hues)[1]
    else:
        return "None", 0



        
class ColorHarmony_Evaluation():
    def __init__(self, annotations, df, space, colors_list, color_bins, compute_s=False, variable='H1', categorical=True, repo_folder='.'):
        super().__init__(annotations, df, space, colors_list, color_bins, compute_s, variable, categorical, repo_folder)
    
    def find_closest_color_harmony_scheme(self, three_colors):
        # find optimal lambda being the largest variation with <10% structural change
        return ''
        
    def precision_color_harmony(self, scheme, three_colors):
        #options: colors heatmap to show confusion between original color, final color, direction color
        return ''
            
if __name__ == '__main__':
    print('...')
    
    parser = argparse.ArgumentParser(description='Process input arguments')
    
    parser.add_argument('--df_generated_images', type=str, default='data/textile_annotated_files/final_sim_seeds0000-100000.csv')
    parser.add_argument('--df_separation_vectors', type=str, default='data/separation_vector_textile.csv') #
    parser.add_argument('--df_original_images', type=str, default='/home/ludosc/common/textile_images/omniart_v3_textiles.csv') #
    
    args = parser.parse_args()
    
    df = pd.read_csv(args.df_file).fillna('#000000')
    df.columns = [df.columns[0], 'top1col', 'top2col', 'top3col']
    
    df_separation_vectors = pd.read_csv(args.df_separation_vectors)
    
    for i,row in df_separation_vectors.iterrows():
        if i == 0:
            colors_list = row['Classes'].split(', ')
            color_bins = [int(x.strip('[]')) for x in row['Bins'].split(', ')]
            variable = row['Variable']
            space = row['Space']
            disentanglemnet_plot = DisentanglementPlotting(annotations, df, space=space, colors_list=colors_list, color_bins=color_bins, variable=variable) 
            
        color = row['Feature']
        method = row['Method']
        subfolder = row['Subfolder']
        
        if 'GANSpace' in method:
            print('Skipping GANSpace')
            continue
        
        
        separation_vector = np.array([float(x.strip('[] ')) for x in row['Separation Vector'].replace('\n', ' ').split(' ') if x.strip('[] ') != ''])
        
        #....
    
        
        