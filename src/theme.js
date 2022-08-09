import { createTheme } from "@mui/material/styles"
import { red, orange, yellow, green, lightBlue, blue, grey } from "@mui/material/colors"

const BORDER_RADIUS = "4px"

const theme = createTheme({
    typography: {
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 16,
        // body1: {

        // }
    },
    palette: {
        mode: "light",
        primary: {
            light: blue[200],
            main: blue[600],
            dark: blue[700],
            contrastText: "#fff",
        },
        secondary: {
            light: grey[100],
            main: grey[300],
            dark: grey[400],
            contrastText: grey[800],
        },
        error: {
            light: red[400],
            main: red[500],
            dark: red[300],
            contrastText: grey[800],
        },
        success: {
            main: green[500],
        },
        warning: {
            main: yellow[500],
            contrastText: grey[800],
        },
        info: {
            main: lightBlue[500],
        },
        text: {
            primary: grey[900],
            secondary: grey[700],
            disabled: grey[500],
        },
        action: {},
        background: {
            default: "white",
            main: "#0379bf",
            dark: "#036aa7",
            paper: grey[200],
            text: "black",
        },
        common: {
            black: grey[900],
            white: grey[200],
        },
        tonalOffset: 0.2,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    textTransform: "none",
                    fontFamily: "Helvetica Neue",
                    maxHeight: "2.5rem",
                    borderRadius: BORDER_RADIUS,
                    "&:hover": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.shape === "square" && {
                        borderRadius: BORDER_RADIUS,
                    }),
                }),
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    borderRadius: BORDER_RADIUS,
                },
            },
        },
    },
})

export default theme
