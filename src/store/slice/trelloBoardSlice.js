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
      createBoard: (state) => {
        const time = Date.now()
        const boardId = `board-${Math.round(Math.random() * 10000).toString()}` // temperay id
        const board = {
          id: boardId,
          name: "default board",
          description: null,
          starred: false,
          lists: [],
          created: time,
          updated: time,
          archived: false
        }
        state.boards[boardId] = board
      },
      updateBoardName: (state, action) => {
        const { boardId, name } = action.payload;
        if (state.boards[boardId])
          state.boards[boardId].name = name
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
      editBoard: (state, action) => {
        const { boardId} = action.payload
        const board = state.boards[boardId]
        if (board )
          state.editingBoard = board
      },
      addListToBoard: (state, action) => {
        const { boardId, listId } = action.payload
        const board = state.boards[boardId]
        if (board && listId)
          board.lists.push(listId)
      },
      removeListFromBoard: (state, action) => {
        const { boardId, listId } = action.payload;
        const board = state.boards[boardId]
        if (board && listId)
          board.lists.filter(listData => listData !== listId)
      }
  }
})

// export actions
export const { createBoard, updateBoardName, starBoard, archiveBoard, removeBoard, addListToBoard, removeListFromBoard, editBoard } = trelloBoardsSlice.actions;

// select board
export const getBoards = (state) => Object.values(state.trelloBoard.boards)
export const getBoardById = (boardId) => (state) => state.trelloBoard.boards.hasOwnProperty(boardId)? state.trelloBoard.boards[boardId] : null

//export reducer
export default trelloBoardsSlice.reducer;
