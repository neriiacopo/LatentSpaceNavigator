import { Sphere, useBounds } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useEffect } from "react";

export default function Pivot({ position }) {
    const mats = [
        <meshBasicMaterial
            attachArray="material"
            wireframe
        />,
        <meshPhongMaterial
            attachArray="material"
            color="grey"
        />,
    ];

    const bounds = useBounds();
    useEffect(() => {
        bounds.refresh().clip().fit();
    }, [position]);

    function SphereArr({ mats }) {
        return (
            <>
                {mats.map((mat, index) => (
                    <Sphere
                        key={index}
                        position={position}
                        args={[0.1, 4, 2]}
                    >
                        {mat}
                    </Sphere>
                ))}
            </>
        );
    }
    return (
        <>
            <sprite
                position={position}
                scale={0.5}
                color="white"
            ></sprite>
            {/* <SphereArr mats={mats} /> */}
        </>
    );
}
