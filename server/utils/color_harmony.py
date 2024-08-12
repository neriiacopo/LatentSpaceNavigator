from itertools import combinations
import numpy as np

def adaptive_clustering_2(image_path, K=8, max_iterations=100, convergence_threshold=0.01):
    # Load the image in RGB
    if type(image_path) == str:
        image = cv2.imread(image_path, cv2.IMREAD_COLOR)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    else:
        image = np.array(image_path)
    
    original_shape = image.shape
    # Flatten the image to a 2D array of pixels (3 columns for R, G, B)
    pixels = image.reshape(-1, 3)
    if np.isnan(pixels).any() or (pixels == 0).all():
        print("Data contains NaN values")
        print(image_path)
        return np.array([(0,0,0)]*K), [len(pixels)]*K
    
    # Initial K-means to segment the image
    kmeans = KMeans(n_clusters=K, random_state=0)
    labels = kmeans.fit_predict(pixels)
    centroids = kmeans.cluster_centers_

    old_labels = labels

    # Adaptive iteration
    n_iterations = 0
    while n_iterations < max_iterations:
        # Recalculate centroids from labels
        centroids = np.array([pixels[labels == i].mean(axis=0) for i in range(K)])

        # Re-cluster using updated centroids
        kmeans = KMeans(n_clusters=K, init=centroids, n_init=1)
        labels = kmeans.fit_predict(pixels)

        # Check for convergence
        if np.sum(labels != old_labels) < convergence_threshold * len(pixels):
            break

        old_labels = labels
        n_iterations += 1

    cnts = np.array([len(pixels[labels == i]) for i in range(K)])
    
    return np.array(centroids) / 255, cnts

def extract_palette(image_path, K=5, method=adaptive_clustering_2):
    #extcolors.extract_from_path(im, tolerance=K, limit=13)
    return method(image_path, K)

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
    if len(hues) > 1:
        confidence = min([abs((hue - other_hue) % 360 - 180) for hue, other_hue in combinations(hues, 2)])
    else:
        return False, 0
    return any(abs((hue - other_hue) % 360 - 180) < 15 for hue, other_hue in combinations(hues, 2)), np.round(confidence)

# Function to check if the colors are triadic
def is_triadic(hues):
    for hue, other_hue, third_hue in combinations(hues, 3):
        if abs((hue - other_hue) % 360 - 120) < 15 or abs((third_hue - other_hue) % 360 - 120) < 15:
            if abs((third_hue - other_hue) % 360 - 120) < 15 or abs((third_hue - hue) % 360 - 120) < 15:
                if abs((other_hue - hue) % 360 - 120) < 15 or abs((other_hue - third_hue) % 360 - 120) < 15:
                    return True, min(abs((third_hue - other_hue) % 360 - 120), abs((third_hue - hue) % 360 - 120), abs((hue - other_hue) % 360 - 120))
    return False, 0

# Function to check if the colors are split complementary
def is_split_complementary(hues):
    for hue, other_hue, third_hue in combinations(hues, 3):
        if (abs((hue - other_hue) % 360 - 150) < 15 or abs((hue - other_hue) % 360 - 210) < 15) or (
            abs((hue - third_hue) % 360 - 150) < 15 or abs((hue - third_hue) % 360 - 210) < 15):
            if (abs((other_hue - hue) % 360 - 150) < 15 or abs((other_hue - hue) % 360 - 210) < 15) or (
                abs((other_hue - third_hue) % 360 - 150) < 15 or abs((other_hue - third_hue) % 360 - 210) < 15):
                if (abs((third_hue - hue) % 360 - 150) < 15 or abs((third_hue - hue) % 360 - 210) < 15) or (
                abs((third_hue - other_hue) % 360 - 150) < 15 or abs((third_hue - other_hue) % 360 - 210) < 15):
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
