import { create } from "zustand";
const dummy = {
    id: 0,
    texture:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAArElEQVR4AWOw8P/9nwgwQJ2AcBAwSvEJGRk5CI0NDRokWLHC6P88ePcLExESOjp65ebmhE8PDwFg0aJFufOnRuvr6+nb6/rqKiIiYSEhJiIiIggJCQlCQlJQUFBy9uzZo1q1aKizs7O8P777+fDDDz8otFotY3v/vd7fffdZiYmJ8+fIpgYGBnDhg3Dhg2KiIiIlJSUpKSkKCAgQkNDQlJSUlJSUlJSWFiYgICA8PD4/Pz+hoaFJSUhLS0tJS0tMTExMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM",
    map: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAArElEQVR4AWOw8P/9nwgwQJ2AcBAwSvEJGRk5CI0NDRokWLHC6P88ePcLExESOjp65ebmhE8PDwFg0aJFufOnRuvr6+nb6/rqKiIiYSEhJiIiIggJCQlCQlJQUFBy9uzZo1q1aKizs7O8P777+fDDDz8otFotY3v/vd7fffdZiYmJ8+fIpgYGBnDhg3Dhg2KiIiIlJSUpKSkKCAgQkNDQlJSUlJSUlJSWFiYgICA8PD4/Pz+hoaFJSUhLS0tJS0tMTExMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM",
    palette: [
        "rgb(0,0,0)",
        "rgb(50,50,50)",
        "rgb(100,100,100)",
        "rgb(150,150,150)",
        "rgb(200,200,200)",
    ],
    compass: { type: "", angles: [20, 40, 60, 80, 100] },
    multiposition: Array(512).fill(0),
    // position: [3.702, 5.233, 7.22],
    position: [0, 0, 0],
};

export let useStore = create((set, get) => ({
    history: [],
    vectors: {},
    links: [], // [[a,b,color], [],...]
    cloud: {},
    mode3d: "umap_supervised",
    vecF: 1,
    infoW: "25vw",
    loading: false,

    colors: {},
    thumbSize: 0.5,
    dev: false,
    id: 0,
    gens: [dummy],

    x: 0,
    fn: async (a) => {
        const x = get().x;

        set((state) => ({
            x: x + a,
        }));
    },

    newLink: (link) => {
        const links = [...get().links, link];
        set((state) => ({
            links,
        }));
    },

    calcNewId: () => {
        return get().gens.length;
    },

    newPick: async (color) => {
        const loading = get().loading;
        const pauseState = get().pauseState;
        if (loading == false) {
            pauseState(true);
            const mode = get().mode3d;
            const vec = get().vectors[color];
            const currentId = get().id;
            const gens = get().gens;
            const newLink = get().newLink;
            const genPrev = gens[currentId];
            const generateWithVector = get().generateWithVector;
            const genPost = await generateWithVector(
                genPrev.multiposition,
                genPrev.position,
                color,
                vec["3d"][mode]
            ); // INSERT API CALL HERE - inputs: pos512 & (pos3D) &vector

            const newId = get().calcNewId();
            genPost.id = newId;

            console.log("newPick", genPrev, genPost);
            newLink([genPrev.position, genPost.position, color]);

            const newGens = [...gens, genPost];
            console.log(newGens);
            set((state) => ({
                gens: newGens,
                id: genPost.id,
                loading: false,
            }));
        }
    },

    pauseState: async (s) => {
        set((state) => ({
            loading: s,
        }));
    },

    cloudPick: async (idCloud) => {
        const loading = get().loading;
        const pauseState = get().pauseState;
        if (loading != true) {
            pauseState(true);
            const generateByCloudId = get().generateByCloudId;
            const gen = await generateByCloudId(idCloud); // INSERT API CALL HERE - inputs: idCloud512

            console.log(gen);
            const newId = get().calcNewId();
            gen.id = newId;

            const gens = [...get().gens, gen];
            get().removeCloudDot(idCloud);
            set((state) => ({
                gens,
                id: newId,
                loading: false,
            }));
        }
    },

    removeCloudDot: (idCloud) => {
        const cloud = get().cloud;
        const [key, targetId] = idCloud.split("/");
        let c = {};
        if (Array.isArray(cloud[key].cloud)) {
            cloud[key].cloud = cloud[key].cloud.filter(
                (element) => element.id != targetId
            );
        }
        set((state) => ({
            cloud,
        }));
    },

    // const removeElementById = (cloud, targetId) => {
    //     // Iterate over each key in the cloud object
    //     Object.keys(cloud).forEach(color => {
    //         // Check if the 'cloud' key exists and is an array
    //         if (Array.isArray(cloud[color].cloud)) {
    //             // Filter out the elements with the matching id
    //             cloud[color].cloud = cloud[color].cloud.filter(element => element.id !== targetId);
    //         }
    //     });
    //     return cloud;
    // };

    retroPick: async (idImgs) => {
        set((state) => ({
            id: idImgs,
        }));
    },

    // test functions for local dev ---------------------------------------------------------------------------------------------------------------------
    generateWithVector: async (pos512, pos3d, color, vector) => {
        const calcNewId = get().calcNewId;
        const dev = get().dev;
        const vecF = get().vecF;
        if (dev) {
            const hues = Array(5)
                .fill(0)
                .map((_) => {
                    const hue = Math.floor(Math.random() * 360);
                    return hue;
                });

            const colors = hues.map((hue) => {
                return `hsl(${hue}, 100%, 50%)`;
            });

            const schema = {
                ...dummy,
                colors,
                compass: { ...dummy.compass, angles: hues },
                position: pos3d.map((p, i) => p + vector[i]),
            };

            return schema;
        } else {
            // Replace the following with API call values ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            const response = await fetch(
                "https://vm-159.s3it.uzh.ch/get-image",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([color, pos512]),
                }
            );
            const schema = await response.json();
            console.log(schema);
            // Add info on 3Dspace
            schema.position = pos3d.map((p, i) => p + vector[i] * vecF);
            return schema;
        }
    },

    generateByCloudId: async (idCloud) => {
        const dev = get().dev;
        const mode3d = get().mode3d;
        if (dev) {
            const hues = Array(5)
                .fill(0)
                .map((_) => {
                    const hue = Math.floor(Math.random() * 360);
                    return hue;
                });

            const colors = hues.map((hue) => {
                return `hsl(${hue}, 100%, 50%)`;
            });

            const schema = {
                ...dummy,
                colors,
                compass: { ...dummy.compass, angles: hues },
            };

            // Add info on 3Dspace
            const [key, targetId] = idCloud.split("/");

            const cloud = { ...get().cloud };

            const sel = cloud[key].cloud.filter(
                (element) => element.id == targetId
            );

            schema.position = sel[0]["3d"][mode3d];
            return schema;
        } else {
            // Add info on 3Dspace
            const [key, targetId] = idCloud.split("/");
            // Replace the following with API call values ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            const response = await fetch(
                "https://vm-159.s3it.uzh.ch/get-index",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([key, targetId]),
                }
            );

            // const [key, targetId] = idCloud.split("/");

            const schema = await response.json();
            const cloud = { ...get().cloud };

            const sel = cloud[key].cloud.filter(
                (element) => element.id == targetId
            );

            console.log(schema);

            schema.position = sel[0]["3d"][mode3d];
            return schema;

            // const schema = await response.json();
            // const cloud = get().cloud;

            // console.log(sel);
            // schema.position = cloud[key][id];
            // return schema;
        }
    },
}));
