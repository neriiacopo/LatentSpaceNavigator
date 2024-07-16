import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useStore } from "./store/useStore";

export default function Wheel({ position }) {
    const vectors = useStore((state) => state.vectors);
    const [hoveredCircle, setHoveredCircle] = useState(null);

    const newPick = useStore((state) => state.newPick);

    const handleMouseOver = (index) => {
        setHoveredCircle(index);
    };

    const handleMouseOut = () => {
        setHoveredCircle(null);
    };

    const handleClick = (color) => {
        newPick(color);
    };

    const containerRef = useRef();
    const hexs = Object.keys(vectors);
    const wheelR = 350;
    const buttonR = 20;

    const w = 1000;
    const negativeD = Math.PI / 4;
    const positiveD = 2 * Math.PI - negativeD;
    const initRot = -Math.PI / 2 - positiveD / 2;

    const centerX = w / 2;
    const centerY = w / 2;

    // Base ring path data
    const startAngle = initRot;
    const endAngle = initRot + positiveD;
    const startX = centerX + wheelR * Math.cos(startAngle);
    const startY = centerY + wheelR * Math.sin(startAngle);
    const endX = centerX + wheelR * Math.cos(endAngle);
    const endY = centerY + wheelR * Math.sin(endAngle);

    const mainContainer = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${w}px`,
        width: `${w}px`,
        margin: 0,
        backgroundColor: "transparent",
        pointerEvents: "none",
    };
    const fx = {
        transition: "all 0.1s ease-in",
    };

    return (
        <Html
            center
            position={position}
            style={{ ...mainContainer }}
            ref={containerRef}
        >
            <svg
                id="wheel-svg"
                viewBox={`0 0 ${w} ${w}`}
                width={w}
                height={w}
            >
                {/* Wheel ring  ---------------------------- */}
                <path
                    d={`M ${startX} ${startY} A ${wheelR} ${wheelR} 0 ${
                        positiveD > Math.PI ? 1 : 0
                    } 1 ${endX} ${endY}`}
                    stroke="rgba(100,100,100,0.2)"
                    strokeWidth={buttonR * 2 + 10}
                    fill="none"
                    opacity={hoveredCircle != null ? 0.5 : 1}
                    strokeLinecap="round"
                    style={{ ...fx }}
                    className="blurredBox"
                />

                {/* Buttons  ---------------------------- */}
                {hexs.map((hex, i) => {
                    const angle = (i / (hexs.length - 1)) * positiveD + initRot;
                    function radPos(rad) {
                        const x = centerX + rad * Math.cos(angle);
                        const y = centerY + rad * Math.sin(angle);
                        return [x, y];
                    }

                    return (
                        <g
                            key={hex}
                            onMouseOver={() => handleMouseOver(i)}
                            onMouseOut={handleMouseOut}
                        >
                            <circle
                                cx={radPos(wheelR)[0]}
                                cy={radPos(wheelR)[1]}
                                r={
                                    hoveredCircle === i
                                        ? buttonR * 1.5
                                        : hoveredCircle !== null
                                        ? buttonR * 0.5
                                        : buttonR
                                }
                                opacity={
                                    hoveredCircle === i
                                        ? 1
                                        : hoveredCircle !== null
                                        ? 0.5
                                        : 1
                                }
                                fill={hex}
                                onClick={() => handleClick(hex)}
                                style={{
                                    cursor: "pointer",
                                    pointerEvents: "auto",
                                    ...fx,
                                }}
                            />
                            {/* <handle
                                center={radPos(wheelR - buttonR * 4)[0]}
                                props={(hoveredCircle, i, buttonR, hex, fx)}
                            />
                            <handle
                                center={radPos(wheelR + buttonR * 4)[0]}
                                props={(hoveredCircle, i, buttonR, hex, fx)}
                            /> */}
                        </g>
                    );
                })}
            </svg>
        </Html>
    );
}

function handle(center, hoveredCircle, i, buttonR, hex, fx) {
    return (
        <>
            <circle
                cx={center}
                cy={center}
                r={hoveredCircle === i ? buttonR * 0.8 : 0}
                stroke={hex}
                strokeWidth={2}
                opacity={0.2}
                style={{
                    cursor: "pointer",
                    pointerEvents: "auto",
                    ...fx,
                }}
            />
        </>
    );
}
