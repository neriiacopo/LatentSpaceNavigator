import { createTheme } from "@mui/material/styles";

let theme = createTheme({
    btnH: 50,
    btnM: 10,
    typography: {
        fontFamily: "Work Sans",
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: "whitesmoke",
                    borderRadius: "20px",
                    backgroundColor: "rgba(50, 50, 50, 0.4)",
                    border: "1px solid #333333",
                    boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                    backdropFilter: " blur(10px)",
                    padding: "10px",
                },
            },
        },
    },
});

export default theme;
