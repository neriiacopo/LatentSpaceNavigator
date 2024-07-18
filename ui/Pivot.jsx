import { useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useEffect, forwardRef, useState, useRef } from "react";
import { useLoader } from "@react-three/fiber";

import * as THREE from "three";

export default function Pivot({ position }) {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const pivotRef = useRef();
    const lens = useStore((state) => state.lens);

    const thumbSize = useStore((state) => state.thumbSize);

    const imageData = gens[id].texture;
    const texture = imageData
        ? useLoader(THREE.TextureLoader, `${imageData}`)
        : null;

    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        // color: 0xffffff, // white color
        transparent: true,
        opacity: 1,
    });

    const bounds = useBounds();
    useEffect(() => {
        if (bounds != null) {
            if (lens == "image") {
                bounds.refresh(pivotRef.current).clip().fit();
            } else {
                bounds.refresh().clip().fit();
            }
        }
    }, [position, lens]);

    return (
        <>
            <sprite
                visible={lens == "image"}
                ref={pivotRef}
                material={spriteMaterial}
                position={position}
                scale={thumbSize}
                // color="white"
            ></sprite>
        </>
    );
}
