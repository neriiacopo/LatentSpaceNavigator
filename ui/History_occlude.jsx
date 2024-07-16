import { Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

import { useStore } from "./store/useStore";

export default function History({ occlude }) {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);

    const histoGens = gens.filter((_, i) => i !== id);
    return (
        <>
            {histoGens.length > 0 &&
                histoGens.map((gen, index) => (
                    <HistoDot
                        key={index}
                        gen={gen}
                        occlude={occlude}
                    />
                ))}
        </>
    );
}

function HistoDot({ gen, occlude }) {
    const [lbl, showLbl] = useState(false);
    const retroPick = useStore((state) => state.retroPick);
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
        e.stopPropagation();
        showLbl(!lbl);
    };

    const pickDot = () => {
        retroPick(gen.id);
    };

    return (
        <>
            <Html
                position={[...gen.position]}
                style={{ ...labelS }}
                className="blurredBox semi"
                // occlude={occlude} //  <--------------------------------- fix flickering bug
            >
                {gen.id}
            </Html>

            <sprite
                onClick={pickDot}
                position={gen.position}
                scale={0.1}
                onPointerOver={handleHover}
                onPointerLeave={handleHover}
            >
                <spriteMaterial
                    transparent={true}
                    color="white"
                    opacity={0.05}
                />
            </sprite>
        </>
    );
}
