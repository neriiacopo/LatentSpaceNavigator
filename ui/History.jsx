import { Sphere, useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useState } from "react";

export default function History({ position }) {
    const sphereRef = useRef();
    const [histPositions, setPositions] = useState([]);
    const [index, setIndex] = useState([0]);

    const labelS = {
        padding: "10px",
        width: "20px",
        margin: "auto",
        textAlign: "center",
        borderRadius: "20px",
        color: "white",
    };

    useEffect(() => {
        const group = sphereRef.current;

        const sphere = new THREE.SphereGeometry(0.05, 4, 2);
        const material = new THREE.MeshBasicMaterial({
            color: "grey",
            wireframe: true,
        });
        const mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(...position);

        group.add(mesh);
    }, [position]);

    useEffect(() => {
        const oldPos = histPositions;

        oldPos.push(position);
        setPositions(oldPos);

        const nowInd = parseInt(index.slice(-1));
        index.push(nowInd + 1);
        setIndex(index);
    }, [position]);

    return (
        <>
            <group ref={sphereRef} />
            {histPositions.map((pos, i) => (
                <Html
                    position={[...pos]}
                    style={{ ...labelS }}
                    className="blurredBox"
                >
                    {index[i]}
                </Html>
            ))}
        </>
    );
}
