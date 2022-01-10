
function validationObject(state, msg) {
    let check = true;
    let message = '';
    for (const [key, value] of Object.entries(state)) {
        if ( value === '' ) {
            message = msg[key];
            check = false;
            break;
        }
    }
    return [check, message];
}

export default validationObject;