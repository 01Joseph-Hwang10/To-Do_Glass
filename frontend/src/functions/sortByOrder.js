

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

export const dictSortId = (dictionary) => {

    let dictArray = []

    for (let key in dictionary) {
        if(dictionary.hasOwnProperty(key)) {
            dictArray.push([key,dictionary[key]])
        }
    }
    
    const sortByOrderForDict = (a,b) => {
        if(a[1].order && b[1].order) {
            const aOrder = a[1].order
            const bOrder = b[1].order
            if (aOrder < bOrder) {
                return -1
            }
            if (aOrder > bOrder) {
                return 1
            }
        }
        return 0
    }
    
    dictArray = dictArray.sort(sortByOrderForDict)

    let result = []

    for (let i=0; i<dictArray.length; i++) {
        const key = dictArray[i][0]
        result.push(key)
    }

    return result
}