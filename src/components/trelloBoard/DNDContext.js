import React, {useRef, createContext, useContext} from 'react';
import { swapList, updateCardOrder, moveCardToList} from "./DataFetch"
// import { throttle, debounce, throttleHelper } from '../../utils/TADUtil';

export const DNDContext = createContext({})  

export function useDNDContext() {
    return useContext(DNDContext)
}




export default function DNDProvider(props) {
    const draggedCard = useRef(null)
    const draggedList = useRef(null)
   
    const handleOnDragStart = (e) => {
        e.stopPropagation();
        if (e.target == null)
            return  
        const type = e.target.id.split("-")[0]
        if (type === 'card' ) {
            if (draggedCard &&  e.target.id === draggedCard.current)
                return
            draggedCard.current = e.target.id
            draggedList.current = null
        } else if (type === 'list') {
            if (draggedCard &&  e.target.id === draggedList.current)
                return
            draggedList.current = e.target.id
            draggedCard.current = null
        }
    }
    
    const handleOnDragEnd = (e) => {
        e.stopPropagation();
        if (draggedCard) 
            draggedCard.current = null
        if (draggedList)
            draggedList.current = null
    }
    
    const handleOnDragEnter = (e) => {
        e.stopPropagation();
        if (e.target == null)
            return  
        let type
        let enterCardId
        let enterListId
        if (e.currentTarget && e.currentTarget.id) {
            type = e.currentTarget.id.split("-")[0]
            enterListId = type === 'list' ? e.currentTarget.id: null
        }
            
        if (e.target && e.target.id) {
            type = e.target.id.split("-")[0]
            enterCardId = type === 'card' ? e.target.id: null
            enterListId = type === 'list' ? e.target.id: null
        }

        // get box height and width
        const box = e.target.getBoundingClientRect()
        // console.log('handleOnDragEnter type:', type, draggedCard, draggedList, e.target)
        if (type === 'card' && draggedCard.current) {
            // console.log ("swap-card")
            const over = (e.clientY >= box.top + box.height / 2) ? 1 : 0
            updateCardOrder(draggedCard.current, enterCardId, over)
        } else if (type === 'list' && draggedCard.current) {
            // console.log ("move-card", enterCardId)
            moveCardToList(draggedCard.current, enterListId)
        } else if (type === 'list' && draggedList.current) {
            // console.log ("move-list")
            const over = (e.clientX >= box.right + box.width / 2) ? 1 : 0
            swapList(draggedList.current, enterListId, over)
        }
    }
    
    // const handleOnDragEnter = (e) => {
    //     e.stopPropagation();
    //     if (e.target == null)
    //         return  

        
    //     let type
    //     let enterCardId
    //     let enterListId

    //     if (e.currentTarget && e.currentTarget.id) {
    //         type = e.currentTarget.id.split("-")[0]
    //         enterListId = type === 'list' ? e.currentTarget.id: null
    //     }
            
    //     if (e.target && e.target.id) {
    //         type = e.target.id.split("-")[0]
    //         enterCardId = type === 'card' ? e.target.id: null
    //         enterListId = type === 'list' ? e.target.id: null
    //     }

    //     // get box height and width
    //     const box = e.target.getBoundingClientRect()
    //     // console.log('handleOnDragEnter type:', type, draggedCard, draggedList, enterCardId, enterListId)
    //     if (type === 'card' && draggedCard.current) {
    //         const over = (e.clientY > box.top + box.height / 2) ? 1 : 0
    //         updateCardOrder(draggedCard.current, enterCardId, over)
    //     } else if (type === 'list' && draggedCard.current) {
    //         moveCardToList(draggedCard.current, enterListId)
    //     } else if (type === 'list' && draggedList.current) {
    //         const over = (e.clientX > box.right + box.width / 2) ? 1 : 0
    //         swapList(draggedList.current, enterListId, over)
    //     }
    // }

    return (
        <DNDContext.Provider value={{
            draggedList,
            draggedCard,
            handleOnDragStart,
            handleOnDragEnd,
            handleOnDragEnter
        }}>
            {props.children}
        </DNDContext.Provider>
    )
}