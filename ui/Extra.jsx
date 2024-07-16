import { Unstable_Grid2 as Grid, Stack, Box, Tooltip } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";

import CopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";

export default function Extra() {
    const gens = useStore((state) => state.gens);
    const id = useStore((state) => state.id);
    const [focus, setFocus] = useState(null);
    const w = useStore((state) => state.infoW);

    useEffect(() => {
        setFocus(gens[id]);
    }, [gens, id]);

    return (
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
                alignItems: "center",
                pointerEvents: "none",
            }}
        >
            <Grid
                xs={12}
                container
                style={{
                    height: "100%",
                    borderRadius: "20px",
                    // justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "20px",
                    paddingTop: "0px",
                }}
                className="blurredBox"
            >
                {focus && <TextureBox focus={focus} />}
                {focus && <Palette focus={focus} />}
                {focus && <Compass focus={focus} />}
            </Grid>
        </Grid>
    );
}

function TextureBox({ focus }) {
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
        <Stack
            ref={stackRef}
            style={{
                padding: 0,
                margin: 0,
                width: "100%",
            }}
        >
            <h2 style={{ color: "white" }}>Modifications</h2>
            <Box
                ref={boxRef}
                style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                }}
                className="blurredBox"
            >
                <img
                    src={focus.map}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "invert(100%)",
                    }}
                />
            </Box>
        </Stack>
    );
}

function Palette({ focus }) {
    const palette = focus.palette;

    return (
        <Stack
            style={{
                padding: 0,
                margin: 0,
                width: "100%",
            }}
            spacing={1}
        >
            <h2 style={{ color: "white" }}>Palette</h2>
            <Box
                style={{
                    width: "100%",
                }}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pointerEvents: "auto",
                }}
            >
                {palette.map((color, i) => (
                    <ColorIcon
                        key={i}
                        color={color}
                    />
                ))}
            </Box>
            <Box
                style={{
                    width: "100%",
                    color: "darkgray",
                }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <p>{focus.compass.type}</p>
            </Box>
        </Stack>
    );
}

function ColorIcon({ color }) {
    const s = "40px";
    const [showIcon, setShowIcon] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleDivClick = () => {
        navigator.clipboard.writeText(color);
        setSuccess(true);
    };

    return (
        <Tooltip
            title={color}
            placement="bottom"
            onOpen={() => {
                setShowIcon(true);
                setSuccess(false);
            }}
            onClose={() => setShowIcon(false)}
        >
            <div
                style={{
                    backgroundColor: color,
                    height: s,
                    width: s,
                    borderRadius: "100%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={handleDivClick}
                className="blurredBox"
            >
                {showIcon &&
                    (success ? (
                        <DoneIcon style={{ opacity: 1 }} />
                    ) : (
                        <CopyIcon style={{ opacity: 1 }} />
                    ))}
            </div>
        </Tooltip>
    );
}

function Compass({ focus }) {
    const stackRef = useRef();
    const boxRef = useRef();
    const imgUrl = "colorwheel.jpg";
    const angles = focus.compass.angles;
    const [center, setCenter] = useState(null);

    useEffect(() => {
        const box = boxRef.current;
        const stack = stackRef.current;

        if (box && stack) {
            box.style.width = stack.offsetWidth - 100 + "px";
            box.style.height = stack.offsetWidth - 100 + "px";

            setCenter((stack.offsetWidth - 100) / 2);
        }
    }, []);

    return (
        <Stack
            ref={stackRef}
            style={{
                padding: 0,
                margin: 0,
                width: "100%",
            }}
        >
            <h2 style={{ color: "white" }}>Color Harmony</h2>
            <Box
                ref={boxRef}
                style={{
                    margin: "auto",
                    padding: 0,
                    borderRadius: "100%",
                    overflow: "hidden",
                    rotate: "90deg",
                }}
                className="blurredBox"
            >
                <img
                    src={imgUrl}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                {center && (
                    <Handles
                        center={center}
                        angles={angles}
                        colors={focus.palette}
                    />
                )}
            </Box>
        </Stack>
    );
}

function Handles({ center, angles, colors }) {
    const circleR = 5;
    return (
        <svg
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // backgroundColor: "blue",
                opacity: 1,
                zIndex: 900,

                rotate: "180deg",
                pointerEvents: "none",
            }}
        >
            {/* Buttons  ---------------------------- */}
            {angles.map((deg, i) => {
                function radPos(r) {
                    const rad = deg * (Math.PI / 180);
                    const x = center + r * Math.cos(rad);
                    const y = center + r * Math.sin(rad);
                    return [x, y];
                }

                return (
                    <circle
                        cx={radPos(100)[0]}
                        cy={radPos(100)[1]}
                        r={circleR}
                        // fill={colors[i]}
                        fill={"black"}
                        stroke={"lightgrey"}
                    />
                );
            })}
        </svg>
    );
}
