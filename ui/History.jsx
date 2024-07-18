import { Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { useStore } from "./store/useStore";

export default function History({}) {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const lens = useStore((state) => state.lens);
    const [histoGens, setHistoGens] = useState([]);

    useEffect(() => {
        if (lens == "image") {
            setHistoGens(gens.filter((_, i) => i !== id));
        } else {
            setHistoGens(gens);
        }
    }, [lens, id, gens]);

    return (
        <>
            {histoGens.length > 0 &&
                histoGens.map((gen, index) => (
                    <HistoDot
                        key={index}
                        gen={gen}
                    />
                ))}
        </>
    );
}

function HistoDot({ gen }) {
    const [lbl, showLbl] = useState(false);
    const lens = useStore((state) => state.lens);
    const retroPick = useStore((state) => state.retroPick);
    const resetLens = useStore((state) => state.resetLens);
    const labelS = {
        padding: "5px",
        width: "10px",
        margin: "auto",
        textAlign: "center",
        borderRadius: "20px",
        color: "white",
        fontSize: "10px",
    };

    const handleHover = (e) => {
        const cursor = document.body.style.cursor;
        if (cursor == "pointer") {
            document.body.style.cursor = "default";
        } else {
            document.body.style.cursor = "pointer";
        }
        e.stopPropagation();
        showLbl(!lbl);
    };

    const pickDot = () => {
        retroPick(gen.id);
        resetLens();
    };

    const imageData = gen.texture;
    const texture = imageData
        ? useLoader(THREE.TextureLoader, `${imageData}`)
        : null;

    const spriteMaterial = new THREE.SpriteMaterial({
        map: lens == "image" ? null : texture,
        opacity: lens != "image" ? 1 : lbl ? 0.05 : 0.03,
        color: "white",
        transparent: true,
    });
    return (
        <>
            {lens != "image" && (
                <Html
                    position={[...gen.position]}
                    style={{ ...labelS }}
                    className="blurredBox semi"
                    // occlude={occlude} //  <--------------------------------- fix flickering bug
                >
                    {gen.id}
                </Html>
            )}

            <sprite
                onClick={pickDot}
                position={gen.position}
                scale={0.1}
                onPointerOver={handleHover}
                onPointerLeave={handleHover}
                material={spriteMaterial}
            ></sprite>
        </>
    );
}
