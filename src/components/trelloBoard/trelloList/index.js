import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateListTitle, removeList } from '../../../store/slice/trelloListSlice';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TrelloCard from '../trelloCard';

import styled from 'styled-components';

export const TrelloListContainer = styled(Card)`
overflow: hidden;
`

export const TrelloListDraggedContainer = styled(TrelloListContainer)`
overflow-y: auto;
overflow-x: hidden;
`

export const CardsWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: start;
gap: 10px;
`

export const TrelloCardWrapper = styled.div`
display: inline-box;
position: relative;
width: 100%;
margin: 2px;
opacity: ${({dragged}) => dragged ? '0.3' : '1'};
`

const CssTextField = styled(TextField)`
position: relative;
width: 100%;
  & .MuiOutlinedInput-root {
    position: relative;
    width: 100%;
    
    color: black;
    border: none;
    // &.Mui-focused fieldset {
    //   border: none;
    // }
  }
`

export default function TrelloList({list, order, ...props}) {
  

  const [titleEditable, setTitleEditable] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')

  const dispatch = useDispatch();  
  const {handleOnDragStart, handleOnDragEnd, handleCardOnDragEnter, draggedCard, draggedList} = props
  
  if (!list)
    return

  // initialize state
  const  handleAddCard = () => {
    console.log('handleAddCard')
    const cardId = `card-${Math.round(Math.random() * 10000).toString()}`
    const inputData = {
      order: order,
      card: {
        id: cardId,
        title: `${cardId}-title`,
        listId: list.id
      }
    }
    dispatch(addCard(inputData))
  }
  const handleRemoveList = () => {
    console.log('handleRemoveList', list)
    if(list == null)
      return
    const inputData = {
      listId: list.id
    }
    dispatch(removeList(inputData))
  }

  const handleShowEditTitleField = () => {
    console.log('handleShowEditTitleField')
    setTitleEditable(true)
  }

  const handleEditListTitle = (e) => {
    console.log('handleEditListTitle', e.target.value)
    setNewListTitle(e.target.value)
  }

  const handleChangeListTitle = () => {
    console.log('handleChangeListTitle')
    if (newListTitle !== '') {
      const inputData = {
        order: order,
        title: newListTitle
      }
      dispatch(updateListTitle(inputData))
    }
    
    setTitleEditable(false)
  }

  const isListDragged = (list) => {
    if (list && draggedList)
      return list.id === draggedList.id
    return false
  }

  const isCardDragged = (card) => {
    if (card && draggedCard)
      return card.id === draggedCard.id
    return false
  }

  const TrelloListTitle = () => {
    if (titleEditable)
      return (<CssTextField value={newListTitle} onChange={handleEditListTitle} onBlur={handleChangeListTitle} autoFocus/>)
    else  
      return (<span >{list.title}</span>)
  }

  return (
    <TrelloListContainer draggable sx={{ width: 1, backgroundColor: "#FAFAFA"}} >
      <CardContent >
        <Typography sx={{ fontSize: 24, cursor: 'pointer' }}  align='left' color="text.secondary" variant='h3' gutterBottom onDoubleClick={handleShowEditTitleField}>
          <TrelloListTitle/>
        </Typography>
        <CardsWrapper>
          {list.cards.map((card, index) => {
            return (
              <TrelloCardWrapper 
                dragged={isCardDragged(card)} 
                draggable
                key={index} 
                onDragEnd={event => handleOnDragEnd(event)}  
                onDragEnter={event => handleCardOnDragEnter(event, index, order)} 
                onDragStart={event => handleOnDragStart(event, card, 'card')} >
                <TrelloCard card={card} order={index} listOrder={order} /> 
              </TrelloCardWrapper>
            )
          })}
        </CardsWrapper>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon={<AddIcon />} onClick={handleAddCard}>Add Card</Button>
        <Button size="small" startIcon={<RemoveIcon />}onClick={handleRemoveList}>Remove list</Button>
      </CardActions>
    </TrelloListContainer>
  )
    
}