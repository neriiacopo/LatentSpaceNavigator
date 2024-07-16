import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Vector3 } from "three";
import { OrbitControls, Bounds, Box } from "@react-three/drei";
import { useStore } from "./store/useStore.jsx";

import Info from "./Info.jsx";
import Pivot from "./Pivot.jsx";
import Cloud from "./Cloud.jsx";
import History from "./History.jsx";
import Lines from "./Lines.jsx";
import Wheel from "./Wheel.jsx";
import Extra from "./Extra.jsx";
import GenList from "./GenList.jsx";

export default function App() {
    const id = useStore((state) => state.id);
    const position = useStore((state) => state.gens[id].position);
    const vectors = useStore((state) => state.vectors);
    const cloudPick = useStore((state) => state.cloudPick);

    const ref = useRef();

    useLayoutEffect(() => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        const id = getRandomInt(100);
        console.log(`#FFFFFF/${id}`);
        cloudPick(`#FFFFFF/${id}`);
    }, []);

    return (
        <>
            <GenList />
            <Extra />
            <Canvas>
                <Bounds margin={2}>
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                    />
                    <Pivot
                        position={position}
                        // ref={ref}
                    />
                    <Wheel position={position} />
                </Bounds>
                <Lines />
                <History />
                <Cloud />
            </Canvas>
        </>
    );
}
