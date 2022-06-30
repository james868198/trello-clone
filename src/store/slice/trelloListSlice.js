import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import trelloBoardSlice from './trelloBoardSlice';

const initialState = {
  lists: [],
  createdCounter: 1,
  draggedCard: null,
};

export const trelloListSlice = createSlice({
    name: 'trelloList',
    initialState,
    reducers: {
        createList: (state, action) => {
          const { boardId, listId, } = action.payload
          if (boardId && listId) {
            const now = Date.now()
            const list = {
              id: listId,
              title: `list-${state.createdCounter}`,
              cards: [],
              boardId: boardId,
              created: now,
              updated: now,
              archived: false
            }
            state.lists.push(list)
            state.createdCounter++
          }
        },
        updateListTitle: (state, action) => {
          const { order, title } = action.payload;
          const list = state.lists[order]
          if (list) {
            list.title = title
            list.updated = Date.now()
          }
        },
        archiveList: (state, action) => {
          const { order } = action.payload;
          const list = state.lists[order]
          if (list) {
            list.updated = Date.now()
            list.archived = true
          }
            
        },
        removeList: (state, action) => {
          const { listId } = action.payload
          console.log("removeList:", listId)
          if (listId) {
            state.lists = state.lists.filter((list, index) => list.id !== listId)
          }
        },
        // insertList: (state, action) => {
        //   const { listId } = action.payload
        //   const list = state.lists[listId]
        //   if (list) {
        //     state.listOrder.push(listId)
        //   }
        // },
        addCard: (state, action) => {
          const { order, card } = action.payload
          const list = state.lists[order]
          if (list) {
            list.cards.push(card)
          }
        },
        updateCardTitle: (state, action) => {
          const { listOrder, cardOrder, cardId, title } = action.payload
          if (listOrder >= state.lists.length)
            return
          const list = state.lists[listOrder]
          console.log("updateCardTitle", list)
          if (cardOrder < list.cards.length && list.cards[cardOrder].id === cardId) {
            list.cards[cardOrder].title = title
          }
        },
        removeCard: (state, action) => {
          const { listId, cardId } = action.payload;
          const list = state.lists[listId]
          if (list && cardId)
            list.cards.filter(card => card.cardId !== cardId)
        },
        dragCard: (state, action) => {
          const { card } = action.payload
          if (state.draggedCard === card)
            return
          state.draggedCard = card
        },
        dropCard: (state) => {
          if (state.draggedCard !== null)
            state.draggedCard = null
        },
        insertCard: (state, action) => {
          const { listOrder, cardOrder } = action.payload

          if (state.draggedCard == null)
            return

          const draggedCard = state.draggedCard
          if (listOrder < state.lists.length && cardOrder < state.lists[listOrder].cards.length)
          {
            // remove card from original position
            const listIndex = state.lists.findIndex(list => list.id === draggedCard.listId)
            state.lists[listIndex].cards = state.lists[listIndex].cards.filter(((card) => card.id !== draggedCard.id))
            
            // insert card to new position
            draggedCard.listId = state.lists[listOrder].id
            if (cardOrder < state.lists[listOrder].cards.length)
              state.lists[listOrder].cards.splice(cardOrder, 0, draggedCard)
            else
              state.lists[listOrder].cards.push(draggedCard)

            // state.draggedItem = null
          }  
        },
    }
})

// export actions
export const { createList, updateList, updateListTitle, archiveList, removeList, addCard, removeCard, updateCardTitle, dragCard, dropCard, insertCard} = trelloListSlice.actions;

export const selectListData = (state) => {
  // console.log("state:",state.trelloList)
  return state.trelloList
}
export const selectDraggedCard = (state) => {
  return state.trelloList.draggedCard
}
// export const selectListOrder = (state) => state.trelloList.listOrder

//export reducer
export default trelloListSlice.reducer;
