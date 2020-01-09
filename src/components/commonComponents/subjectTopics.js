import { subjects } from '../../containers/student/exams/practiceExam/components/subject.json'


export const subjectList = [
  { value: "Civil Procedure", label: "Civil Procedure", id: 1 },
  { value: "Constitutional Law", label: "Constitutional Law", id: 2 },
  { value: "Contracts", label: "Contracts", id: 3 },
  { value: "Criminal Law and Procedure", label: "Criminal Law and Procedure", id: 4 },
  { value: "Evidence", label: "Evidence", id: 5 },
  { value: "Real Property", label: "Real Property", id: 6 },
  { value: "Torts", label: "Torts", id: 7 }
]

export const civilProcedure = subjects[0].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const constitutionalLaw = subjects[1].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const contracts = subjects[2].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const criminalLaw = subjects[3].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const evidence = subjects[4].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const realProperty = subjects[5].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})

export const torts = subjects[6].topics.map((data, index) => {
  return { value: data.name, label: data.name, topicID: data.topicId }
})