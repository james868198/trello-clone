const dndUtil = {
    isOverMiddle: (event, direction = 'Y') => {
        if (event == null )
            return false
        
        // get box height and width
        const box = event.target.getBoundingClientRect()
        
        // check if the Y of the dragged card higher than the middle of the box
        if (direction === 'Y' && event.clientY > box.top + box.height / 2) {
            return true
        } else if (direction === 'X' && event.clientX > box.left + box.width / 2) {
            return true
        }
        return false
    }
}

export default dndUtil