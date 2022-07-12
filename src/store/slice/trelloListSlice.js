import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: {},
};

export const trelloListSlice = createSlice({
    name: 'trelloList',
    initialState,
    reducers: {
        addList: (state, action) => {
            const { boardId, listId, now} = action.payload
            if (boardId && listId && now) {
                const list = {
                    id: listId,
                    title: `${listId}-default-title`,
                    cards: [],
                    boardId: boardId,
                    created: now,
                    updated: now,
                    archived: false
                }
                state.lists[listId] = list
            }
        },
        updateListTitle: (state, action) => {
            const { listId, title } = action.payload;
            if (!state.lists.hasOwnProperty(listId) || title == null || title === "" || title === state.lists[listId].title)
                return
            state.lists[listId].title = title
        },
        updateListBoardId: (state, action) => {
            const { listId, boardId } = action.payload;
            if (!state.lists.hasOwnProperty(listId) || boardId == null || boardId === "" || boardId === state.lists[listId].boardId)
                return
            state.lists[listId].boardId = boardId
        },
        removeListById: (state, action) => {
            const { listId, soft } = action.payload;
            if (!state.lists.hasOwnProperty(listId))
                return
            if (soft)
                state.lists[listId].archived = true
            else
                delete state.lists[listId]
        },
        removeListByBoardId: (state, action) => {
            const { boardId, soft } = action.payload;
            if (boardId == null)
                return

            for (const [id, list] of Object.entries(state.lists)) {
                if (boardId !== list.boardId) 
                    continue
                if (soft)
                    state.lists[id].archived = true
                else
                    delete state.lists[id]
            } 
        },
        insertCardToList: (state, action) => {
            const { listId, order, draggedCard} = action.payload

            if (draggedCard == null ||
                !state.lists.hasOwnProperty(listId) || 
                !state.lists.hasOwnProperty(draggedCard.listId))
                return
            
            if (draggedCard.listId === listId) {
                // swap
                const index = state.lists[listId].cards.findIndex(id => id === draggedCard.id)
                if (index === order)
                    return
                state.lists[listId].cards[index] = state.lists[listId].cards[order]
                state.lists[listId].cards[order] = draggedCard.id
                return 
            }

            // two cards are in different list. First remove card from original position
            state.lists[draggedCard.listId].cards = state.lists[draggedCard.listId].cards.filter(id => id !== draggedCard.id)
            
            // insert card to new position
            if (order < state.lists[listId].cards.length)
                state.lists[listId].cards.splice(order, 0, draggedCard)
            else
                state.lists[listId].cards.push(draggedCard)          
        },
        removeCardFromList: (state, action) => {
          const { listId, cardId } = action.payload;
          const list = state.lists[listId]
          if (list && cardId)
            list.cards.filter(id => id !== cardId)
        },
    }
})

// export actions
export const { addList, updateListTitle, removeListById, removeListByBoardId, insertCardToList, removeCard, removeCardFromList} = trelloListSlice.actions;

export const getListById = (listId) => (state) => state.trelloList.lists.hasOwnProperty(listId)? state.trelloList.lists[listId] : null

//export reducer
export default trelloListSlice.reducer;
