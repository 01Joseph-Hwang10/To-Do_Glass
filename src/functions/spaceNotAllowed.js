
export function spaceNotAllowed(e) {
    console.log(e)
    function keyPressed(event){
        var key = event.keyCode || event.charCode || event.which ;
        return key;
        }
        var keycode = keyPressed(e);
        console.log(keycode)
        if(keycode===32){ 
            return false;
        }
    }
    
    