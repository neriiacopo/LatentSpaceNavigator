import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

import { useStore } from "./store/useStore";

export default function Cloud() {
    const cloud = useStore((state) => state.cloud);
    const [hovered, setHovered] = useState(false);
    const [size, setSize] = useState(0.005);

    useEffect(() => {
        hovered ? setSize(0.02) : setSize(0.005);
    }, [hovered]);

    return (
        <>
            {Object.keys(cloud).map((key) =>
                cloud[key].map((coords, index) => (
                    <Dot
                        position={coords}
                        color={key}
                    />
                ))
            )}
        </>
    );
}

function Dot({ position, color }) {
    const [hovered, setHovered] = useState(false);
    const [lbl, showLbl] = useState(false);

    const labelS = {
        width: "80px",
        height: "80px",
        borderRadius: "100%",
        color: "white",
    };

    useEffect(() => {
        hovered ? showLbl(true) : showLbl(false);
    }, [hovered]);

    return (
        <>
            <sprite
                position={position}
                scale={0.1}
                onPointerEnter={() => showLbl(true)}
                onPointerLeave={() => showLbl(false)}
                onPointerOver={() => showLbl(true)}
                onPointerOut={() => showLbl(false)}
            >
                <spriteMaterial
                    transparent={true}
                    opacity={0}
                />
            </sprite>

            <sprite
                position={position}
                scale={0.01}
            >
                <spriteMaterial color={color} />
            </sprite>
            {lbl && (
                <Html
                    sprite
                    center
                    position={position}
                    style={{ ...labelS }}
                    className="blurredBox semi "
                ></Html>
            )}
        </>
    );
}
