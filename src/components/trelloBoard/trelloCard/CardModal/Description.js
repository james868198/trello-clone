import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';


const Container = styled.div`
position: relative;
width: 100%;
`

const ButtonList = styled.div`
position: relative;
width: 100%;
height: 30px;
display: flex;
flex-direction: row;
justify-content: start;
align-items: center;
gap:5px;
`

const TextField = styled.textarea`
position: relative;
width: 100%;
display: inline-block;
border-radius: 3px;
resize: none;
font-family: Helvetica Neue;
font-size: 14px;
padding: 10px;
box-sizing: border-box;

${({extend}) => {
    if (extend) {
        return `
            height: 100px;
            background-color: #ffffff;
        `
    } else {
        return `
            border: none;
            height: 60px;
            background-color: '#e4e4e4';
            cursor: pointer;

            &:hover {
                background-color: #b0b0b0;
            }
        `
    }
}};

`

const PLACEHOLDER = 'Add a more detail description...'

export default function Description({description, handleUpdateDescription}) {
    const [showTextField, setShowTextField] = useState(false)
    const textRef = useRef(null)
    
    const handleClickContent = (e) => {
        e.stopPropagation()
        setShowTextField(true)
    }

    const handleClickSave = (e) => {
        e.stopPropagation()
        if(textRef && textRef.current && textRef.current.value)
            handleUpdateDescription(textRef.current.value)
        setShowTextField(false)

    }

    const handleClickCancel = (e) => {
        e.stopPropagation()
        setShowTextField(false)
    }

    // components
    const Buttons = () => {
        if (showTextField) {
            return (
                <ButtonList>
                    <span><Button variant="contained" onClick={event => handleClickSave(event)}>Save</Button></span>
                    <span><Button 
                        variant="text" 
                        sx={{color:'#4f4f4f', '&:hover': {
                            backgroundColor: '#f0f0f0',
                        }, }} 
                        onClick={event => handleClickCancel(event)}
                        >
                            Cancel
                    </Button></span>
                </ButtonList>)
        }
    }
    return (
        <Container>
            <TextField 
                extend={showTextField}
                empty={description == null || description == undefined || description === ""} 
                ref={textRef} 
                onClick={event => handleClickContent(event)}  
                placeholder={description != null ? description: PLACEHOLDER}
                onBlur={event => handleClickSave(event)}
                />
            <Buttons/>
        </Container>
    )

}