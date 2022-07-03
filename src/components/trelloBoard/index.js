import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import TrelloList from './trelloList';
import TrelloBoardNav from './trelloBoardNav';
import NavButton from '../common/NavButton';
import styled from 'styled-components';
import { addList, selectListData, insertCard, insertList } from '../../store/slice/trelloListSlice';
import AddIcon from '@mui/icons-material/Add';

export const TrelloBoardContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
background-color: ${props => props.theme.palette.primary.dark};
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
min-width: 275px;
width: 275px;
// margin: 10px;

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
  const insertCardToStore = (listIndex, cardIndex = 1) => {
    // update card position
    if (listIndex == null || draggedCard == null)
      return

    let newCard = draggedCard
    if (lists[listIndex].id !== draggedCard.listid) {
      newCard = Object.assign({}, draggedCard)
      newCard.listId = lists[listIndex].id
    }
    setDraggedCard(newCard)
    const inputData = {
      listOrder: listIndex,
      cardOrder: cardIndex,
      draggedCard: draggedCard,
      newCard: newCard
    }
    dispatch(insertCard(inputData))
    // setDraggedCard(null)
  }

  const handleOnDragStart = (e, item, type) => {
    e.stopPropagation();
    // console.log('handleOnDragStart', type, item)
    // console.log(e.target)

    if (type === 'card' && draggedList == null) {
      if (item === draggedCard)
        return
      setDraggedCard(item);
    } else if (type === 'list' && draggedCard == null) {
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

  const handleOnDrop = (e) => {
    e.stopPropagation();
    // console.log('handleOnDrop', draggedCard)
    if (draggedCard) 
      setDraggedCard(null);
    if (draggedList)
      setDraggedList(null);
  }

  
  const handleCardOnDragEnter = (e, index, ListOrder) => {
    e.stopPropagation();
    // console.log('handleOnDragEnter draggedCard:', draggedCard)

    if (draggedCard == null || !draggable || draggedList != null)
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
    // console.log('handleOnDragEnter', list.cards[index].id, draggedCard.id)
    if (cardIndex < list.cards.length && list.cards[cardIndex].id === draggedCard.id)
      return

    // temperately disable draggle
    setDraggable(false)
    setTimeout(() => {
      setDraggable(true)
    }, 100);

    // update card position
    insertCardToStore(ListOrder, index)
  }

  const handleListOnDragEnter = (e, index) => {
    e.stopPropagation();
    // console.log('handleListOnDragEnter target:', e.target  

    if (draggedList == null || !draggable || draggedCard != null) {
      // update card if card list is empty. [TODO]: move logic to another place
      if (draggable && draggedCard && lists[index].cards.length === 0) {
        insertCardToStore(index)
      }
      return
    }

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
    }, 100);
     
    // update store
    const inputData = {
      listOrder: index,
      draggedList: draggedList
    }
    dispatch(insertList(inputData));

  }

  // components
 
  const CreateListBtn = () => {
    return (
      <TrelloListWrapper>
        <NavButton
          fullWidth 
          onClick={handleAddList}
          startIcon={<AddIcon/>}
        >
          Add another list
        </NavButton>
      </TrelloListWrapper>
    )
  }
  
  return (
      <TrelloBoardContainer>
        <TrelloBoardHeader>
          <TrelloBoardNav title={`trello-board-${boardId}`}/>
        </TrelloBoardHeader>
        <TrelloBoardContent>
          <TrelloBoardContentContainer>
            {lists.map((list, index) => {
                return (
                  <TrelloListWrapper 
                    key={list.id} 
                    onDragEnd={event => handleOnDragEnd(event)}  
                    onDragEnter={event => handleListOnDragEnter(event, index)} 
                    onDragStart={event => handleOnDragStart(event, list, 'list')}
                    onDrop={event => handleOnDrop(event)}
                    >
                    <TrelloList                     
                      key={list.id} 
                      list={list} 
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

