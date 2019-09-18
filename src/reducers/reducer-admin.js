import { ADMIN_CURRENT_STATE, API_PATH } from "../constants/requester";

const initialState = {
  adminCurrentState: "",
  apiPath: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADMIN_CURRENT_STATE:
      return {
        ...state,
        adminCurrentState: action.payload
      };
    case API_PATH:
      return {
        ...state,
        apiPath: action.payload
      };

    default:
      return state;
  }
}
