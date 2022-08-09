import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import Button from "@mui/material/Button"

const Container = styled.div`
    position: relative;
    width: 100%;
`

const ButtonList = styled.div`
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 16px;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
`

const TextField = styled.textarea`
    position: relative;
    width: 100%;
    display: inline-block;
    border-radius: 3px;
    resize: none;
    font-family: Helvetica Neue;
    font-size: 16px;
    padding: 10px;
    box-sizing: border-box;
    ${({ extend, empty }) => {
        if (extend) {
            return `
            min-height: 120px;
            background-color: #ffffff;
        `
        } else {
            return `
            border: none;
            min-height: 80px;
            background-color: ${empty ? "#e4e4e4" : "transparent"};
            cursor: pointer;

            &:hover {
                background-color: ${empty ? "#b0b0b0" : "transparent"};
            }
        `
        }
    }};
`

const PLACEHOLDER = "Add a more detailed description..."

export default function Description({ description, handleUpdateDescription }) {
    const [showTextField, setShowTextField] = useState(false)
    const textRef = useRef(null)

    useEffect(() => {
        if (textRef && textRef.current && description) textRef.current.value = description
    })

    useEffect(() => {
        if (textRef.current.scrollHeight > textRef.current.clientHeight) {
            textRef.current.style.height = textRef.current.scrollHeight + "px"
        }
    }, [textRef])

    const handleClickContent = (e) => {
        e.stopPropagation()
        setShowTextField(true)
    }

    const handleClickSave = (e) => {
        e.stopPropagation()
        if (textRef && textRef.current) handleUpdateDescription(textRef.current.value || "")
        setShowTextField(false)
    }

    const handleClickCancel = (e) => {
        e.stopPropagation()
        console.log("handleClickCancel", description)
        if (textRef && textRef.current) textRef.current.value = description
        setShowTextField(false)
    }

    // components
    const Buttons = () => {
        if (showTextField) {
            return (
                <ButtonList>
                    <span>
                        <Button variant="contained" onClick={(event) => handleClickSave(event)}>
                            Save
                        </Button>
                    </span>
                    <span>
                        <Button
                            variant="text"
                            sx={{
                                color: "#4f4f4f",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                            onClick={(event) => handleClickCancel(event)}
                        >
                            Cancel
                        </Button>
                    </span>
                </ButtonList>
            )
        }
    }
    return (
        <Container>
            <TextField
                extend={showTextField}
                empty={description == null || description === ""}
                ref={textRef}
                onClick={(e) => handleClickContent(e)}
                placeholder={PLACEHOLDER}
            />
            <Buttons />
        </Container>
    )
}
