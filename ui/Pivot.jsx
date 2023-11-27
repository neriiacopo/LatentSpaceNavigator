import { Sphere, useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";

import * as THREE from 'three';

export default function Pivot({ position }) {
    const id = useStore((state) => state.id);
    const imagedata = useStore((state) => state.gens[id].texture);
    const texture = imagedata ? useLoader(THREE.TextureLoader, `${imagedata}`) : null;
    
    const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture, 
        color: 0xffffff, // white color
        transparent: true,
        opacity: 1 // Adjust opacity to desired level of transparency
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
                scale={0.5}
                color="white"
            >
            </sprite>
        </>
    );
}
