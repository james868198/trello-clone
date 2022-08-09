import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import CloseIcon from "@mui/icons-material/Close"

const FONTSIZE = "18px"

const Container = styled(Menu)`
    font-size: ${FONTSIZE};
    .MuiMenu-paper {
        background-color: #ffffff;
    }
`

const MenuContainer = styled.div`
    width: 320px;
`

const MenuTitleContainer = styled.div`
    text-align: center;
    color: #6d6d6d;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 46px;
`
const CloseButtonContainer = styled.div`
    position: absolute;
    right: 22px;
    top: 22px;
    z-index: 999;
`

const MenuDivider = styled(Divider)`
    margin-top: 5px;
    margin-bottom: 5px;
`
const MenuBodyContainer = styled.div`
    box-sizing: border-box;
    padding: 10px;
    margin: 4px;
`

export default function BasicMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { items, title, button, children, close } = props

    useEffect(() => {
        if (close) setAnchorEl(null)
    }, [close])

    const handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setAnchorEl(e.currentTarget)
    }

    const handleClose =
        (callback = null) =>
        (e) => {
            e.stopPropagation()
            e.preventDefault()
            setAnchorEl(null)
            if (callback) callback()
        }

    // components

    const MenuTitle = () => {
        if (title) return <MenuTitleContainer>{title}</MenuTitleContainer>
    }
    const MenuItems = () => {
        if (items && Array.isArray(items))
            return (
                <>
                    <MenuDivider component="li" variant="middle" />
                    {items.map((item) => (
                        <MenuItem
                            sx={{
                                marginTop: "5px",
                                fontSize: "16px",
                            }}
                            key={item.name}
                            onClick={handleClose(item.handler)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </>
            )
    }
    const CloseButton = () => {
        return (
            <CloseButtonContainer onClick={handleClose()}>
                <CloseIcon sx={{ cursor: "pointer", fontSize: "20px", color: "#757575" }} />
            </CloseButtonContainer>
        )
    }

    const MenuBody = () => {
        if (children)
            return (
                <>
                    <MenuDivider component="li" variant="middle" />
                    <MenuBodyContainer>{children}</MenuBodyContainer>
                </>
            )
    }
    return (
        <>
            <div
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {button}
            </div>
            <Container
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose()}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuContainer>
                    <CloseButton />
                    <MenuTitle />
                    <MenuItems />
                    <MenuBody />
                </MenuContainer>
            </Container>
        </>
    )
}
