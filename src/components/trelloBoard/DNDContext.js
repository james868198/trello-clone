import React, {useState, useRef, createContext, useContext} from 'react';
import { updateListOrder, updateCardOrder} from "./DataFetch"

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
        } else if (type === 'list') {
            if (draggedCard &&  e.target.id === draggedList.current)
                return
            draggedList.current = e.target.id
        }
    }
    
    function handleOnDragEnd(e) {
        e.stopPropagation();
        if (draggedCard) 
            draggedCard.current = null
        if (draggedList)
            draggedList.current = null
    }

    // function handleOnDragEnter(e) {
    //     e.stopPropagation();
    //     if (e.target == null)
    //         return  

    //     const type = e.target.id.split("-")[0]
    //     // get box height and width
    //     const box = e.target.getBoundingClientRect()

    //     if (type === 'card' && draggedCard.current) {
    //         const over = e.clientY > box.top + box.height / 2
    //         updateCardOrder(draggedCard.current, e.target.id, over)

    //     } else if (type === 'list' && draggedList.current) {
    //         const over = e.clientX > box.right + box.width / 2
    //         updateListOrder(draggedList.current, e.target.id, over)
    //     }
    // }


  function handleCardOnDragEnter(e, index, listId) {
        e.stopPropagation();

        // eslint-disable-next-line no-cond-assign
        if (index == null || draggedCard.current == null)
            return

        // get box height and width
        const box = e.target.getBoundingClientRect()

        // check if the Y of the dragged card higher than the middle of the box
        if (e.clientY > box.top + box.height / 2) {
            index++
        }    

        // update card position
        updateCardOrder(listId, index, draggedCard.current)
    }

    function handleListOnDragEnter(e, index) {
        e.stopPropagation();
        // console.log('handleListOnDragEnter target:', e.target  
        // const listId = board.lists[index]
        if (index == null || draggedList.current == null || draggedCard.current != null)
            return

        // if (draggedList == null || !draggable || draggedCard != null) {
        //   // update card if card list is empty. [TODO]: move logic to another place
        //   if (draggable && draggedCard && lists[index].cards.length === 0) {
        //     insertCardToStore(index)
        //   }
        //   return
        // }
    
        const box = e.target.getBoundingClientRect()
        
        // check if the Y of the dragged list higher than the middle of the box
        if (e.clientX > box.right + box.width / 2) {
            index++
        } 
       
    
        // temperately disable draggle
        // setDraggable(false)
        // setTimeout(() => {
        //   setDraggable(true)
        // }, 100);
        updateListOrder(index, draggedList.current)
    }

    return (
        <DNDContext.Provider value={{
            draggedList,
            draggedCard,
            handleOnDragStart,
            handleOnDragEnd,
            handleListOnDragEnter,
            handleCardOnDragEnter
        }}>
            {props.children}
        </DNDContext.Provider>
    )
}