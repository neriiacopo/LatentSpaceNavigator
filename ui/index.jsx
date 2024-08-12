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
    // temporary data retrieval
    const source =
        "https://raw.githubusercontent.com/neriiacopo/LatentSpaceNavigator/main/ui/public/";
    const vectors = await fetchJSON(source + "vector.json");
    const cloud = await fetchJSON(source + "cloud.json");

    async function fetchJSON(url) {
        let response = await fetch(url);
        let promise = await response.json();
        return await promise;
    }

    const colors = Object.keys(vectors);

    // // Temporary random vector for demo ---- to remove
    // const randomV = [
    //     [-0.2201392, -0.31434322, 0.32051064],
    //     [-0.4929479, 0.08368005, 0.00013882],
    //     [-0.12056069, -0.15642041, 0.45934494],
    //     [-0.09714045, 0.47065, 0.1380301],
    //     [0.21898333, 0.25771991, -0.36827537],
    //     [-0.44436043, -0.19135339, -0.12620494],
    //     [0.37565845, -0.27833741, 0.17722589],
    //     [0.14764922, -0.30865415, 0.36459885],
    //     [-0.28865764, 0.30617323, -0.27006428],
    //     [-0.38560619, -0.31424797, -0.05055771],
    //     [0.23036755, 0.43315848, 0.09645995],
    //     [0.25187301, 0.26188658, -0.34347548],
    //     [0.00023644, -0.35581987, -0.35127221],
    //     [0.22472191, 0.27877595, 0.34897569],
    //     [0.26024132, 0.16849206, -0.39228164],
    //     [-0.42500792, 0.1688351, 0.20214594],
    //     [0.10101715, 0.42556865, 0.24225371],
    //     [-0.042794, -0.49214323, -0.0772251],
    // ];

    // colors.map((c, i) => {
    //     vectors[c]["3d"]["umap_supervised"] = randomV[i];
    // });

    useStore.setState({ vectors, cloud, colors });
}
