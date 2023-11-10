import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { OrbitControls, Bounds, Box } from "@react-three/drei";
import { useStore } from "./store/useStore.jsx";

import Info from "./Info.jsx";
import Pivot from "./Pivot.jsx";
import Cloud from "./Cloud.jsx";
import Arrow from "./Arrow.jsx";

export default function App() {
    const position = useStore((state) => state.position);
    const vectors = useStore((state) => state.vectors);

    return (
        <>
            <Info />
            <Canvas>
                <OrbitControls />
                <ambientLight intensity={1} />
                <pointLight position={[20, 20, 20]} />

                <Bounds
                    fit
                    margin={3}
                >
                    <Pivot position={position} />
                    {Object.keys(vectors).map((vec, index) => (
                        <Arrow
                            position={position}
                            index={index}
                            direction={vectors[vec].direction}
                            color={vectors[vec].color}
                            scale={0.5}
                        />
                    ))}
                </Bounds>

                <Cloud />
            </Canvas>
        </>
    );
}
