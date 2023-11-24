import react from "@vitejs/plugin-react";
import topLevelAwait from "vite-plugin-top-level-await";

const isCodeSandbox =
    "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env;

export default {
    plugins: [react(), topLevelAwait()],
    root: "ui",
    publicDir: "public",
    base: "/LatentSpaceNavigator/",
    server: {
        host: true,
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
    },
};
