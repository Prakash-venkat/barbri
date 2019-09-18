import { firstName, lastName, phoneNumber , email, role, status, userName, password} from "../actions/action-inputs";
import {inValidError} from '../actions/action-service'
import { letterValidation, emailValidation, numberValidation ,passwordValidation } from "./Validation"


export function onChangeHandler(field, event) {
  event.preventDefault();
  return (dispatch, getState) => {
    switch (field) {
      case "firstName":
            dispatch(firstName(event.target.value))
            const validFirstName = letterValidation(event.target.value)
            dispatch(inValidError(validFirstName))
        break;
      case "lastName":
            dispatch(lastName(event.target.value))
            const validLastName = letterValidation(event.target.value)
            dispatch(inValidError(validLastName))
        break;

      case "phoneNumber":
            dispatch(phoneNumber(event.target.value))
            const validphoneNumber = numberValidation(event.target.value)
            dispatch(inValidError(validphoneNumber))
        break;
      case "email":
            dispatch(email(event.target.value))
            const validEmail = emailValidation(event.target.value)
            dispatch(inValidError(validEmail))
        break;
      case "role":
            dispatch(role(event.target.value))
           
        break;
      case "status":
            dispatch(status(event.target.value))
        break;
      case "userName":
            dispatch(userName(event.target.value))

        break;
      case "password":
        dispatch(password(event.target.value))
            const validpassword = passwordValidation(event.target.value)
            dispatch(inValidError(validpassword))
        break;
      default:
        return null;
    }
  };
}

