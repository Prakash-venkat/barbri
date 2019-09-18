import namor from "namor";
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
      arr.push(i);
  }
  return arr;
};
var i=1;
const newPerson = () => {
    const statusChance = Math.random();

  return {
      
    
      questionRightWrong:statusChance > 0.66
      ? "Wrong"
      : statusChance > 0.33 ? "Correct" : "Wrong",
      questionTitle:namor.generate({ words: 4, numbers: 0 }),
      timeTaken:Math.floor(Math.random() * 10),
      review:statusChance > 0.66
      ? "Pending"
      : statusChance > 0.33 ? "Completed" : "Pending"
      
 
      
  };
};
export function makeDataExpand(len = 5553) {
  return range(len).map(d => {
      return {
          ...newPerson(),
          children: range(10).map(newPerson)
      };
  });
}