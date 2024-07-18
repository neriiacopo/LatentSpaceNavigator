import { Unstable_Grid2 as Grid, Stack, Box, IconButton } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";

import DownloadIcon from "@mui/icons-material/Download";

export default function GenList() {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const [focus, setFocus] = useState(null);
    const w = useStore((state) => state.infoW);
    const [imgW, setImgW] = useState(0);
    const lens = useStore((state) => state.lens);

    useEffect(() => {
        setFocus(gens[id]);
    }, [gens, id]);

    const stackRef = useRef();
    const boxRef = useRef();

    const downloadImgs = () => {
        gens.forEach((gen, index) => {
            const link = document.createElement("a");
            link.href = gen.texture;
            link.download = `image-${gen.id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    useEffect(() => {
        const box = boxRef.current;
        const stack = stackRef.current;

        if (box && stack) {
            const w = stack.offsetWidth - 10;
            box.style.width = w + "px";
            box.style.maxHeight = w + "px";

            setImgW((w - 20) / 3);
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
                    right: 0,
                    zIndex: 1000,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    pointerEvents: "none",

                    visibility: lens != "image" ? "visible" : "hidden",
                    opacity: lens != "image" ? 1 : 0,
                }}
                className="fx"
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
                                paddingRight: "10px",
                            }}
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-start",
                            }}
                        >
                            {gens.map((gen, i) => (
                                <Thumbnail
                                    key={i}
                                    gen={gen}
                                    w={imgW}
                                />
                            ))}
                        </Box>
                    </Stack>
                    <IconButton
                        style={{
                            float: "right",
                            marginTop: "20px",
                            color: "white",
                            pointerEvents: "auto",
                            border: "2px solid white",
                        }}
                        onClick={() => downloadImgs()}
                        className="blurredBox"
                    >
                        <DownloadIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

const Thumbnail = ({ gen, w }) => {
    const id = useStore((state) => state.id);
    const retroPick = useStore((state) => state.retroPick);
    const resetLens = useStore((state) => state.resetLens);
    const [hovered, setHovered] = useState(null);

    const pickDot = () => {
        retroPick(gen.id);
        resetLens();
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
