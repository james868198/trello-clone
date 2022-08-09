import * as React from "react"
import IconButton from "@mui/material/IconButton"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import BasicMenu from "./BasicMenu"

export default function MoreMenu(props) {
    const MoreIcon = (
        <IconButton
            sx={{
                color: "#3d3d3d",
                "&:hover": {
                    backgroundColor: "#d1d2d5",
                },
            }}
            shape="square"
        >
            <MoreHorizIcon sx={{ fontSize: "18px" }} />
        </IconButton>
    )

    return <BasicMenu {...props} button={MoreIcon} />
}
