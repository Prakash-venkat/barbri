const letter = /^[A-Za-z ]+$/;
const nos = /^[0-9 ]+$/;

const phone = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})( x\d{4})?$/;

const email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//const link = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

const link = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

const code = /^[a-zA-Z0-9\s\-_#,.']+$/;

const address = /^[a-zA-Z0-9\s\,\''\-]*$/;

const float = /^[0-9]*(\.)?[0-9]+$/;

const decimal = /^(-?\d[0-9])((\.(\d[0-9])?)?)$/;

const alphaNumeric = /^[a-zA-Z0-9 ]+$/;

const max10length = /^([a-zA-Z0-9_-]){0,9}$/;

const number = /^[0-9]{5}([- /]?[0-9]{6})?$/

const numberOnly = /^[0-9]*$/;

const hours = /^([a-zA-Z0-9_-]){0,9}$/;

const specialAllow = /[@#(), .0-9A-Za-z]/;

const alphNum250max = /(?=^.{0,250}$)(.+)((\r?\n.+)*)/;
const alphNum100max = /(?=^.{0,100}$)(.+)((\r?\n.+)*)/;
const alphNum50max = /(?=^.{0,50}$)(.+)((\r?\n.+)*)/;
const alphNum20max = /^[a-zA-Z0-9\s.\-_']+$/;
const alphNum30max = /(?=^.{0,30}$)(.+)((\r?\n.+)*)/;

const maxQuestion = /^[1-9]$|^[1-2]\d$|^3[0-6]$/;

const special_char_no = /^[ A-Za-z0-9.#,-]*$/;
const five_no_char_e = /^[0-9]{0,5}?$/

const moreThan2000 = /^([0-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1[0-9]{3}|2000)$/;
const greaterthanZero = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;
const videoLibrary =/^0*([1-9]|[1-8][0-9]|9[0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/;
const zipCode = /^(?!0{5})(\d{5})(?!-?0{4})(|-\d{4})?$/;
const questionMorethan2000 = /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9]|1[0-9]{3}|2000)$/;
const lessThan999 = /^0*([1-9]|[1-8][0-9]|9[0-9]|[1-8][0-9]{2}|9[0-8][0-9]|99[0-9])$/

export const regx = {
   letter,
   nos,
   phone,
   email,
   link,
   password,
   code,
   address,
   float,
   decimal,
   hours,
   number,
   alphaNumeric,
   alphNum250max,
   alphNum100max,
   alphNum50max,
   alphNum20max,
   alphNum30max,
   numberOnly,
   max10length,
   specialAllow,
   maxQuestion,
   special_char_no,
   five_no_char_e,
   moreThan2000,
   greaterthanZero,
   videoLibrary,
   zipCode,
   questionMorethan2000,
   lessThan999
}