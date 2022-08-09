import React, { useRef, useState } from "react"
import styled from "styled-components"
import TextField from "../../../../common/TextField"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import DeleteIcon from "@mui/icons-material/Delete"
import { RemoveTask, UpdateTask } from "../../../DataFetch"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

const Delete = styled(DeleteIcon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 7px;
    color: #757575;
    cursor: pointer;
    border-radius: 3px;
    &:hover {
        background-color: #d8d8d8;
    }
`

const CheckCardContainer = styled.div`
    position: relative;
    width: 100%;
    height: 32px;
    margin-top: 8px;
    margin-bottom: 8px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 3px;

    & > ${Delete} {
        display: none;
    }

    &:hover {
        background-color: #ffffff;
        & > ${Delete} {
            display: block;
        }
    }
`

const Check = styled(Checkbox)`
    position: relative;
    display: inline-box;
`

const Title = styled.div`
    position: relative;
    width: 100%;
    display: inline-box;
    padding-left: 3px;
    padding-right: 40px;
    box-sizing: border-box;

    & > input {
        text-decoration-line: ${({ checked }) => (checked ? "line-through;" : "none")};
    }
`

export default function CheckCard({ task, cardId, checklistIndex, index }) {
    if (task == null) return

    // handler

    const handleOnChange = (e) => {
        const checked = !task.checked
        UpdateTask(cardId, checklistIndex, index, { checked: checked })
    }

    const handleUpdateName = (name) => {
        if (name == null || name === task.name) return
        UpdateTask(cardId, checklistIndex, index, { name: name })
    }

    const handleRemoveBtnOnClick = (e) => {
        e.stopPropagation()
        RemoveTask(cardId, checklistIndex, index)
    }

    return (
        <CheckCardContainer>
            <Check
                {...label}
                size="small"
                sx={{
                    padding: "1px",
                    borderRadius: "3px",
                }}
                checked={task.checked}
                onClick={(e) => handleOnChange(e)}
            />
            <Title checked={task.checked}>
                {" "}
                <TextField fullWidth fontSize="16px" text={task.name} handleTextFieldOnBlur={handleUpdateName} />{" "}
            </Title>
            <Delete sx={{ fontSize: "22px" }} onClick={(e) => handleRemoveBtnOnClick(e)} />
        </CheckCardContainer>
    )
}
