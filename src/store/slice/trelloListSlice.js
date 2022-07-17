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
                    title: `${listId}`,
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
        addCardToList: (state, action) => {
            const { listId, cardId } = action.payload
            const list = state.lists[listId]
            if (list && cardId)
                list.cards.push(cardId)
        },
        swapCardInBoard:(state, action) => {
            const {order, card} = action.payload
            if (card == null)
                return 

            const list = state.lists[card.listId]

            if (list == null)
                return

            const index = list.cards.findIndex(id => id === card.id)
            if (index === order || order >= list.cards.length)
                return
            list.cards[index] = list.cards[order]
            list.cards[order] = card.id                
        },
        insertCardToList: (state, action) => {
            const { listId, order, cardId, prevListId} = action.payload

            if (cardId == null || order === null)
                return

            const list = state.lists[listId]
            const prevList = state.lists[prevListId]

            if (list == null || prevList == null)
                return
            
            if (prevListId === listId) {
                // swap
                const index = list.cards.findIndex(id => id === cardId)
                if (index === order)
                    return
                list.cards[index] = list.cards[order]
                list.cards[order] = cardId
                return 
            }

            // two cards are in different list. First remove card from original position
            prevList.cards = prevList.cards.filter(id => id !== cardId)
            
            // insert card to new position
            if (order < list.cards.length)
                list.cards.splice(order, 0, cardId)
            else
                list.cards.push(cardId)          
        },
        removeCardFromList: (state, action) => {
          const { listId, cardId } = action.payload;
          const list = state.lists[listId]
          if (list && cardId)
            list.cards = list.cards.filter(id => id !== cardId)
        },
    }
})

// export actions
export const { addList, updateListTitle, updateListBoardId, removeListById, removeListByBoardId, addCardToList, swapCardInBoard, insertCardToList, removeCard, removeCardFromList} = trelloListSlice.actions;

export const getListById = (listId) => (state) => state.trelloList.lists.hasOwnProperty(listId)? state.trelloList.lists[listId] : null

//export reducer
export default trelloListSlice.reducer;
