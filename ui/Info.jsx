import { useStore } from "./store/useStore";
export default function Info() {
    const id = useStore((state) => state.id);
    const position = useStore((state) => state.gens[id].position);

    const coords = {};
    const axis = ["x", "y", "z"];
    axis.map((key, index) => (coords[key] = position[index]));

    const infoS = {
        style: "flex",
        justifyContent: "center",
    };

    return (
        <>
            <div id="info">
                <h1>info</h1>
                <div style={infoS}>
                    <h3>position </h3>
                    <p>
                        {Object.entries(coords).map(
                            (obj, index) =>
                                `${obj[0]}:${obj[1]} ${
                                    index == axis.length - 1 ? "" : "/ "
                                }`
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}
