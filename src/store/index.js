import { configureStore } from '@reduxjs/toolkit'
import trelloListReducer from './slice/trelloListSlice'
import trelloCardReducer from './slice/trelloCardSlice'
import trelloBoardReducer from './slice/trelloBoardSlice'

export default configureStore({
  reducer: {
    trelloList: trelloListReducer,
    trelloCard: trelloCardReducer,
    trelloBoard: trelloBoardReducer
  }
})