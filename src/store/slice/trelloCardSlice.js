import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    cards: {},
}

export const trelloCardSlice = createSlice({
    name: "trelloCard",
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { cardId, listId, now } = action.payload
            if (state.cards.hasOwnProperty(cardId)) return

            const card = {
                id: cardId,
                title: cardId + "-default-name",
                listId: listId,
                description: null,
                checklist: [],
                comments: [],
                created: now,
                updated: now,
                archived: false,
            }
            state.cards[cardId] = card
        },
        updateCardTitle: (state, action) => {
            const { cardId, title } = action.payload
            if (
                !state.cards.hasOwnProperty(cardId) ||
                title == null ||
                title === "" ||
                title === state.cards[cardId].title
            )
                return
            state.cards[cardId].title = title
        },
        updateCardDescription: (state, action) => {
            const { cardId, description } = action.payload
            if (
                !state.cards.hasOwnProperty(cardId) ||
                description == null ||
                description === state.cards[cardId].description
            )
                return
            state.cards[cardId].description = description
        },
        updateCardListId: (state, action) => {
            const { cardId, listId } = action.payload
            if (
                !state.cards.hasOwnProperty(cardId) ||
                listId == null ||
                listId === "" ||
                listId === state.cards[cardId].listId
            )
                return
            state.cards[cardId].listId = listId
        },
        removeCardById: (state, action) => {
            const { cardId, soft } = action.payload
            if (!state.cards.hasOwnProperty(cardId)) return
            if (soft) state.cards[cardId].archived = true
            else delete state.cards[cardId]
        },
        removeCardByListId: (state, action) => {
            const { listId, soft } = action.payload
            if (listId == null) return

            for (const [id, card] of Object.entries(state.cards)) {
                if (listId !== card.listId) continue
                if (soft) state.cards[id].archived = true
                else delete state.cards[id]
            }
        },
        addChecklist: (state, action) => {
            const { cardId, checklistId, name, now } = action.payload
            if (
                !state.cards.hasOwnProperty(cardId) ||
                checklistId == null ||
                now == null ||
                name == null ||
                name === ""
            )
                return
            const checklist = {
                id: checklistId,
                name: name,
                tasks: [],
                created: now,
                updated: now,
                hidden: false,
                cardId: cardId,
            }
            state.cards[cardId].checklist.push(checklist)
            state.cards[cardId].updated = now
        },
        updateChecklist: (state, action) => {
            const { cardId, index, name, now } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || index == null || name == null || name === "") return

            const checklist = state.cards[cardId].checklist
            if (name && name !== "" && checklist.length > index) {
                checklist[index].name = name
                checklist[index].updated = now
                state.cards[cardId].updated = now
            }
        },
        removeChecklist: (state, action) => {
            const { cardId, index, now } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || index == null) return
            state.cards[cardId].checklist.splice(index, 1)
            state.cards[cardId].updated = now
        },
        addTask: (state, action) => {
            const { cardId, checklistIndex, name, now } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || checklistIndex == null || name === "") return
            const card = state.cards[cardId]
            if (checklistIndex >= card.checklist.length) return
            const task = {
                name: name,
                checked: false,
            }
            card.checklist[checklistIndex].tasks.push(task)
            card.checklist[checklistIndex].updated = now
        },
        updateTask: (state, action) => {
            const { cardId, checklistIndex, taskIndex, name, checked, now } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || checklistIndex == null || taskIndex === "") return
            const card = state.cards[cardId]
            if (checklistIndex >= card.checklist.length || taskIndex >= card.checklist[checklistIndex].tasks.length)
                return
            const task = card.checklist[checklistIndex].tasks[taskIndex]
            if (name && task.name !== name) task.name = name
            if (typeof checked === "boolean" && task.checked !== checked) task.checked = checked
            card.checklist[checklistIndex].updated = now
        },
        removeTask: (state, action) => {
            const { cardId, checklistIndex, taskIndex, now } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || checklistIndex == null || taskIndex === "") return
            const card = state.cards[cardId]
            if (checklistIndex >= card.checklist.length || taskIndex >= card.checklist[checklistIndex].tasks.length)
                return
            card.checklist[checklistIndex].tasks.splice(taskIndex, 1)
            card.checklist[checklistIndex].updated = now
        },
    },
})

// export actions
export const {
    addCard,
    updateCardTitle,
    updateCardDescription,
    updateCardListId,
    removeCardById,
    removeCardByListId,
    addChecklist,
    updateChecklist,
    removeChecklist,
    addTask,
    updateTask,
    removeTask,
} = trelloCardSlice.actions

// select board
export const getCardById = (cardId) => (state) =>
    state.trelloCard.cards.hasOwnProperty(cardId) ? state.trelloCard.cards[cardId] : null

//export reducer
export default trelloCardSlice.reducer
