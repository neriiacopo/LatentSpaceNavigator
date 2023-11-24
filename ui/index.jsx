import "./style.css";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.querySelector("#root"));

import App from "./App";
import { useStore } from "./store/useStore";

Init();
root.render(
    <>
        <App />
    </>
);

async function Init() {
    const vectors = await fetchJSON("./3d_directions.json");
    const cloud = await fetchJSON("./3d_points.json");

    async function fetchJSON(url) {
        let response = await fetch(url);
        let promise = await response.json();
        return await promise;
    }

    useStore.setState({ vectors: vectors });
    useStore.setState({ cloud: cloud });
}
