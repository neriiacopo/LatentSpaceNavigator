import { useStore } from "./store/useStore";

export default function Thumbnail({ imageDifference, colorPalette, colorWheel, colorScheme, schemeError }) {
    
    const thumbS = {
        style: 'flex',    // Using flex for inner alignment
        justifyContent: 'center', 
    };

    const imageUrl = imageDifference ? `data:image/png;base64,${imageDifference}` : null;
    const colorUrl = colorWheel ? `data:image/png;base64,${colorWheel}` : null;
    // const canvas = document.getElementById('colorWheel');
    // const ctx = canvas.getContext('2d');

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;
    // const radius = Math.min(centerX, centerY) * 0.9; // 90% of half the canvas width or height
    // const sliceAngle = (2 * Math.PI) / Object.keys(colorPalette).length; // Angle for each slice

    return (
        <>
            <div class="info" id="thumbnail">
                <div style={thumbS}>
                    <h3>textile </h3>
                    {imageUrl ? <img src={imageUrl} alt="Loaded" width="100%" /> : <p>No image loaded</p>}
                    <h3>palette </h3>
                    <p>
                        {Object.entries(colorPalette).map(
                            (obj, index) =>
                                <div key={index} style={{
                                width: '100%',      // Set the width of the rectangle
                                height: '10px',      // Set the height of the rectangle
                                backgroundColor: obj[1], // Use the hex code as the background color
                                }} />
                        )}
                    </p>
                    <h3>color harmony </h3>
                    <p><b>{colorScheme}</b>, {schemeError} error </p>
                    {colorUrl ? <img src={colorUrl} alt="Loaded" width="100%" /> : <p>No image loaded</p>}

                </div>
            </div>
        </>
    );
}
