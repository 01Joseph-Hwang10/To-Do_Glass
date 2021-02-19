
export function spaceNotAllowed(e) {
    function keyPressed(event){
        var key = event.keyCode || event.charCode || event.which ;
        return Number(key);
        }
        var keycode = keyPressed(e);
        if(keycode===32){
            return false;
        }
    }


