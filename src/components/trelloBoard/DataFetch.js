import store from "../../store"
import { addList, insertCardToList, updateListBoardId, addCardToList, swapCardInBoard } from '../../store/slice/trelloListSlice'
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

export function swapList(targetListId, enterListId, over) {

    const targetList = store.getState().trelloList.lists[targetListId]
    const enterList = store.getState().trelloList.lists[enterListId]
  
    if (targetList == null || enterList == null || targetList.boardId !== enterList.boardId)
        return
    store.dispatch(swapListInBoard({
        boardId: targetList.boardId,
        targetListId: targetListId,
        enterListId: enterListId,
        over: over
    }))
}

export function moveListToBoard(targetListId, boardId) {
   // TODO
}

export function moveCardToList(targetCardId, enterListId) {
    // check if the Y of the dragged list higher than the middle of the box
    const enterList = store.getState().trelloList.lists[enterListId]
    const targetCard = store.getState().trelloCard.cards[targetCardId]

    if (enterList == null || targetCard == null || targetCard.listId === enterListId || enterList.cards.length > 0)
        return
    const targetCardListId = targetCard.listId

    // update store
  
    store.dispatch(updateCardListId( {
        cardId: targetCardId,
        listId: enterListId
    }))
    
    store.dispatch(insertCardToList({
        targetCardId: targetCardId,
        targetListId: targetCardListId,
        enterListId: enterListId,
    }))
   
}

export function updateCardOrder(targetCardId, enterCardId, over) {
    const targetCard = store.getState().trelloCard.cards[targetCardId]
    const enterCard = store.getState().trelloCard.cards[enterCardId]

    if (targetCard == null || enterCard == null || targetCardId === enterCardId)
        return
    
    const targetCardListId = targetCard.listId

    // swap cards if in the same list
    if (enterCard.listId === targetCard.listId) {
        store.dispatch(swapCardInBoard( {
            listId: targetCard.listId,
            targetCardId: targetCardId,
            enterCardId: enterCardId,
            over: over
        }))
        return
    }

    // // insert card to another list
    store.dispatch(updateCardListId( {
        cardId: targetCardId,
        listId: enterCard.listId
    }))
    
    store.dispatch(insertCardToList({
        targetCardId: targetCardId,
        targetListId: targetCardListId,
        enterCardId: enterCardId,
        enterListId: enterCard.listId,
        over: over 
    }))
   
}

export function getListById(listId) { 
    const list = store.getState().trelloList.lists[listId]
    return list? list: null
}
