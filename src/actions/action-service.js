import { CHECK_ADD, CHECK_EDIT, CONSTRUCTED_DATA, REDIRECT, GET_LIST, INVALID_ERROR} from "../constants/requester";


export const checkAdd = (add) => {
    return {
        type: CHECK_ADD,
        payload: add
    }
};
export const checkEdit = (edit) => {
    return {
        type: CHECK_EDIT,
        payload: edit
    }
};
export const constructData = (constructData) => {
    return {
        type: CONSTRUCTED_DATA,
        payload: constructData
    }
};
export const redirectUrl = (redirectUrl) => {
    return {
        type: REDIRECT,
        payload: redirectUrl
    }
};
export const getList = (list) => {
    console.log("You clicked on user: ", list);

    return {
        type: GET_LIST,
        payload: list
    }
};
export const inValidError = (message) => {
    return {
        type: INVALID_ERROR,
        payload: message
    }
};