import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import {Link} from "react-router-dom"
import { createBoard, archiveBoard, selectBoards } from '../store/slice/trelloBoardSlice';

// material
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import cardBackgroundImage from '../static/images/tech-background.jpg'

export const Boards = styled.div`
width: 1 vw;
display: flex;
flex-direction: row;
gap: 10px;
flex-wrap: wrap;
padding: 10px;
`

export const Menu = styled.div`
width: 1 vw;
display: flex;
flex-direction: row;
gap: 10px;
`

export const TrelloBoard = styled.div`
width: 300px;
min-width: 250px;
min-height: 400px;
margin: 5px;
`
export const BoardCardWrapper = styled.div`
width: 300px;
min-width: 250px;
min-height: 400px;
margin: 5px;
`
export const BoardCard = (board) => {
    return (
        <BoardCardWrapper key={board.boardId}>
            <Link to={`boards/${board.boardId}`}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                    component="img"
                    height="140"
                    image= {cardBackgroundImage}
                    alt="tech-background"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        #{board.boardId}. {board.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {board.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Link>
        </BoardCardWrapper>
    )
} 

const Home = () => {
    
    const dispatch = useDispatch();  
    
    const handleCreateBoard = () => dispatch(createBoard())
    const boardList = useSelector(selectBoards)

    return (
        <div>
            <h1>boards</h1>
            <Menu>
                <Button variant="outlined" onClick={handleCreateBoard}>Create Board</Button>
            </Menu>
            <Boards>
                {boardList.map((board) => {
                    return BoardCard(board)
                })}
            </Boards>
        </div>
    )
}

export default Home