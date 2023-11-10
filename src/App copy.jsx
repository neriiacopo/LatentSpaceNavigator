import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

function Arrow({ position, direction, onClick }) {
    const arrowRef = useRef();
    useFrame(() => {
        arrowRef.current.lookAt(new Vector3().copy(position).add(direction));
    });

    return (
        <mesh
            ref={arrowRef}
            position={position}
        >
            <coneGeometry args={[4, 4, 32]} />
            <meshBasicMaterial color="red" />
        </mesh>
    );
}

export default function App() {
    const [cubePosition, setCubePosition] = useState([0, 0, 0]);

    const arrows = [
        {
            direction: [1, 0, 0],
            onClick: () =>
                setCubePosition([
                    cubePosition[0] + 1,
                    cubePosition[1],
                    cubePosition[2],
                ]),
        },
        {
            direction: [0, 1, 0],
            onClick: () =>
                setCubePosition([
                    cubePosition[0],
                    cubePosition[1] + 1,
                    cubePosition[2],
                ]),
        },
        // Add more arrows as needed
    ];

    return (
        <Canvas>
            <OrthographicCamera />

            <OrbitControls makeDefault />
            <ambientLight intensity={0.3} />

            {arrows.map((arrow, index) => (
                <Arrow
                    key={index}
                    position={[0, 0, 0]}
                    direction={arrow.direction}
                    onClick={arrow.onClick}
                />
            ))}

            <mesh position={cubePosition}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </Canvas>
    );
}
