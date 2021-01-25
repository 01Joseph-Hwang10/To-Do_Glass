

export const switchDisplay = (e) => {
    const button = e.target
    const div = e.target.parentNode
    const menu = div.childNodes[1]
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
    document.addEventListener("click",(e)=>{
        if (e.target !== menu && e.target !== button) {
            menu.style.display="none";
        }
    });
}