import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

import { useStore } from "./store/useStore";

export default function Cloud() {
    const cloud = useStore((state) => state.cloud);

    return (
        <>
            {Object.keys(cloud).map((key) =>
                cloud[key].map((coords, index) => (
                    <Dot
                        key={index}
                        position={coords}
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

    const labelS = {
        width: "80px",
        height: "80px",
        borderRadius: "100%",
        color: "white",
        PointerEvent: "none",
    };

    const handleHover = (e) => {
        e.stopPropagation();
        showLbl(!lbl);
    };

    const pickDot = () => {
        cloudPick(idCloud);
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
