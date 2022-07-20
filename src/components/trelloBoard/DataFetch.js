import store from "../../store"
import { addList, insertCardToList, updateListBoardId, addCardToList, swapCardInBoard } from '../../store/slice/trelloListSlice'
import { getBoardById, insertListToBoard, addListToBoard, swapListInBoard } from '../../store/slice/trelloBoardSlice'
import { getCardById, updateCardListId, addTask, updateTask, removeTask, addChecklist, updateChecklist, removeChecklist } from '../../store/slice/trelloCardSlice'

// list
function createList(boardId) {
    const listId = `list-${Math.round(Math.random() * 10000).toString()}`
    const inputData = {
        boardId: boardId,
        listId: listId,
        now: Date.now()
    }
    store.dispatch(addList(inputData));
    store.dispatch(addListToBoard(inputData));
}

function swapList(targetListId, enterListId, over) {

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

function moveListToBoard(targetListId, boardId) {
   // TODO
}

function moveCardToList(targetCardId, enterListId) {
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

function updateCardOrder(targetCardId, enterCardId, over) {
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

function getListById(listId) { 
    const list = store.getState().trelloList.lists[listId]
    return list? list: null
}

// card

// [TODO] addCard

// checklist

function AddChecklist(name, cardId) {
    if (name == null || name === '' || cardId == null)
        return
    const checklistId = `checklist-${Math.round(Math.random() * 1000).toString()}`

    store.dispatch(addChecklist({
        checklistId: checklistId, 
        cardId: cardId, 
        name: name, 
        now: Date.now()
    }))
}

function UpdateChecklist(name, cardId, index) { 
    if (name == null || name === '' || cardId == null || index == null)
        return
    store.dispatch(updateChecklist({
        cardId: cardId, 
        index: index,
        name: name, 
        now: Date.now()
    }))
}

function RemoveChecklist(cardId, index) { 
    if (cardId == null || index == null)
        return
    store.dispatch(removeChecklist({
        cardId: cardId, 
        index: index,
        now: Date.now()
    }))
}
// task

function AddTask(cardId, checklistIndex, name) {
    store.dispatch(addTask({
        checklistIndex: checklistIndex, 
        cardId: cardId, 
        name: name, 
        now: Date.now()
    }))
}

function UpdateTask(cardId, checklistIndex, taskIndex, props) { 
    const {name, checked} = props

    store.dispatch(updateTask({
        cardId: cardId, 
        checklistIndex: checklistIndex,
        taskIndex: taskIndex,
        name: name, 
        checked: checked,
        now: Date.now()
    }))
}

function RemoveTask(cardId, checklistIndex, taskIndex) { 
    store.dispatch(removeTask({
        cardId: cardId, 
        checklistIndex: checklistIndex,
        taskIndex,taskIndex,
        now: Date.now()
    }))
}

export {
    createList,
    swapList,
    moveListToBoard,
    moveCardToList,
    updateCardOrder,
    getListById,
    // checklist
    AddChecklist,
    UpdateChecklist,
    RemoveChecklist,
    // card
    AddTask,
    UpdateTask,
    RemoveTask
}