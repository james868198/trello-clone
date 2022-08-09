import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import trelloListReducer from "./slice/trelloListSlice"
import trelloCardReducer from "./slice/trelloCardSlice"
import trelloBoardReducer from "./slice/trelloBoardSlice"

export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // middleware: [thunk, logger],
    reducer: {
        trelloList: trelloListReducer,
        trelloCard: trelloCardReducer,
        trelloBoard: trelloBoardReducer,
    },
})
