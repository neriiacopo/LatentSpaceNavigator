import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";

import { useStore } from "./store/useStore";

export default function History() {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);

    const histoGens = gens.filter((_, i) => i !== id);
    console.log(histoGens);
    return (
        <>
            {histoGens.length > 0 &&
                histoGens.map((gen) => <HistoDot gen={gen} />)}
        </>
    );
}

function HistoDot({ gen }) {
    const [lbl, showLbl] = useState(false);
    const retroPick = useStore((state) => state.retroPick);
    const labelS = {
        padding: "10px",
        width: "20px",
        margin: "auto",
        textAlign: "center",
        borderRadius: "20px",
        color: "white",
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
