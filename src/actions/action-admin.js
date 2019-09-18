import { ADMIN_CURRENT_STATE , API_PATH} from "../constants/requester";

export const adminCurrentState = (adminCurrentState) => {
    return {
        type: ADMIN_CURRENT_STATE,
        payload: adminCurrentState
    }
};
export const apiPath = (apiPath) => {
    return {
        type: API_PATH,
        payload: apiPath
    }
};