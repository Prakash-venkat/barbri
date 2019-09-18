import {
  CHECK_ADD,
  CHECK_EDIT,
  CONSTRUCTED_DATA,
  REDIRECT,
  GET_LIST,
  INVALID_ERROR
} from "../constants/requester";

const initialState = {
  list: [],
  error: null,
  add: true,
  edit: false,
  constructData: [],
  redirectUrl: "",
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECK_ADD:
      return {
        ...state,
        add: action.payload
      };
    case CHECK_EDIT:
      return {
        ...state,
        edit: action.payload
      };

    case CONSTRUCTED_DATA:
      return {
        ...state,
        constructData: action.payload
      };
    case REDIRECT:
      return {
        ...state,
        redirectUrl: action.payload
      };
    case GET_LIST:
      return {
        ...state,
        list: action.payload
      };
    case INVALID_ERROR:
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
}
