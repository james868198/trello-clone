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
      insertListToBoard: (state, action) => {
        const { boardId, order, draggedList} = action.payload

        if (draggedList == null ||
            !state.boards.hasOwnProperty(boardId) || 
            !state.boards.hasOwnProperty(draggedList.boardId))
            return
        
        if (draggedList.boardId === boardId) {
            // swap
            const index = state.boards[boardId].list.findIndex(id => id === draggedList.id)
            if (index === order)
                return
            state.boards[boardId].lists[index] = state.lists[boardId].lists[order]
            state.boards[boardId].lists[order] = draggedList.id
            return 
        }
        
        // two cards are in different list. First remove card from original position
        state.boards[draggedList.boardId].lists = state.boards[draggedList.boardId].lists.filter(id => id !== draggedList.id)
        
        // insert card to new position
        if (order < state.boards[boardId].lists.length)
            state.boards[boardId].lists.splice(order, 0, draggedList)
        else
            state.boards[boardId].cards.push(draggedList)
      
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
export const { createBoard, updateBoardName, starBoard, archiveBoard, removeBoard, addListToBoard, insertListToBoard, removeListFromBoard } = trelloBoardsSlice.actions;

// select board
export const getBoards = (state) => Object.values(state.trelloBoard.boards)
export const getBoardById = (boardId) => (state) => state.trelloBoard.boards.hasOwnProperty(boardId)? state.trelloBoard.boards[boardId] : null

//export reducer
export default trelloBoardsSlice.reducer;
