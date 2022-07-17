import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {updateListTitle, removeListById, getListById, addCardToList } from '../../../store/slice/trelloListSlice';
import {removeListFromBoard } from '../../../store/slice/trelloBoardSlice';
import { useDNDContext }  from '../DNDContext';

import { addCard } from '../../../store/slice/trelloCardSlice';

import MoreMenu from '../../common/MoreMenu';

// mui

import Button from '@mui/material/Button';

// icon
import AddIcon from '@mui/icons-material/Add';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TrelloCard from '../trelloCard';

import styled from 'styled-components';

const LIST_BG_COLOR = '#ebecf0';
const LIST_COLOR = '#2d2d2d';

const Container = styled.div`
position: relative;
width: 100%;
background-color: ${LIST_BG_COLOR};
color: ${LIST_COLOR};
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
background-color: ${LIST_BG_COLOR};
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

const MoreIconContainer =  styled.div`
position: absolute;
top: 10px;
right: 10px;

`


export default function TrelloList({listId, ...props}) {
  const titleRef = useRef(null)
  const dispatch = useDispatch()  
  const list = useSelector(getListById(listId));
  const {
    draggedList,
    handleOnDragStart,
    handleOnDragEnd,
    handleOnDragEnter
  } = useDNDContext()

  useEffect(() => {
    if (!list)
      return
    if (titleRef)
      titleRef.current.value = list.title
  });
  
  if (!list)
    return
  // handlers
  const eventHandler = (callback) => (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    callback()
  }  

  const  handleAddCard = () => {
    console.log('handleAddCard', list)
    const cardId = `card-${Math.round(Math.random() * 10000).toString()}`
    const now = Date.now()
    const inputData = {
      cardId: cardId,
      listId: list.id,
      now: now
    }
    dispatch(addCard(inputData))
    dispatch(addCardToList(inputData))

  }
  const handleRemoveList = () => {
    console.log('handleRemoveList', list)
    if(list == null)
      return
    const inputData = {
      listId: list.id,
      boardId: list.boardId
    }
    dispatch(removeListFromBoard(inputData))
    dispatch(removeListById(inputData))
  }

  const handleChangeListTitle = () => {
    
    let newTitle = null
    if(titleRef && titleRef.current && titleRef.current.value)
      newTitle = titleRef.current.value
    if (list && newTitle != null && newTitle !== list.title) {
      const inputData = {
        listId: list.id,
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

  // const isListDragged = (list) => {
  //   if (list && draggedList)
  //     return list.id === draggedList.id
  //   return false
  // }

  const isCardDragged = (card) => {
    // if (card && draggedCard)
    //   return card.id === draggedCard.id
    return false
  }

  const MenuItems = [
    {
      name: "Remove List...",
      handler: handleRemoveList
    }
  ]
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
      <MoreIconContainer>
        <MoreMenu items={MenuItems} title={'List actions'}/>
      </MoreIconContainer>
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

  return (
      <Container
        draggable 
        id={listId} 
        onDragEnd={event => handleOnDragEnd(event)}  
        onDragStart={event => handleOnDragStart(event)}
        onDragEnter={event => handleOnDragEnter(event)}
      >
        <Header>
          <TrelloListTitle/>
          <More/>
        </Header>
        {list.cards.map((cardId, index) => {
          if (cardId)
            return (
              <TrelloCard 
                cardId={cardId} 
                key={cardId} 
                index={index}
                /> 
              )
        })}
        <Footer>
          <AddCardBtn/>
        </Footer>
      </Container>
  )
}