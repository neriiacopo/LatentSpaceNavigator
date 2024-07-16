import { Unstable_Grid2 as Grid, Stack, Box } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";

export default function GenList() {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const [focus, setFocus] = useState(null);
    const w = useStore((state) => state.infoW);

    useEffect(() => {
        setFocus(gens[id]);
    }, [gens, id]);

    const stackRef = useRef();
    const boxRef = useRef();
    useEffect(() => {
        const box = boxRef.current;
        const stack = stackRef.current;

        if (box && stack) {
            box.style.width = stack.offsetWidth + "px";
            box.style.height = stack.offsetWidth + "px";
        }
    }, []);

    return (
        <>
            <Grid
                container
                style={{
                    // backgroundColor: "blue",
                    height: "100vh",
                    width: w,
                    padding: "50px",
                    position: "absolute",
                    top: 0,
                    lefy: 0,
                    zIndex: 1000,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    pointerEvents: "none",
                }}
            >
                <Grid
                    xs={12}
                    style={{
                        // height: "50%",
                        borderRadius: "20px",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        padding: "20px",
                        paddingTop: "0px",
                    }}
                    className="blurredBox"
                    spacing={2}
                >
                    <Stack
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "100%",
                        }}
                    >
                        <h2 style={{ color: "white" }}>Generations</h2>
                    </Stack>
                    <Images gens={gens} />
                </Grid>
            </Grid>
        </>
    );
}

function Images({ gens }) {
    return (
        <>
            <Grid
                container
                xs={12}
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}
                style={{
                    maxHeight: "400px",
                    overflowY: "scroll",
                    pointerEvents: "auto",
                }}
            >
                {gens.map(
                    (gen, i) =>
                        i != 0 && (
                            <Thumbnail
                                key={i}
                                gen={gen}
                            />
                        )
                )}
            </Grid>
        </>
    );
}

const Thumbnail = ({ gen }) => {
    const id = useStore((state) => state.id);
    const retroPick = useStore((state) => state.retroPick);
    const [hovered, setHovered] = useState(null);

    const pickDot = () => {
        retroPick(gen.id);
    };

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };

    return (
        <Grid
            xs={4}
            justifyContent="center"
            alignItems="center"
            style={{
                cursor: "pointer",
                pointerEvents: "auto",
                overflow: "hidden",
                borderRadius: "20px",
                border:
                    gen.id == id
                        ? "2px solid grey"
                        : hovered
                        ? "2px solid darkgrey"
                        : "none",
            }}
            className="blurredBox"
            onClick={pickDot}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <img
                src={gen.texture}
                style={{
                    padding: 0,
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </Grid>
    );
};
