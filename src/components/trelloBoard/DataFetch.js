import store from "../../store"
import { addList, insertCardToList, updateListBoardId, swapCardInBoard } from '../../store/slice/trelloListSlice'
import { getBoardById, insertListToBoard, addListToBoard, swapListInBoard } from '../../store/slice/trelloBoardSlice'
import { getCardById, updateCardListId } from '../../store/slice/trelloCardSlice'

export function createList(boardId) {
    const listId = `list-${Math.round(Math.random() * 10000).toString()}`
    const inputData = {
        boardId: boardId,
        listId: listId,
        now: Date.now()
    }
    store.dispatch(addList(inputData));
    store.dispatch(addListToBoard(inputData));
}

export function updateListOrder(index, listId) {

    const list = store.getState().trelloList.lists[listId]
    // update store
    let inputData = {
        order: index,
        list: list,
    }
    store.dispatch(swapListInBoard(inputData))
}

export function updateCardOrder(listId, index, cardId) {
    // check if the Y of the dragged list higher than the middle of the box
    const list = store.getState().trelloList.lists[listId]
    const card = store.getState().trelloCard.cards[cardId]
    if (card == null || list == null)
        return
    if (index < list.cards.length && list.cards[index].id === cardId)
        return
    
    const prevListId = card.listId

    // update store

    if (listId === prevListId) {
        store.dispatch(swapCardInBoard( {
            card: card,
            order: index
        }))
        return
    }
    store.dispatch(updateCardListId( {
        cardId: cardId,
        listId: listId
    }))
    
    store.dispatch(insertCardToList({
        listId: listId,
        order: index,
        cardId: cardId,
        prevListId: prevListId
    }))
   
}

export function getListById(listId) { 
    const list = store.getState().trelloList.lists[listId]
    return list? list: null
}
