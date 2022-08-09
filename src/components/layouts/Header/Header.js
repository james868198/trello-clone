import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import SearchBar from "../../common/SearchBar"
import { Link } from "react-router-dom"

// mui
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AppsIcon from "@mui/icons-material/Apps"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

export const Container = styled.div`
    background-color: ${(props) => props.theme.palette.background.dark};
    color: ${(props) => props.theme.palette.primary.contrastText};

    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

export const ContainerLeft = styled.div`
    position: relative;
    width: 50%;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: inherit;
`
export const ContainerRight = styled.div`
    position: relative;
    width: 40%;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: inherit;
`

export const Section = styled.div`
    display: inline-flex;
    position: relative;
    margin: 5px;
`

export default function Header({ title, ...props }) {
    // states

    // components
    const Icon = (props) => {
        return (
            <Section>
                <IconButton
                    sx={{
                        fontSize: 30,
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: "#6595bd",
                        },
                    }}
                    shape="square"
                >
                    {props.children}
                </IconButton>
            </Section>
        )
    }
    const BoardNavBtn = (props) => {
        return (
            <Section>
                <Button
                    sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#6595bd",
                        },
                    }}
                    {...props}
                >
                    {props.children}
                </Button>
            </Section>
        )
    }

    const Apps = () => {
        return (
            <Icon>
                <AppsIcon />
            </Icon>
        )
    }

    const HomeIcon = () => {
        return (
            <Link to={"/"}>
                <Section>
                    <h3 style={{ color: "white" }}>Trello</h3>
                </Section>
            </Link>
        )
    }
    const Workspaces = () => {
        return <BoardNavBtn endIcon={<KeyboardArrowDownIcon />}>Workspaces</BoardNavBtn>
    }
    const Starred = () => {
        return <BoardNavBtn endIcon={<KeyboardArrowDownIcon />}>Starred</BoardNavBtn>
    }

    const Templates = () => {
        return <BoardNavBtn endIcon={<KeyboardArrowDownIcon />}>Templates</BoardNavBtn>
    }

    const Create = () => {
        return <BoardNavBtn>Create</BoardNavBtn>
    }

    const Search = () => {
        return (
            <Section>
                <SearchBar />
            </Section>
        )
    }

    const Information = () => {
        return (
            <Icon>
                <InfoOutlinedIcon />
            </Icon>
        )
    }

    const Notification = () => {
        return (
            <Icon>
                <NotificationsNoneIcon />
            </Icon>
        )
    }

    const Profile = () => {
        return (
            <Icon>
                <AccountBoxIcon />
            </Icon>
        )
    }

    // handlers

    const handleSearch = () => {}

    return (
        <Container>
            <ContainerLeft>
                <Apps />
                <HomeIcon />
                <Workspaces />
                <Starred />
                <Templates />
                <Create />
            </ContainerLeft>
            <ContainerRight>
                <Search />
                <Information />
                <Notification />
                <Profile />
            </ContainerRight>
        </Container>
    )
}
