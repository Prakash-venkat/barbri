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
  return {
      
      studentName:namor.generate({ manly: true }),
      practiceExamCode: Math.floor(Math.random() * 120),
      examDate:'12-08-2019',
      practiceExamDescription: namor.generate({ words: 1, numbers: 0 }),
      examName: namor.generate({ words: 1, numbers: 0 }),
      numberOfQuestionAttended: Math.floor(Math.random() * 30),
      score: Math.floor(Math.random() * 100),
      
      questionsmarkedtoAnswer: Math.floor(Math.random() * 20),
      
  };
};
export function makeData(len = 5553) {
  return range(len).map(d => {
      return {
          ...newPerson(),
          children: range(10).map(newPerson)
      };
  });
}