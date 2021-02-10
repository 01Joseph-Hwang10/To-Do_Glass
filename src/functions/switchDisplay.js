

export const switchDisplay = (e) => {
    let button,div,menu
    if(e.target.parentNode.nodeName==="DIV") {
        button = e.target
    } else {
        button = e.target.parentNode
    }
    div = button.parentNode
    menu = div.childNodes[1]
    if (menu.style.display === "none") {
        menu.style.display = "block";
        // menu.style.transition = "all 0.25s ease-in-out"
    } else {
        menu.style.display = "none";
    }
    document.addEventListener("click",(e)=>{
        if (e.target !== menu && e.target !== button && !menu.contains(e.target)) {
            menu.style.display="none";
        }
    });
}


export const switchHidden = (e) => {
    let button,div,form,insideButton,input
    if(e.target.parentNode.nodeName==="DIV") {
        button = e.target
    } else {
        button = e.target.parentNode
        insideButton = button.childNodes[0]
    }
    div = button.parentNode
    form = div.childNodes[1]
    input = form.childNodes[0]
    if (form.style.display === "none") {
        form.style.display = "flex";
        button.style.display = "none";
        input.focus()
    } else {
        form.style.display = "none";
        button.style.display = "block";
        input.blur()
    }
    document.addEventListener("click",(e)=>{
        if (e.target !== form && e.target !== button && !form.contains(e.target) && e.target !== insideButton) {
            form.style.display="none";
            button.style.display="block";
            input.blur()
        }
    });
}

