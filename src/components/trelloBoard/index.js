import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import TrelloList from './trelloList';
import styled from 'styled-components';
import { addList, selectListData, insertCard, insertList } from '../../store/slice/trelloListSlice';
import Button from '@mui/material/Button';

export const TrelloBoardContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color: #1182cd;
display: flex;
flex-direction: column;
`

export const TrelloBoardHeader = styled.div`
display:inline-block;
position: relative;
width: 100%;
height: 70px;
background-color: #64ddef;
padding: 10px;

`

export const TrelloListContainer = styled.div`
position: relative;
width: 100%;
flex-grow: 1;
overflow-x: scroll;
overflow-y: scroll;

`

export const ListWrapper = styled.div`
// min-height: 500px;
position: relative;
height: 100%;
padding: 10px 0px 10px 0px;
display: flex;

flex-direction: row;
justify-content: start;
`

export const TrelloListWrapper = styled.span`
min-width: 275px;
width: 275px;
padding: 10px;

`



export default function TrelloBoard() {

  const [draggable, setDraggable] = useState(true)
  const [draggedCard, setDraggedCard] = useState(null)
  const [draggedList, setDraggedList] = useState(null)

  const dispatch = useDispatch(); 

  let { boardId } = useParams();
  
  const listData = useSelector(selectListData)
  const lists = listData.lists
  
  // handlers
  const handleAddList = () => {
    
    const data = {
      boardId: boardId,
      listId: `list-${Math.round(Math.random() * 10000).toString()}`
    }
    dispatch(addList(data));
    // await dispatch(addListToListOrder(data));
  };

  // dnd

  const handleOnDragStart = (e, item, type) => {
    e.stopPropagation();
    // console.log('handleOnDragStart', type, item)
    if (type === 'card') {
      if (item === draggedCard)
        return
      setDraggedCard(item);
    } else if (type === 'list') {
      if (item === draggedList)
        return
      setDraggedList(item);
    }
  }

  const handleOnDragEnd = (e) => {
    e.stopPropagation();
    // console.log('handleOnDragEnd',draggedList, draggedCard)
    if (draggedCard) 
      setDraggedCard(null);
    if (draggedList)
      setDraggedList(null);
  }

  
  const handleCardOnDragEnter = (e, index, ListOrder) => {
    // console.log('handleOnDragEnter draggedCard:', draggedCard)
    e.stopPropagation();

    if (draggedCard == null || !draggable)
      return
    const list = lists[ListOrder];
    
    if (lists[ListOrder].cards[index].id === draggedCard.id)
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
      listOrder: ListOrder,
      cardOrder: index,
      draggedCard: draggedCard
    }
    dispatch(insertCard(inputData))
  }

  const handleListOnDragEnter = (e, index) => {

    e.stopPropagation();
    if (draggedList == null || !draggable)
      return
    const box = e.target.getBoundingClientRect()

    let ListIndex = index
    
    // check if the Y of the dragged list higher than the middle of the box
    if (e.clientX > box.right + box.width / 2) {
      ListIndex++
    } 
    if (ListIndex < lists.length && lists[ListIndex].id === draggedList.id)
      return

    // temperately disable draggle
    setDraggable(false)
    setTimeout(() => {
      setDraggable(true)
    }, 200);
     
    // update store
    const inputData = {
      listOrder: index,
      draggedList: draggedList
    }
    dispatch(insertList(inputData));

  }

  const isCardDragged = (card) => {
    if (card && draggedCard)
      return card.id === draggedCard.id
    return false
  }
  
  return (
      
      <TrelloBoardContainer>
        <TrelloBoardHeader>
          <h1>trello board: {boardId} </h1>
        </TrelloBoardHeader>
        <TrelloListContainer>
          <ListWrapper>
            {lists.map((list, index) => {
              return (
                <TrelloListWrapper
                  draggable 
                  key={list.id} 
                  onDragEnd={event => handleOnDragEnd(event)}
                  onDragEnter={event => handleListOnDragEnter(event, index)}
                  onDragStart={event => handleOnDragStart(event, list, 'list')}>
                  <TrelloList 
                    key={list.id} 
                    list={list} 
                    order={index} 
                    isCardDragged = {isCardDragged}
                    handleOnDragStart={handleOnDragStart}
                    handleOnDragEnd={handleOnDragEnd}
                    handleOnDragEnter={handleCardOnDragEnter}
                    />
                </TrelloListWrapper>
              )
            })}
            <TrelloListWrapper>
              <Button fullWidth variant="contained" onClick={handleAddList}>Create list</Button>
            </TrelloListWrapper>
          </ListWrapper>
        </TrelloListContainer>
        
      </TrelloBoardContainer>
  )
}

