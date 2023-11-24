import { useRef, useEffect } from "react";
import { Line } from "@react-three/drei";
import { useStore } from "./store/useStore";
import * as THREE from "three";

export default function Lines() {
    const links = useStore((state) => state.links);

    return (
        <>
            {links.map((link, index) => (
                <Line
                    key={index}
                    points={link.slice(0, 2)}
                    color={link[2]}
                />
            ))}
        </>
    );
}
