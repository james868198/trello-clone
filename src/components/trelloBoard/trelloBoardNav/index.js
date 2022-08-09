import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { updateBoardName, starBoard } from "../../../store/slice/trelloBoardSlice"

// mui
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"

// icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import FilterListIcon from "@mui/icons-material/FilterList"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"

const BTN_COLOR = "#359ad4"
const BTN_HOVER_COLOR = "#4da1d2"

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 52px;
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

const TextField = styled.input`
    position: relative;
    min-height: 38px;
    font-size: 24px;
    border: none;
    background-color: transparent;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    text-indent: 10px;

    :hover {
        background-color: ${BTN_HOVER_COLOR};
    }

    :focus {
        color: black;
        background-color: white;
        cursor: text;
        border: none;
    }
`

export default function TrelloBoardNav({ board, ...props }) {
    // states
    const dispatch = useDispatch()
    const titleRef = useRef(null)

    useEffect(() => {
        if (titleRef && board && board.name) titleRef.current.value = board.name
    })

    // componentssx={{

    const BoardDivider = (props) => {
        return (
            <Section>
                <Divider sx={{ width: "20px", color: "black" }} orientation="vertical" variant="middle" flexItem />
            </Section>
        )
    }

    const BoardNavBtn = (props) => {
        return (
            <Section>
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: BTN_COLOR,
                        "&:hover": {
                            backgroundColor: BTN_HOVER_COLOR,
                        },
                    }}
                    {...props}
                >
                    {props.children}
                </Button>
            </Section>
        )
    }

    const BoardTemplate = () => {
        return <BoardNavBtn endIcon={<KeyboardArrowDownIcon />}>Board</BoardNavBtn>
    }

    const Title = () => {
        return (
            <Section>
                <TextField ref={titleRef} onBlur={handleUpdateTitle} onKeyDown={(event) => handleKeyDown(event)} />
            </Section>
        )
    }

    const Star = () => {
        return (
            <Section>
                <IconButton
                    onClick={(e) => handleStarOnClick(e)}
                    shape="square"
                    sx={{
                        color: "white",
                        backgroundColor: BTN_COLOR,
                        "&:hover": {
                            color: "#d9d32a",
                            backgroundColor: BTN_HOVER_COLOR,
                        },
                    }}
                >
                    {board && board.starred ? (
                        <StarRateRoundedIcon sx={{ color: "#d9d32a", fontSize: "24px" }} />
                    ) : (
                        <StarOutlineRoundedIcon sx={{ fontSize: "24px" }} />
                    )}
                </IconButton>
            </Section>
        )
    }

    const PrivacySector = () => {}

    const Profile = () => {}

    const Share = () => {}

    const AddOn = () => {
        return <BoardNavBtn startIcon={<RocketLaunchIcon />}>Power-Ups</BoardNavBtn>
    }

    const Automation = () => {
        return <BoardNavBtn startIcon={<FlashOnIcon />}>Automation</BoardNavBtn>
    }

    const Filter = () => {
        return <BoardNavBtn startIcon={<FilterListIcon />}>Filter</BoardNavBtn>
    }

    const ShowMenu = () => {
        return <BoardNavBtn startIcon={<MoreHorizIcon />}>Show menu</BoardNavBtn>
    }

    // handlers

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.target) e.target.blur()
        }
    }

    const handleUpdateTitle = () => {
        let newTitle = null
        if (titleRef && titleRef.current && titleRef.current.value) newTitle = titleRef.current.value
        if (board && newTitle != null && newTitle !== board.name) {
            const inputData = {
                boardId: board.id,
                name: newTitle,
            }
            dispatch(updateBoardName(inputData))
        }
    }

    const handleStarOnClick = (e) => {
        e.stopPropagation()

        if (board) {
            const inputData = {
                boardId: board.id,
            }
            dispatch(starBoard(inputData))
        }
    }
    return (
        <Container>
            <ContainerLeft>
                <BoardTemplate />
                <Title />
                <Star />
                <BoardDivider />
            </ContainerLeft>
            <ContainerRight>
                <AddOn />
                <Automation />
                <BoardDivider />
                <Filter />
                <ShowMenu />
            </ContainerRight>
        </Container>
    )
}
