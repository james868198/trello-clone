import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: {
        'board-00001': {
        id: 'board-00001',
        name: "test1",
        description: "test1",
        starred: false,
        lists: [],
        archived: false
        }, 
    }
};

export const trelloBoardsSlice = createSlice({
    name: 'trelloBoard',
    initialState,
    reducers: {
        createBoard: (state, action) => {
            const { now } = action.payload;
            const boardId = `board-${Math.round(Math.random() * 10000).toString()}` // temperay id
            const board = {
            id: boardId,
                name: "default board",
                description: null,
                starred: false,
                lists: [],
                created: now,
                updated: now,
                archived: false
            }
            state.boards[boardId] = board
        },
        updateBoardName: (state, action) => {
            const { boardId, name } = action.payload;
            if (state.boards[boardId] && state.boards[boardId].name !== name)
                state.boards[boardId].name = name
        },
        updateBoardDescription: (state, action) => {
            const { boardId, description } = action.payload;
            if (state.boards[boardId] && state.boards[boardId].description !== description)
                state.boards[boardId].description = description
        },
        starBoard: (state, action) => {
            const { boardId } = action.payload;
            const star = !state.boards[boardId].starred
            if (state.boards[boardId])
                state.boards[boardId].starred = star
        },
        archiveBoard: (state, action) => {
            const { boardId } = action.payload;
            if (state.boards[boardId])
                state.boards[boardId].archived = true
        },
        removeBoard: (state, action) => {
            const { boardId } = action.payload;
            if (state.boards[boardId])
                delete state.boards[boardId]
        },
        addListToBoard: (state, action) => {
            const { boardId, listId } = action.payload
            const board = state.boards[boardId]
            if (board && listId)
                board.lists.push(listId)
        },
        swapListInBoard:(state, action) => {
            const {order, list} = action.payload
            if (list == null)
                return 

            const board = state.boards[list.boardId]

            if (board == null)
                return

            const index = board.lists.findIndex(id => id === list.id)
            if (index === order || order >= board.lists.length)
                return
            board.lists[index] = board.lists[order]
            board.lists[order] = list.id                
        },
        insertListToBoard: (state, action) => {
            const { boardId, order, list} = action.payload

            if (list == null)
                return 

            const board = state.boards[boardId]
            const prevBoard = state.boards[list.boardId]

            if (board == null || prevBoard == null)
                return
            
            if (list.boardId === boardId) {
                const index = board.lists.findIndex(id => id === list.id)
                if (index === order)
                    return
                console.log("insertListToBoard swap")
                board.lists[index] = board.lists[order]
                board.lists[order] = list.id
                return 
            }
            
            // two cards are in different list. First remove card from original position
            prevBoard.lists = prevBoard.lists.filter(id => id !== list.id)
            
            // insert card to new position
            if (order < state.boards[boardId].lists.length)
                board.lists.splice(order, 0, list.id)
            else
                board.cards.push(list.id)
        
        },
        removeListFromBoard: (state, action) => {
            const { boardId, listId } = action.payload;
            const board = state.boards[boardId]
            if (board && listId)
                board.lists = board.lists.filter(listData => listData !== listId)
        }
    }
})

// export actions
export const { createBoard, updateBoardName, starBoard, archiveBoard, removeBoard, addListToBoard, swapListInBoard, insertListToBoard, removeListFromBoard } = trelloBoardsSlice.actions;

// select board
export const getBoards = (state) => Object.values(state.trelloBoard.boards)
export const getBoardById = (boardId) => (state) => state.trelloBoard.boards.hasOwnProperty(boardId)? state.trelloBoard.boards[boardId] : null

//export reducer
export default trelloBoardsSlice.reducer;
