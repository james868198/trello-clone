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
            const {boardId, targetListId, enterListId, over} = action.payload
            if (boardId == null || targetListId == null || enterListId == null)
                return 

            const board = state.boards[boardId]

            if (board == null)
                return

            const targetIndex = board.lists.findIndex(id => id === targetListId)
            const enterIndex = board.lists.findIndex(id => id === enterListId) + over

            if (targetIndex === enterIndex || enterIndex >= board.lists.length)
                return
            board.lists[targetIndex] = board.lists[enterIndex]
            board.lists[enterIndex] = targetListId           
        },
        insertListToBoard: (state, action) => {
            // TODO
        
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
