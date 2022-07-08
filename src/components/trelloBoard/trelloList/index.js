import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, updateListTitle, removeList } from '../../../store/slice/trelloListSlice';

// mui

import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';

// icon
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TrelloCard from '../trelloCard';

import styled from 'styled-components';
import { current } from '@reduxjs/toolkit';

const LIST_BACKGROUND_COLOR = '#ebecf0';
const LIST_COLOR = '#2d2d2d';

const Container = styled.div`
position: relative;
width: 100%;
background-color: ${LIST_BACKGROUND_COLOR};
color: ${LIST_COLOR};
overflow: hidden;
border-radius: 3px;
`
const ContainerSection = styled.div`
position: relative;
padding-left: 15px;
padding-right: 15px;
padding-bottom: 15px;

`

const Header = styled(ContainerSection)`
padding-left: 15px;
padding-right: 40px;
padding-top: 15px;
`
const Content = styled(ContainerSection)`
display: flex;
flex-direction: column;
justify-content: start;
gap: 10px;
`

const Footer = styled(ContainerSection)`
padding-left: 20px;
padding-bottom: 5px;
`


export const CardWrapper = styled.div`
display: inline-box;
position: relative;
width: 100%;
margin: 2px;
opacity: ${({dragged}) => dragged ? '0.3' : '1'};
`

const TextField = styled.input`
position: relative;
font-size: 22px;
border: none;
background-color: ${LIST_BACKGROUND_COLOR};
color: ${LIST_COLOR};
cursor: pointer;
:focus {
  background-color: white;
  cursor: text;
}

`
const FirstTitle =  styled.div`

`
const SecondTitle =  styled.div`
margin-top: 5px;
font-size: 18px;
`

const MenuIconContainer =  styled.div`
position: absolute;
top: 10px;
right: 10px;

`


export default function TrelloList({list, order, ...props}) {
  const titleRef = useRef(null)
  const dispatch = useDispatch();  
  const {handleOnDragStart, handleOnDragEnd, handleCardOnDragEnter, draggedCard, draggedList} = props
  
  useEffect(() => {
    if (!list)
      return
    if (titleRef)
      titleRef.current.value = list.title
  });
  
  // handlers
  const eventHandler = (callback) => (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    callback()
  }
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

  const handleChangeListTitle = () => {
    
    let newTitle = null
    if(titleRef && titleRef.current && titleRef.current.value)
      newTitle = titleRef.current.value
    if (newTitle != null && newTitle !== list.title) {
      const inputData = {
        order: order,
        title: newTitle
      }
      dispatch(updateListTitle(inputData))
    }    
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target)
        e.target.blur()
    }
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

  // components

  const TrelloListTitle = () => {
    const cardAmount = list.cards == null ? 0 :list.cards.length
    return (
      <>
      <FirstTitle>
        <TextField 
          ref={titleRef}
          onBlur={handleChangeListTitle} 
          onKeyDown={event => handleKeyDown(event)}
          />
      </FirstTitle>
      <SecondTitle>{cardAmount} cards</SecondTitle>
      </>
    )
      
  }

  const More = () => {
    return (
      <MenuIconContainer>
        <IconButton 
          sx={{
            color: '#3d3d3d',
            '&:hover': {
                backgroundColor: '#d1d2d5',
          }}} 
        
          shape="square">
          <MoreHorizIcon sx={{fontSize: '20px'}}/>
        </IconButton>
      </MenuIconContainer>
    )
  }

  const AddCardBtn = () => {
    return (
      <Button 
        size="small" 
        variant="text" 
        startIcon={<AddIcon />} 
        onClick={eventHandler(handleAddCard)}
        sx={{
          justifyContent: "flex-start",
          color: '#2d2d2d',
          '&:hover': {
              backgroundColor: '#d1d2d5',
          }}} 
        >
          Add Card
      </Button>

    )
  }

  const RemoveListBtn = () => {
    return (
      <Button 
        size="small" 
        variant="text" 
        startIcon={<RemoveIcon />} 
        onClick={eventHandler(handleRemoveList)}
        sx={{
          justifyContent: "flex-start",
          color: '#2d2d2d',
          '&:hover': {
              backgroundColor: '#d1d2d5',
          }}} 
        >
          Remove List
      </Button>

    )
  }

  return (
    <Container draggable >
      <Header>
        <TrelloListTitle/>
        <More/>
      </Header>
      <Content>
        {list.cards.map((card, index) => {
          return (
            <CardWrapper 
              dragged={isCardDragged(card)} 
              draggable
              key={index} 
              onDragEnd={event => handleOnDragEnd(event)}  
              onDragEnter={event => handleCardOnDragEnter(event, index, order)} 
              onDragStart={event => handleOnDragStart(event, card, 'card')} >
              <TrelloCard card={card} order={index} listOrder={order} /> 
            </CardWrapper>
          )
        })}
      </Content>
      <Footer>
        <AddCardBtn/>
        <RemoveListBtn/>
      </Footer>
    </Container>
  )
    
}