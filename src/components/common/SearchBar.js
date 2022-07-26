import * as React from "react"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"

export default function SearchBar() {
    return (
        <Paper
            elevation={0}
            variant="outlined"
            component="form"
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
                backgroundColor: "#4b84b4",
                borderColor: "white",
            }}
        >
            <SearchIcon sx={{ color: "white" }} />
            <InputBase
                sx={{ ml: 1, flex: 1, color: "white" }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
            />
        </Paper>
    )
}
