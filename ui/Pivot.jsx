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
                {mats.map((mat) => (
                    <Sphere
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
            <SphereArr mats={mats} />
        </>
    );
}
