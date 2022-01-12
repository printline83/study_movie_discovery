
export default function validationObject(state, msg) {
    let check = true;
    let message = '';
    for (const [key, value] of Object.entries(state)) {
        if (msg[key] !== undefined && value === '') {
            message = msg[key];
            check = false;
            break;
        }
    }
    return [check, message];
}
