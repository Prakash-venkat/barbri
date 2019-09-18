const date = new Date();
const month = date.getMonth() + 1;
const day = date.getDate();
const year = date.getFullYear();
export const currentDate = month + "-" + day + "-" + year;
