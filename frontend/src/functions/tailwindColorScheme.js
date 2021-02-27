

export const selectColorScheme = (number) => {
    const num = Number(number)
    const modulo = Math.abs(num % 6)
    if(modulo) {
        switch (modulo) {
            case 1:
                return "red"
            case 2:
                return "yellow"
            case 3:
                return "green"
            // case 4:
            //     return "blue"
            case 4:
                return "indigo"
            case 5:
                return "purple"
            case 0:
                return "pink"
            default:
                const colorList = [
                "red","yellow","green","indigo","purple","pink",
                ]
                return colorList[Math.floor(Math.random()*colorList.length)]
        }
    } else {
        const colorList = [
            "red","yellow","green","indigo","purple","pink",
            ]
            return colorList[Math.floor(Math.random()*colorList.length)]
    }
}


export const selectColor = (colorScheme,number) => {

    const red = [
        "#FEF2F2",
        "#FEE2E2",
        "#FECACA",
        "#FCA5A5",
        "#F87171",
        "#EF4444",
        "#DC2626",
        "#B91C1C",
        "#991B1B",
        "#7F1D1D",
    ]
    const yellow = [
        "#FFFBEB",
        "#FEF3C7",
        "#FDE68A",
        "#FCD34D",
        "#FBBF24",
        "#F59E0B",
        "#D97706",
        "#B45309",
        "#92400E",
        "#78350F",
    ]
    const green = [ 
        "#ECFDF5",
        "#D1FAE5",
        "#A7F3D0",
        "#6EE7B7",
        "#34D399",
        "#10B981",
        "#059669",
        "#047857",
        "#065F46",
        "#064E3B",
    ]
    // const blue = [
    //     "#EFF6FF",
    //     "#DBEAFE",
    //     "#BFDBFE",
    //     "#93C5FD",
    //     "#60A5FA",
    //     "#3B82F6",
    //     "#2563EB",
    //     "#1D4ED8",
    //     "#1E40AF",
    //     "#1E3A8A",
    // ]
    const indigo = [
        "#EEF2FF",
        "#E0E7FF",
        "#C7D2FE",
        "#A5B4FC",
        "#818CF8",
        "#6366F1",
        "#4F46E5",
        "#4338CA",
        "#3730A3",
        "#312E81",
    ]
    const purple = [
        "#F5F3FF",
        "#EDE9FE",
        "#DDD6FE",
        "#C4B5FD",
        "#A78BFA",
        "#8B5CF6",
        "#7C3AED",
        "#6D28D9",
        "#5B21B6",
        "#4C1D95",
    ]
    const pink = [
        "#FDF2F8",
        "#FCE7F3",
        "#FBCFE8",
        "#F9A8D4",
        "#F472B6",
        "#EC4899",
        "#DB2777",
        "#BE185D",
        "#9D174D",
        "#831843",
    ]

    let index;
    if(number) {
        index=Math.abs(number%5)
    } else {
        index=Math.floor(Math.random()*5)
    }

    switch (colorScheme) {
        case "red":
            return red[index]
        case "yellow":
            return yellow[index]
        case "green":
            return green[index]
        // case "blue":
        //     return yellow[index]
        case "indigo":
            return indigo[index]
        case "purple":
            return purple[index]
        case "pink":
            return pink[index]
        default:
            const allColor = red.slice(0,4)+yellow.slice(0,4)+green.slice(0,4)+indigo.slice(0,4)+purple.slice(0,4)+pink.slice(0,4)
            return allColor[Math.floor(Math.random()*allColor.length)]
    }
}