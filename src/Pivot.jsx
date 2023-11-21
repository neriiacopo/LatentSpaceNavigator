import { Sphere, Box, useTexture } from "@react-three/drei";
import { useStore } from "./store/useStore";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

export default function Pivot({ position, imageData }) {
    // Load the texture from the imageData if available
    // Only create the texture if imageData is valid
    const texture = imageData ? useLoader(THREE.TextureLoader, `data:image/png;base64,${imageData}`) : null;
    // Create materials, with texture applied if available
    const mats = [
        <meshBasicMaterial attachArray="material" wireframe />,
        texture ? <meshPhongMaterial attachArray="material" color="white" map={texture} /> : <meshPhongMaterial attachArray="material" color="grey" />,
    ];

    function SphereArr({ mats }) {
        return (
            <>
                {mats.map((mat, index) => (
                    <Box key={index} position={position} args={[0.2, 0.2, 0.2]}>
                        {mat}
                    </Box>
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