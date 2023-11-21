import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import * as THREE from 'three';
import { OrbitControls, Bounds, Box } from "@react-three/drei";
import { useStore } from "./store/useStore.jsx";

import Info from "./Info.jsx";
import Pivot from "./Pivot.jsx";
import Cloud from "./Cloud.jsx";
import Arrow from "./Arrow.jsx";
import Thumbnail from "./Thumbnail.jsx";


export default function App() {
    const position = useStore((state) => state.position);
    
    const vectors = useStore((state) => state.vectors);
    const [imageData, setImageData] = useState('');
    const [colorWheel, setColorWheel] = useState('');
    const [colorPalette, setColorPalette] = useState('');
    const [colorScheme, setColorScheme] = useState('');
    const [schemeError, setSchemeError] = useState('');
    const [oldPos, setOldPos] = useState('');
    const oldposition = useStore((state) => state.oldposition);
    const colorclicked = useStore((state) => state.colorclicked);
    
    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch('http://127.0.0.1:5000/get-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([colorclicked, oldposition]),
                });
                const data = await response.json();
                setImageData(data.imageData);
                setOldPos(data.newPosition);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }
        async function fetchImageColors() {
            try {
                const response = await fetch('http://127.0.0.1:5000/get-colors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([colorclicked, oldposition]),
                });
                const data = await response.json();
                setColorPalette(data.colorPalette);
                setColorWheel(data.colorWheel);
                setColorScheme(data.colorScheme);
                setSchemeError(data.schemeError);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        fetchImage()
        .then((result) => {
          console.log('First call finished', imageData);
          // After the first call is finished, start the second call
          return fetchImageColors();
        })
        .then((result) => {
          console.log('Second call finished', colorWheel);
          // Both calls are now finished
        })
        .catch((error) => {
          console.error('An error occurred', error);
        });
        
    }, [colorclicked, oldposition]);

    return (
        <>
            <Info />
            <Thumbnail imageData={imageData} colorPalette={colorPalette} colorWheel={colorWheel} 
                        colorScheme={colorScheme} schemeError={schemeError} />
            
            <Canvas>
                <OrbitControls />
                <ambientLight intensity={1} />
                <pointLight position={[20, 20, 20]} />

                <Bounds
                    fit
                    margin={3}
                >
                    <Pivot position={position} imageData={imageData} />
                    {Object.keys(vectors).map((vec, index) => (
                        <Arrow
                            position={position}
                            index={index}
                            direction={vectors[vec].direction}
                            color={vectors[vec].color}
                            colorname={vec}
                            oldpos={oldPos}
                            scale={0.5}
                        />
                    ))}
                </Bounds>
                
                <Cloud />
            </Canvas>
            
        </>
    );

}
