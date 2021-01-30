

export const switchDisplay = (e) => {
    let button,div,menu
    if(e.target.parentNode.nodeName==="DIV") {
        button = e.target
        div = e.target.parentNode
        menu = div.childNodes[1]
    } else {
        button = e.target.parentNode
        div = e.target.parentNode.parentNode
        menu = div.childNodes[1]
    }
    if (menu.style.display === "none") {
        menu.style.display = "block";
        // menu.style.transition = "all 0.25s ease-in-out"
    } else {
        menu.style.display = "none";
    }
    document.addEventListener("click",(e)=>{
        if (e.target !== menu && e.target !== button) {
            menu.style.display="none";
        }
    });
}
