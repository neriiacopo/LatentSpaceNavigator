import { create } from "zustand";

export let useStore = create((set, get) => ({
    history: [],
    vectors: {},
    cloud: {},

    id: 0,
    gens: [
        {
            id: 0,
            texture:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAQAAABeK7cBAAAAmklEQVR4AWP4z8Dwn4FgBCmA0UUgBXHNRYlQqjREAWKqUKmDACnFoEAxHEV6QYBE0SkFB2FIAABp9NVSAlaCQAAAAASUVORK5CYII=",
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
            position: [0, 0, 0],
        },
    ],

    x: 0,
    fn: async (a) => {
        const x = get().x;

        set((state) => ({
            x: x + a,
        }));
    },

    calcNewId: () => {
        return get().gens.length;
    },

    newPick: async (pos512, pos3d, vector) => {
        const gen = await generateWithVector(null, pos3d, vector); // INSERIRE CHIAMATA API QUI - inputs: pos512 & (pos3D) &vector

        const newId = get().calcNewId();
        gen.id = newId;

        const gens = [...get().gens, gen];
        set((state) => ({
            gens,
            id: newId,
        }));
    },

    cloudPick: async (idCloud) => {
        const generateByCloudId = get().generateByCloudId;
        const gen = await generateByCloudId(idCloud); // INSERT API CALL HERE - inputs: idCloud512

        const newId = get().calcNewId();
        gen.id = newId;

        const gens = [...get().gens, gen];
        get().removeCloudDot(idCloud);
        set((state) => ({
            gens,
            id: newId,
        }));
    },

    removeCloudDot: (idCloud) => {
        const cloud = get().cloud;
        const [key, id] = idCloud.split("/");
        cloud[key].splice(id, 1);
        set((state) => ({
            cloud,
        }));
    },

    retroPick: async (idImgs) => {
        set((state) => ({
            id: idImgs,
        }));
    },

    // test functions for local dev ---------------------------------------------------------------------------------------------------------------------
    generateWithVector: async (pos512, pos3d, vector) => {
        // Replace the following with API call values ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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
            texture: "data:image/png;base64,...",
            map: "data:image/png;base64,...",
            palette: colors,
            compass: { type: "", angles: hues },
            multiposition: Array(512)
                .fill(0)
                .map((_) => {
                    Math.floor(Math.random());
                }),
        };
        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        // Add info on 3Dspace
        schema.position = pos3d.map((p, i) => p + vector[i]);
        return schema;
    },

    generateByCloudId: async (idCloud) => {
        // Replace the following with API call values ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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
            texture: "data:image/png;base64,...",
            map: "data:image/png;base64,...",
            palette: colors,
            compass: { type: "", angles: hues },
            multiposition: Array(512)
                .fill(0)
                .map((_) => {
                    Math.floor(Math.random());
                }),
        };
        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        // Add info on 3Dspace
        const cloud = get().cloud;
        const [key, id] = idCloud.split("/");

        schema.position = cloud[key][id];
        return schema;
    },
}));
