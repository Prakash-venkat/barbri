import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PHONE_NUMBER,
  ADDRESS,
  BARBRI_ID,
  STATUS,
  USER_NAME,
  PASSWORD
} from "../constants/requester";

export default function(state = "", action) {
  switch (action.type) {
    case FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      };
    case LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      };

    case EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };
    case ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case BARBRI_ID:
      return {
        ...state,
        barbriId: action.payload
      };
    case STATUS:
      return {
        ...state,
        status: action.payload
      };
    case USER_NAME:
      return {
        ...state,
        userName: action.payload
      };
    case PASSWORD:
      return {
        ...state,
        password: action.payload
      };
   
    default:
      return state;
  }
}
