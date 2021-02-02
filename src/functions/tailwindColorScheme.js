

export const selectColorScheme = (order) => {
    if(order) {
        switch (order) {
            case order % 1:
                return "red"
            case order % 2:
                return "yellow"
            case order % 3:
                return "green"
            case order % 4:
                return "blue"
            case order % 5:
                return "indigo"
            case order % 6:
                return "purple"
            case order % 0:
                return "pink"
            default:
                const colorList = [
                "red","yellow","green","blue","indigo","purple","pink",
                ]
                return colorList[Math.floor(Math.random()*colorList.length)]
        }
    } else {
        const colorList = [
            "red","yellow","green","blue","indigo","purple","pink",
            ]
            return colorList[Math.floor(Math.random()*colorList.length)]
    }
}


export const selectColor = (colorScheme) => {

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
    const blue = [
        "#EFF6FF",
        "#DBEAFE",
        "#BFDBFE",
        "#93C5FD",
        "#60A5FA",
        "#3B82F6",
        "#2563EB",
        "#1D4ED8",
        "#1E40AF",
        "#1E3A8A",
    ]
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
    switch (colorScheme) {
        case "red":
            return red[Math.floor(Math.random()*6)]
        case "yellow":
            return yellow[Math.floor(Math.random()*6)]
        case "green":
            return green[Math.floor(Math.random()*6)]
        case "blue":
            return blue[Math.floor(Math.random()*6)]
        case "indigo":
            return indigo[Math.floor(Math.random()*6)]
        case "purple":
            return purple[Math.floor(Math.random()*6)]
        case "pink":
            return pink[Math.floor(Math.random()*6)]
        default:
            const allColor = red+yellow+green+blue+indigo+purple+pink
            return allColor[Math.floor(Math.random()*allColor.length)]
    }
}