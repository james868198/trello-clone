import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from "react-router-dom";

import TrelloList from './trelloList';
import TrelloBoardNav from './trelloBoardNav';
import styled from 'styled-components';
import { addList, insertCardToList, getListById } from '../../store/slice/trelloListSlice';
import { getBoardById, insertListToBoard, addListToBoard } from '../../store/slice/trelloBoardSlice';

// mul
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export const TrelloBoardContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color: ${props => props.theme.palette.background.main};
display: flex;
flex-direction: column;
color: ${props => props.theme.palette.primary.contrastText};
`

export const TrelloBoardHeader = styled.div`
display:inline-block;
position: relative;
width: 100%;
max-height: 70px;
`

export const TrelloBoardContent = styled.div`
position: relative;
width: 100%;
flex-grow: 1;
overflow-x: scroll;
overflow-y: scroll;

`

export const TrelloBoardContentContainer = styled.div`
position: relative;
height: 100%;
padding: 16px;
display: flex;
flex-direction: row;
justify-content: start;
gap: 16px;
`

export const TrelloListWrapper = styled.div`
display: inline;
min-height: 320px;
min-width: 300px;
width: 275px;
`

export default function TrelloBoard() {

  const [draggable, setDraggable] = useState(true)
  const draggedCard = useRef(null)
  const draggedList = useRef(null)

  // const [draggedCard, setDraggedCard] = useState(null)
  // const [draggedList, setDraggedList] = useState(null)

  const dispatch = useDispatch(); 
  const { boardId } = useParams();
  const board = useSelector(getBoardById(boardId));

  if (board == null) {
    return <Navigate to="/404" />
  }

  // handlers
  const handleAddList = (e) => {
    e.stopPropagation(); 
    const listId = `list-${Math.round(Math.random() * 10000).toString()}`
    const inputData = {
      boardId: boardId,
      listId: listId,
      now: Date.now()
    }
    dispatch(addList(inputData));
    dispatch(addListToBoard(inputData));
  };

  // dnd
  
  // const insertCardToStore = (listIndex, cardIndex = 1) => {
  //   // update card position
  //   if (listIndex == null || draggedCard == null)
  //     return

  //   let newCard = draggedCard
  //   if (lists[listIndex].id !== draggedCard.listid) {
  //     newCard = Object.assign({}, draggedCard)
  //     newCard.listId = lists[listIndex].id
  //   }
  //   setDraggedCard(newCard)
  //   const inputData = {
  //     listOrder: listIndex,
  //     cardOrder: cardIndex,
  //     draggedCard: draggedCard,
  //     newCard: newCard
  //   }
  //   dispatch(insertCard(inputData))
  //   // setDraggedCard(null)
  // }

  const handleOnDragStart = (e, id, type) => {
    e.stopPropagation();
    // console.log('handleOnDragStart', type, item)
    // console.log(e.target)

    if (type === 'card' && draggedList == null) {
      if (draggedCard && id === draggedCard.current)
        return
      draggedCard.current = id
    } else if (type === 'list' && draggedCard == null) {
      if (draggedCard && id === draggedList.current)
        return
      draggedList.current = id
    }
  }

  const handleOnDragEnd = (e) => {
    e.stopPropagation();
    // console.log('handleOnDragEnd',draggedList, draggedCard)
    if (draggedCard) 
      draggedCard.current = null
    if (draggedList)
      draggedList.current = null
  }
  
  const handleCardOnDragEnter = (e, index, ListOrder) => {
    e.stopPropagation();
    // console.log('handleOnDragEnter draggedCard:', draggedCard)

    // if (draggedCard == null || !draggable || draggedList != null)
    //   return
    // const list = lists[ListOrder];
    
    // if (lists[ListOrder].cards[index].id === draggedCard.id)
    //   return
    // // get box height and width
    // const box = e.target.getBoundingClientRect()

    // let cardIndex = index

    // // check if the Y of the dragged card higher than the middle of the box
    // if (e.clientY > box.top + box.height / 2) {
    //   cardIndex ++
    // } 
    // // console.log('handleOnDragEnter', list.cards[index].id, draggedCard.id)
    // if (cardIndex < list.cards.length && list.cards[cardIndex].id === draggedCard.id)
    //   return

    // // temperately disable draggle
    // setDraggable(false)
    // setTimeout(() => {
    //   setDraggable(true)
    // }, 100);

    // // update card position
    // insertCardToStore(ListOrder, index)
  }

  const handleListOnDragEnter = (e, index) => {
    e.stopPropagation();
    // console.log('handleListOnDragEnter target:', e.target  
    // const listId = board.lists[index]
    
    // if (draggedList == null || !draggable || draggedCard != null) {
    //   // update card if card list is empty. [TODO]: move logic to another place
    //   if (draggable && draggedCard && lists[index].cards.length === 0) {
    //     insertCardToStore(index)
    //   }
    //   return
    // }

    // const box = e.target.getBoundingClientRect()

    // let ListIndex = index
    
    // // check if the Y of the dragged list higher than the middle of the box
    // if (e.clientX > box.right + box.width / 2) {
    //   ListIndex++
    // } 
    // if (ListIndex < board.lists.length && board.lists[ListIndex] === draggedList.id)
    //   return

    // // temperately disable draggle
    // setDraggable(false)
    // setTimeout(() => {
    //   setDraggable(true)
    // }, 100);
     
    // // update store
    // const inputData = {
    //   listOrder: index,
    //   draggedList: draggedList
    // }
    // dispatch(insertListToBoard(inputData));

  }

  // components
 
  const CreateListBtn = () => {
    return (
      <TrelloListWrapper>
        <Button
            sx={{
              color: 'white', 
              backgroundColor: '#359ad4',
              '&:hover': {
                  backgroundColor: '#4da1d2',
              }, 
          }}
          fullWidth 
          onClick={event => handleAddList(event)}
          startIcon={<AddIcon/>}
        >
          Add another list
        </Button>
      </TrelloListWrapper>
    )
  }
  
  return (
      <TrelloBoardContainer>
        <TrelloBoardHeader>
          <TrelloBoardNav board={board}/>
        </TrelloBoardHeader>
        <TrelloBoardContent>
          <TrelloBoardContentContainer>
            {board.lists.map((listId, index) => {
                return (
                  <TrelloListWrapper 
                    key={listId} 
                    onDragEnd={event => handleOnDragEnd(event)}  
                    onDragEnter={event => handleListOnDragEnter(event, index)} 
                    onDragStart={event => handleOnDragStart(event, listId, 'list')}
                    >
                    <TrelloList                     
                      key={listId} 
                      listId={listId} 
                      order={index} 
                      draggedCard = {draggedCard}
                      draggedList = {draggedList}
                      handleOnDragStart={handleOnDragStart}
                      handleOnDragEnd={handleOnDragEnd}
                      handleCardOnDragEnter={handleCardOnDragEnter}
                      />
                  </TrelloListWrapper>
                )
              })}
            <CreateListBtn/>
          </TrelloBoardContentContainer>
        </TrelloBoardContent>
        
      </TrelloBoardContainer>
  )
}

