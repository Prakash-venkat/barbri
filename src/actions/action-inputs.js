import {CODE , FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, BARBRI_ID, STATUS, USER_NAME, PASSWORD, ROLE} from "../constants/requester";

export const userName = (userName) => {
    return {
        type: USER_NAME,
        payload: userName
    }
};
export const password = (password) => {
    return {
        type: PASSWORD,
        payload: password
    }
};
export const studentCode = (studentCode) => {
    return {
        type: CODE,
        payload: studentCode
    }
};
export const firstName = (firstName) => {
    return {
        type: FIRST_NAME,
        payload: firstName
    }
};
export const lastName = (lastName) => {
    return {
        type: LAST_NAME,
        payload: lastName
    }
};
export const email = (email) => {
    return {
        type: EMAIL,
        payload: email
    }
};
export const phoneNumber = (phoneNumber) => {
    return {
        type: PHONE_NUMBER,
        payload: phoneNumber
    }
};
export const address = (address) => {
    return {
        type: ADDRESS,
        payload: address
    }
};
export const barbriId = (barbriId) => {
    return {
        type: BARBRI_ID,
        payload: barbriId
    }
};
export const status = (status) => {
    return {
        type: STATUS,
        payload: status
    }
};

export const role = (role) => {
    return {
        type: ROLE,
        payload: role
    }
};

