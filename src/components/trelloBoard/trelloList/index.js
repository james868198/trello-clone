import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateListTitle, removeList, dragCard, dropCard, insertCard, selectDraggedCard } from '../../../store/slice/trelloListSlice';

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

export default function TrelloList({list, order}) {
  

  const [titleEditable, setTitleEditable] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')
  const [draggable, setDraggable] = useState(true)

  const dispatch = useDispatch();  
  const draggedCard = useSelector(selectDraggedCard)

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

  // drag card
  const handleOnDragStart = (e, card) => {
    // e.preventDefault();
    if (card === draggedCard)
      return
    const inputData = {
      card: card
    }
    console.log('handleOnDragStart', inputData)
    dispatch(dragCard(inputData))
  }

  const handleOnDragEnd = (e) => {
    e.preventDefault();
    if (draggedCard) {
      console.log('handleOnDragEnd', draggedCard.id)
      dispatch(dropCard())
    }
  }

  const handleOnDrop = (e) => {
    e.preventDefault();
    const inputData = {
      listOrder: order,
      Y: e.clientX,
      X: e.clientY
    }
    console.log('handleOnDrop', inputData)
    // // dispatch(dropCard())
    // dispatch(insertCard(inputData))

  }
  const handleOnDragOver = (e) => {
    // e.preventDefault();
    // const selectedIndex = e.target.options.selectedIndex;
    // console.log('handleOnDrop Over', e.target.options)
    // if (selectedIndex >= 0)
    //   e.target.style.backgroundColor = '#41ce00'
  }

  const handleOnDragEnter = (e, index) => {
    if (draggedCard == null || list.cards[index].id === draggedCard.id || !draggable)
      return
    
    // get box height and width
    const box = e.target.getBoundingClientRect()

    let cardIndex = index

    // check if the Y of the dragged card higher than the middle of the box
    if (e.clientY > box.top + box.height / 2) {
      cardIndex ++
    } 
    console.log('handleOnDragEnter', list.cards[index].id, draggedCard.id)
    if (cardIndex < list.cards.length && list.cards[cardIndex].id === draggedCard.id)
      return

    // temperately disable draggle
    setDraggable(false)
    setTimeout(() => {
      setDraggable(true)
    }, 200);

    // update card position
    const inputData = {
      listOrder: order,
      cardOrder: index,
    }
    dispatch(insertCard(inputData))
  }

  const isDragged = (card) => {
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
    <Card sx={{ width: 1, backgroundColor: "#FAFAFA"}}  >
      <CardContent>
        <Typography sx={{ fontSize: 24, cursor: 'pointer' }}  align='left' color="text.secondary" variant='h3' gutterBottom onDoubleClick={handleShowEditTitleField}>
          <TrelloListTitle/>
        </Typography>
        <CardsWrapper   >
          {list.cards.map((card, index) => {
            return (
              <TrelloCardWrapper dragged={isDragged(card)} key={index} draggable onDragEnd={handleOnDragEnd}  onDragEnter={event => handleOnDragEnter(event, index)} onDragStart={event => handleOnDragStart(event, card)} >
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
    </Card>
  )
    
}