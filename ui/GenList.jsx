import { Unstable_Grid2 as Grid, Stack, Box } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";

export default function GenList() {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const [focus, setFocus] = useState(null);
    const w = useStore((state) => state.infoW);
    const [imgW, setImgW] = useState(0);

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
            box.style.maxHeight = stack.offsetWidth + "px";

            setImgW((stack.offsetWidth - 20) / 3);
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
                    left: 0,
                    zIndex: 1000,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    pointerEvents: "none",
                }}
            >
                <Grid
                    xs={12}
                    style={{
                        borderRadius: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                        paddingTop: "0px",
                    }}
                    className="blurredBox"
                    spacing={2}
                >
                    <Stack
                        ref={stackRef}
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "100%",
                        }}
                    >
                        <h2 style={{ color: "white" }}>Generations</h2>
                        <Box
                            ref={boxRef}
                            style={{
                                overflow: "hidden",
                                overflowY: "scroll",
                                pointerEvents: "auto",
                            }}
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                            }}
                        >
                            {gens.map(
                                (gen, i) =>
                                    i != 0 && (
                                        <Thumbnail
                                            key={i}
                                            gen={gen}
                                            w={imgW}
                                        />
                                    )
                            )}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

const Thumbnail = ({ gen, w }) => {
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
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
                width: w,
                height: w,
                cursor: "pointer",
                pointerEvents: "auto",
                overflow: "hidden",
                borderRadius: "20px",
                border:
                    gen.id == id
                        ? "2px solid lightgrey"
                        : hovered
                        ? "2px solid grey"
                        : "2px solid transparent",
            }}
            className="blurredBox"
            onClick={pickDot}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <img
                src={gen.texture}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        </Box>
    );
};
