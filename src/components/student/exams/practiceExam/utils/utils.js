import namor from "namor";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const d = new Date()
const month =d.getMonth()+1;
const day=d.getDate();    
const year=d.getFullYear();
const date=month+'/'+day+'/'+year

const newPerson = () => {
    const statusChance = Math.random();
    return {
        examName: namor.generate({ words: 1, numbers: 0 }),
        username: namor.generate({ words: 1, numbers: 0 }),
        email: namor.generate({ words: 1, numbers: 0 }),
        role: namor.generate({ words: 1, numbers: 0 }),
        lastModificationDate: date,
        action: namor.generate({ words: 1, numbers: 0 }),
         visits: Math.floor(Math.random() * 100),
      
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