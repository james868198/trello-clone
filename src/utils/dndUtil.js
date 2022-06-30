const dndUtil = {
    getDropIdY: (length, y, box) => {
        // Get all list-items which are not dragging. Since querySelectorAll does return array, use spread operator ... instead.
        let i = 0
        let offset = Number.NEGATIVE_INFINITY + box.height / 2
        for(i;i<length;i++) {
            offset = y - box.top - box.height / 2
            if (offset>)
        }
        elements.array.forEach(element => {
            reduce
        });((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
            } else {
            return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element

        return i

    }
}

export default dndUtil