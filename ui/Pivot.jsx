import { Sphere, useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useEffect, forwardRef, useState } from "react";
import { useLoader } from "@react-three/fiber";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

export default function Pivot({ position }) {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const [focus, setFocus] = useState(null);

    const thumbSize = useStore((state) => state.thumbSize);

    const imageData = gens[id].texture;
    const texture = imageData
        ? useLoader(THREE.TextureLoader, `${imageData}`)
        : null;

    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        // color: 0xffffff, // white color
        transparent: true,
        opacity: 1, // Adjust opacity to desired level of transparency
    });

    const bounds = useBounds();
    useEffect(() => {
        bounds.refresh().clip().fit();
    }, [position]);

    return (
        <>
            <sprite
                material={spriteMaterial}
                position={position}
                scale={thumbSize}
                // color="white"
            ></sprite>
        </>
    );
}
