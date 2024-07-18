import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

import { useStore } from "./store/useStore";

export default function Cloud() {
    const cloud = useStore((state) => state.cloud);
    const mode3d = useStore((state) => state.mode3d);

    return (
        <>
            {Object.keys(cloud).map((key) =>
                cloud[key].cloud.map((pt, index) => (
                    <Dot
                        key={index}
                        position={pt["3d"][mode3d]}
                        color={key}
                        idCloud={`${key}/${index}`}
                    />
                ))
            )}
        </>
    );
}

function Dot({ position, color, idCloud }) {
    const [lbl, showLbl] = useState(false);
    const cloudPick = useStore((state) => state.cloudPick);
    const lens = useStore((state) => state.lens);
    const resetLens = useStore((state) => state.resetLens);

    const labelS = {
        width: "80px",
        height: "80px",
        borderRadius: "100%",
        color: "white",
        PointerEvent: "none",
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
        cloudPick(idCloud);
        resetLens();
    };

    return (
        <>
            <sprite
                position={position}
                scale={0.01}
            >
                <spriteMaterial color={color} />
            </sprite>
            <sprite
                onClick={pickDot}
                position={position}
                scale={0.1}
                onPointerOver={handleHover}
                onPointerLeave={handleHover}
            >
                <spriteMaterial
                    transparent={true}
                    opacity={lbl ? 0.05 : 0.0}
                />
            </sprite>
        </>
    );
}
