import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: {}
};

export const trelloCardSlice = createSlice({
    name: 'trelloCard',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { cardId, listId, now } = action.payload
            if (state.cards.hasOwnProperty(cardId))
                return
            
            const card = {
                id: cardId,
                title: cardId + '-default-name',
                listId: listId,
                description: null,
                checklist: [],
                comment: [],
                created: now,
                updated: now,
                archived: false
            }
            state.cards[cardId] = card
        },
        updateCardTitle: (state, action) => {
            const { cardId, title } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || title == null || title === "" || title === state.cards[cardId].title)
                return
            state.cards[cardId].title = title
        },
        updateCardDescription: (state, action) => {
            const { cardId, description } = action.payload
            if (!state.cards.hasOwnProperty(cardId) || description == null || description === "" || description === state.cards[cardId].description)
                return
            state.cards[cardId].description = description
        },
        updateCardListId: (state, action) => {
            const { cardId, listId } = action.payload;
            if (!state.cards.hasOwnProperty(cardId) || listId == null || listId === "" || listId === state.cards[cardId].listId)
                return
            state.cards[cardId].listId = listId
        },
        removeCardById: (state, action) => {
            const { cardId, soft } = action.payload;
            if (!state.cards.hasOwnProperty(cardId))
                return
            if (soft)
                state.cards[cardId].archived = true
            else
                delete state.cards[cardId]
        },
        removeCardByListId: (state, action) => {
            const { listId, soft } = action.payload;
            if (listId == null)
                return

            for (const [id, card] of Object.entries(state.cards)) {
                if (listId !== card.listId) 
                    continue
                if (soft)
                    state.cards[id].archived = true
                else
                    delete state.cards[id]
            } 
        },
        addChecklist: (state, action) => {
            const { cardId, checklistId, name, now } = action.payload
            if (state.cards.hasOwnProperty(cardId) || checklistId == null || now == null || name == null || name === "")
                return
            const checklist = {
                id: checklistId,
                name: name,
                items: [],
                created: now,
                updated: now,
                hidden: false
            }
            state.cards[cardId].checklist.push(checklist)
        },
        updateChecklist: (state, action) => {
            const { cardId, checklistId, index, name, now } = action.payload
            if (state.cards.hasOwnProperty(cardId) || checklistId == null || index == null || name == null|| name=== "")
                return
           
            const checklist = state.cards[cardId].checklist
            if (name && name !== "" && checklist.length>index && checklist[index].id === checklistId) {
                checklist[index].name = name
                checklist[index].now = now
            }
        },
        removeChecklist: (state, action) => {
            const { cardId, checklistId} = action.payload
            if (state.cards.hasOwnProperty(cardId) || checklistId == null)
                return
            state.cards[cardId].checklist = state.cards[cardId].checklist.filter(list => list.id !== checklistId)
        }
    }
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
} = trelloCardSlice.actions;

// select board
export const getCardById = (cardId) => (state) => state.trelloCard.cards.hasOwnProperty(cardId)? state.trelloCard.cards[cardId] : null

//export reducer
export default trelloCardSlice.reducer;
