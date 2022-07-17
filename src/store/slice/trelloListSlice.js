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
            const {listId, targetCardId, enterCardId, over} = action.payload
            if (listId == null || targetCardId == null || enterCardId == null)
                return 

            const list = state.lists[listId]

            if (list == null)
                return

            const targetIndex = list.cards.findIndex(id => id === targetCardId)
            const enterIndex = list.cards.findIndex(id => id === enterCardId) + over

            if (targetIndex === enterIndex || enterIndex >= list.cards.length)
                return
            list.cards[targetIndex] = list.cards[enterIndex]
            list.cards[enterIndex] = targetCardId               
        },
        insertCardToList: (state, action) => {
            const { targetCardId, targetListId, enterCardId, enterListId, over} = action.payload

            if (targetCardId == null || targetListId == null || enterListId == null || targetListId === enterListId)
                return

            const targetList = state.lists[targetListId]
            const enterList = state.lists[enterListId]

            if (targetList == null || enterList == null)
                return

            
            targetList.cards = targetList.cards.filter(id => id !== targetCardId)
            
            // add target card to the bottom of the list when enterCardId is empty
            if (enterCardId == null) {
                enterList.cards.push(targetCardId)
                return
            }

            const enterIndex = enterList.cards.findIndex(id => id === enterCardId) + over
            
            if (enterIndex < enterList.cards.length)
                enterList.cards.splice(enterIndex, 0, targetCardId)
            else
                enterList.cards.push(targetCardId)          
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
