import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { createBoard, archiveBoard, getBoards } from '../store/slice/trelloBoardSlice';

// mui
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'


export const Container = styled.div`
position: relative;
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
gap: 16px;
margin-top: 16px;

`

export const CardContainer = styled.div`
width: 220px;
height: 120px;
border-radius: 4px;
background-color: ${props => props.theme.palette.primary.main};
font-family: ${props => props.theme.typography.fontFamily["Helvetica Neue"]};
color: ${props => props.theme.palette.primary.contrastText};
&:hover {
    opacity: 0.5;
}
`

export const CardBtnContainer = styled(CardContainer)`
background-color: #d9d9d9;
color: #979797;
cursor: pointer;
display:inline-flex;
justify-content: center;
align-items: center;
`

export const CardTitle = styled.div`
position: relative;
padding: 10px;
`

export const Card = (board) => {
    return (
        <Link to={`b/${board.id}`} key={board.id}>
            <CardContainer>
                <CardTitle>
                    <h3>#{board.id}. {board.name}</h3>
                </CardTitle>
            </CardContainer>
        </Link>
    )
} 

export default function Boards (props) {

    const dispatch = useDispatch();  
    
    const handleCreateBoard = () => dispatch(createBoard())
    const boards = useSelector(getBoards)
    const CreateBoardBtn = () => {
        return (
            <CardBtnContainer onClick={handleCreateBoard}>
                <h4>Create Board</h4>
            </CardBtnContainer>
        )
    }
    return (
        <Container>
            {boards.map((board) => {
                return Card(board)
            })}
            <CreateBoardBtn/>
        </Container>
    )
} 