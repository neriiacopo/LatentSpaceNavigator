import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { OrbitControls, Bounds, Box, useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore.jsx";

import Pivot from "./Pivot.jsx";
import Cloud from "./Cloud.jsx";
import History from "./History.jsx";
import Lines from "./Lines.jsx";
import Wheel from "./Wheel.jsx";
import Extra from "./Extra.jsx";
import GenList from "./GenList.jsx";
import Credits from "./Credits.jsx";

export default function App() {
    const id = useStore((state) => state.id);
    const gens = useStore((state) => state.gens);
    const cloudPick = useStore((state) => state.cloudPick);
    const lens = useStore((state) => state.lens);

    const ref = useRef();

    useLayoutEffect(() => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        const id = getRandomInt(100);
        cloudPick(`#FFFFFF/${id}`);
    }, []);

    return (
        <>
            <GenList />
            <Extra />
            <Wheel />
            <Credits />
            <Canvas>
                <Bounds margin={2}>
                    <OrbitControls
                        makeDefault
                        enablePan={false}
                    />
                    {gens[id] != null && (
                        <Pivot
                            position={gens[id].position}
                            // ref={ref}
                        />
                    )}
                    <Lines />
                    <History />
                </Bounds>
                <Cloud />
            </Canvas>
        </>
    );
}
