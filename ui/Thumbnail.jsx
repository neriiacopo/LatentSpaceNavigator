import { useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { startTransition } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import * as THREE from 'three';
import { useStore } from "./store/useStore";

export default function Thumbnail({}) {
    const thumbS = {
        style: "flex", // Using flex for inner alignment
        justifyContent: "center",
    };

    const id = useStore((state) => state.id);
    const imagedata = useStore((state) => state.gens[id].map);
    const colorPalette = useStore((state) => state.gens[id].palette);
    const colorScheme = useStore((state) => state.gens[id].compass.type);
    const hueValues = useStore((state) => state.gens[id].compass.angles);
    
    const ColorPalette = ({ colors }) => {
        return (
          <div style={{ display: 'flex' }}>
            {colors.map((color, index) => (
              <div key={index} style={{
                backgroundColor: color,
                width: '100px', // or '20%' for equal distribution in a flex container
                height: '100px',
                flex: '1' // makes each color box grow equally
              }} />
            ))}
          </div>
        );
      };
      
    
      // Convert hue to RGB color
      const hueToColor = (hue) => `hsl(${hue}, 100%, 50%)`;
      
      // Create a line in polar coordinates
      const HueLine = ({ hue, radius }) => {
        const meshRef = useRef();
      
        // Convert hue to vector
        const angle = hue * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
      
        // Update the line color on each frame
        useFrame(() => {
          if (meshRef.current) {
            meshRef.current.material.color.setStyle(hueToColor(hue));
          }
        });
      
        return (
          <line ref={meshRef}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attachObject={['attributes', 'position']}
                array={new Float32Array([0, 0, 0, x, y, 0])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={hueToColor(hue)} />
          </line>
        );
        };
      
      // The polar plot component
      const PolarPlot = ({ hueValues, radius }) => {
        return (
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {hueValues.map((hue, index) => (
              <HueLine key={index} hue={hue} radius={radius} />
            ))}
          </Canvas>
        );
      };

    return (
        <>
            <div
                id="thumbnail"
                className="info"
            >
                {/* <div
                    class="blurred"
                    style={{ flexGrow: 1 }}
                > */}
            <div style={thumbS}>
                <h3>textile </h3>
                    <div>
                            {imagedata ? (
                                <img
                                    src={imagedata}
                                    alt="Loaded"
                                    width="100%"
                                    height="100px"
                                    backgroundcolor="blue"
                                />
                            ) : (
                                <p>No image loaded</p>
                            )}
                        </div>
                        <h3>palette </h3>
                        <div>
                            <ColorPalette colors={colorPalette} />
                        </div>
                        <h3>color harmony </h3>
                        <p>
                            <b>{colorScheme}</b>
                        </p>
                        <PolarPlot hueValues={hueValues} radius={10} />
                    </div>
                </div>
            {/* </div> */}
        </>
    );
}
