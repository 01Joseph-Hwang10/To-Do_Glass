

export const sortByOrder = (a,b) => {
    if(a.order && b.order) {
        const aOrder = a.order
        const bOrder = b.order
        if (aOrder < bOrder) {
            return -1
        }
        if (aOrder > bOrder) {
            return 1
        }
    }
    return 0
}