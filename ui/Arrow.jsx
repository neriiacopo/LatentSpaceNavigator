import { Cone } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { useStore } from "./store/useStore";
import * as THREE from "three";

export default function Arrow({ position, direction, color, scale }) {
    const [hovered, setHovered] = useState(false);
    const newPick = useStore((state) => state.newPick);
    const newLink = useStore((state) => state.newLink);
    const id = useStore((state) => state.id);
    const gens = useStore((state) => state.gens);

    const coneRef = useRef(null);

    // evaluate scalar vector
    const dir = new THREE.Vector3(...direction);
    dir.normalize().multiplyScalar(scale);
    const vector = [dir.x, dir.y, dir.z];

    function movePivot() {
        newLink([
            gens[id].position,
            gens[id].position.map((coord, i) => coord + vector[i]),
            color,
        ]);
        newPick(gens[id].multiposition, gens[id].position, vector);
    }

    useEffect(() => {
        const cone = coneRef.current;
        const dir = new THREE.Vector3(vector[0], vector[1], vector[2]);

        const alignmentVector = dir.normalize();
        cone.lookAt(alignmentVector);
    }, []);

    return (
        <>
            <mesh
                position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={movePivot}
                scale={scale}
                ref={coneRef}
            >
                <Cone
                    position={[0, 0, 1]}
                    args={[0.05, 0.1, 3]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <meshBasicMaterial
                        color={hovered ? darkerHex(color, 0.8) : color}
                    />
                </Cone>
            </mesh>
        </>
    );
}

function darkerHex(hex, factor = 0.8) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const coords = result.slice(1, 4);

    let r, g, b;

    function darker(coord) {
        let x = Math.round(parseInt(coord, 16) * factor);
        x = Math.min(Math.max(x, 0), 255);
        return x;
    }

    [r, g, b] = coords.map((coord) => darker(coord));

    return `rgb(${r}, ${g}, ${b})`;
}
