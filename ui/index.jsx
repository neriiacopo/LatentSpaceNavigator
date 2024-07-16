import "./style.css";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.querySelector("#root"));
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import App from "./App";
import { useStore } from "./store/useStore";

Init();

root.render(
    <>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </>
);

async function Init() {
    const vectors = await fetchJSON("./vector.json");
    const cloud = await fetchJSON("./cloud.json");

    async function fetchJSON(url) {
        let response = await fetch(url);
        let promise = await response.json();
        return await promise;
    }

    const colors = Object.keys(vectors);

    useStore.setState({ vectors, cloud, colors });
}
