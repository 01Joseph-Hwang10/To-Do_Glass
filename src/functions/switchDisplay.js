

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


export const switchHidden = (e) => {
    let button,div,form
    if(e.target.parentNode.nodeName==="DIV") {
        button = e.target
        div = e.target.parentNode
        form = div.childNodes[1]
    } else {
        button = e.target.parentNode
        div = e.target.parentNode.parentNode
        form = div.childNodes[1]
    }
    if (form.style.display === "none") {
        form.style.display = "flex";
        button.style.display = "none"
    } else {
        form.style.display = "none";
        button.style.display = "block";
    }
    document.addEventListener("click",(e)=>{
        if (e.target !== form && e.target !== button && !form.contains(e.target)) {
            form.style.display="none";
            button.style.display="block";
        }
    });
}

