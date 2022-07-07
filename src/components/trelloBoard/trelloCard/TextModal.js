import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Modal = styled.div`
position: absolute; /* Stay in place */
z-index: 2; /* Sit on top */
width: 100%; /* Full width */
height: 100%; /* Full height */
`

const ModalBackground = styled.div`
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
`

const ModalDialog = styled.div`
position: relative;
z-index: 999; /* Sit on top */
width: 110%; /* Full width */
transform: translateX(-5%);
`


const CssTextField = styled(TextField)`
position: relative;
width: 100%;
  & .MuiOutlinedInput-root {
    position: relative;
    width: 100%;
    background-color: white;
    
    color: black;
    border: none;
    // &.Mui-focused fieldset {
    //   border: none;
    // }
  }
`
const CssButton = styled.div`
position: relative;
margin-top: 2px;
width: 100%;
text-align: left;
`

export default function TextModal({handleChangeTitle, handleCloseEditTitleModal}) {
    const textRef = useRef(null)

    const handleSaveChange = () => {
        if (textRef && textRef.current && textRef.current.value)
            handleChangeTitle(textRef.current.value)
    }
    return(
        <Modal>
            <ModalBackground onClick={handleCloseEditTitleModal}></ModalBackground>
            <ModalDialog>
                <CssTextField inputRef={textRef}  autoFocus/>
                <CssButton><Button  variant="contained" onClick={handleSaveChange}>Save Change</Button></CssButton>
            </ModalDialog>
        </Modal>
    )
}