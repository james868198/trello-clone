import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import TrelloList from './trelloList';
import styled from 'styled-components';
import { addCard, createList, removeList, AddCard, removeCard, selectListData, addListToListOrder, removeListFromListOrder } from '../../store/slice/trelloListSlice';
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

export const Card = styled.span`
min-width: 275px;
width: 275px;
padding: 10px;

`



export default function TrelloBoard() {


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
      dispatch(createList(data));
      // await dispatch(addListToListOrder(data));
    };
   
    return (
       
        <TrelloBoardContainer>
          <TrelloBoardHeader>
            <h1>trello board: {boardId} </h1>
          </TrelloBoardHeader>
          <TrelloListContainer>
            <ListWrapper>
              {lists.map((list, index) => {
                return (
                  <Card  key={list.id}>
                    <TrelloList key={list.id} list={list} order={index} />
                  </Card>
                )
              })}
              <Card>
                <Button fullWidth variant="contained" onClick={handleAddList}>Create list</Button>
              </Card>
            </ListWrapper>
          </TrelloListContainer>
          
        </TrelloBoardContainer>
    )
}

