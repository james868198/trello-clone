import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ButtonList from './ButtonList';
import Button from '@mui/material/Button';
// import { updateCardTitle } from '../../../store/slice/trelloListSlice';
// import { useSelector, useDispatch } from 'react-redux';


const Modal = styled.div`
display:  ${({open}) => open ? 'block' : 'none'};
position: absolute; 
z-index: 2; 
width: 100%; 
height: 100%;
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
cursor: initial;
`

const ModalContent = styled.div`
position: relative;
z-index: 999; /* Sit on top */
display: flex;
flex-direction: row;
gap: 30px;
`
const ModalBody = styled.div`
position: relative;
width: 100%; 
display: inline-flex;
flex-direction: column;

`
const ModalButtonsContainer = styled.div`
position: absolute;
left: 100%;
top: 0;
`

const TextField = styled.textarea`
position: relative;
box-sizing: border-box;
width: 100%;
height: 120px;
border-radius: 3px;
resize: none;
font-family: Helvetica Neue;
font-size: 16px;
padding: 10px;

background-color: #ffffff;
border: none;

`
const SaveButton = styled.div`
position: relative;
margin-top: 10px;
width: 100px;
text-align: left;
`

export default function TextModal({card, open, handleChangeTitle, handleCloseModal}) {
    
    const titleRef = useRef(null)
    useEffect(() => {
        if (card && titleRef && titleRef.current)
            titleRef.current.value = card.title
    })

    const handleSaveChange = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (titleRef && titleRef.current && titleRef.current.value)
            handleChangeTitle(titleRef.current.value)
    }
    return(
        <Modal open={open}>
            <ModalBackground onClick={handleCloseModal}></ModalBackground>
            <ModalContent>
                <ModalBody>
                    <TextField ref={titleRef} 
                    onClick={event => event.stopPropagation()}
                    />
                    <SaveButton>
                        <Button  variant="contained" onClick={event => handleSaveChange(event)}>Save Change</Button>
                    </SaveButton>
                </ModalBody>
                <ModalButtonsContainer>
                    <ButtonList/>
                </ModalButtonsContainer>
            </ModalContent>
        </Modal>
    )
}