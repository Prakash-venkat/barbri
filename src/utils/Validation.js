import {errors} from './ErrorMessages'
import { regx } from './Regx'

 export function letterValidation(value) { 
   const validate = value.trim() === '' ? errors.requiredError
   : regx.letter.test(value) === false ? errors.nameError
     : " " 
    return validate;
 }

export function emailValidation(value){

  const validate = value.trim() === '' ? errors.requiredError
   : regx.email.test(value) === false ? errors.nameError
     : " " 
    return validate;
}

export function numberValidation(value){
  const validate = value.trim() === '' ? errors.requiredError
   : regx.phone.test(value) === false ? errors.nameError
     : " " 
    return validate;
}

export function linkValidation(value){
  const validate = value.trim() === '' ? errors.requiredError
  : regx.link.test(value) === false ? errors.nameError
    : " " 
   return validate;
}

export function passwordValidation(value){
  const validate = value.trim() === '' ? errors.requiredError
  : regx.password.test(value) === false ? errors.nameError
    : " " 
   return validate;
}