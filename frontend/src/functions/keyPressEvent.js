

export const simulatePressingKey = (keycode ,element=document) => {
    var keyboardEvent = element.createEvent('KeyboardEvent');
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

    keyboardEvent[initMethod](
    'keydown', // event type: keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // view: should be window
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    Number(keycode), // keyCode: unsigned long - the virtual key code, else 0
    0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    element.dispatchEvent(keyboardEvent);
}

// 37, 38, 39, 40 -> left, up, right, down