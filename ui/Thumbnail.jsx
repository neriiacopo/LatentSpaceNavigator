import { useState, useEffect, useRef } from "react";

import { useStore } from "./store/useStore";

export default function Thumbnail({
    imageData,
    colorPalette,
    colorWheel,
    colorScheme,
    schemeError,
}) {
    const thumbS = {
        style: "flex", // Using flex for inner alignment
        justifyContent: "center",
    };

    const imageUrl = imageData ? `data:image/png;base64,${imageData}` : null;
    const colorUrl = colorWheel ? `data:image/png;base64,${colorWheel}` : null;

    // const canvas = document.getElementById('colorWheel');
    // const ctx = canvas.getContext('2d');

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;
    // const radius = Math.min(centerX, centerY) * 0.9; // 90% of half the canvas width or height
    // const sliceAngle = (2 * Math.PI) / Object.keys(colorPalette).length; // Angle for each slice

    return (
        <>
            <div
                id="thumbnail"
                style={{
                    height: "100%",
                    backgroundColor: "red",
                    display: "flex",
                }}
            >
                <div
                    class="blurred"
                    style={{ flexGrow: 1 }}
                >
                    <div style={thumbS}>
                        <h3>textile </h3>
                        <div>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Loaded"
                                    width="100%"
                                    height="100px"
                                    backgroundColor="blue"
                                />
                            ) : (
                                <p>No image loaded</p>
                            )}
                        </div>
                        <h3>palette </h3>
                        <p>
                            {Object.entries(colorPalette).map((obj, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: "100%", // Set the width of the rectangle
                                        height: "10px", // Set the height of the rectangle
                                        backgroundColor: obj[1], // Use the hex code as the background color
                                    }}
                                />
                            ))}
                        </p>
                        <h3>color harmony </h3>
                        <p>
                            <b>{colorScheme}</b>, {schemeError} error{" "}
                        </p>
                        {colorUrl ? (
                            <img
                                src={colorUrl}
                                alt="Loaded"
                                width="100%"
                            />
                        ) : (
                            <p>No image loaded</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
