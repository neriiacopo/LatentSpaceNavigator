import { Unstable_Grid2 as Grid, Stack, Box, IconButton } from "@mui/material";

import { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";

export default function Credits() {
    const w = useStore((state) => state.infoW);

    return (
        <>
            <Grid
                container
                style={{
                    height: "100vh",
                    width: w,
                    padding: "50px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "flex-end",
                    pointerEvents: "none",
                    flexDirection: "column",
                }}
            >
                <Grid
                    xs={12}
                    style={{
                        borderRadius: "20px",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: "20px",
                        paddingTop: "0px",
                        flexGrow: 1,
                    }}
                    spacing={2}
                >
                    <Stack
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "100%",
                            color: "white",
                        }}
                    >
                        <h1 style={{ fontSize: "3em" }}>
                            Latent Space Navigator
                        </h1>
                        <p style={{ opacity: 0.7, fontSize: "0.8em" }}>
                            a research by <br />
                            Iacopo Neri & Ludovica Schaerf
                        </p>
                    </Stack>
                </Grid>
                <Grid
                    xs={12}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "left",
                        bottom: 0,
                        height: "50px",
                    }}
                >
                    <a
                        target="_blank"
                        href="https://dvstudies.net/"
                    >
                        <img
                            src="dvs_logo.png"
                            alt="Digital Visual Studies Logo"
                            style={{
                                width: "auto",
                                height: "100%",
                                objectFit: "cover",
                                pointerEvents: "auto",
                            }}
                        />
                    </a>
                </Grid>
            </Grid>
        </>
    );
}
