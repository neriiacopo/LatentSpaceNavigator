import { useStore } from "./store/useStore";
export default function Cloud() {
    const cloud = useStore((state) => state.cloud);

    return (
        <>
            {Object.keys(cloud).map((key) =>
                cloud[key].map((coords) => (
                    <>
                        <sprite
                            position={coords}
                            scale={0.01}
                        >
                            <spriteMaterial color={key} />
                        </sprite>
                    </>
                ))
            )}
        </>
    );
}
