const student = {
    name:{
        first: "Cecilia",
        last: "Brannan",
    },
    graduation: 2023,
    major:"Computer Engineering",
    onCampus:false,
    internships:[],
    'bula bula': null,

};

console.log(student);
console.log(student['bula bula']);

const sendableObject = JSON.stringify(student);
console.log(typeof sendableObject, sendableObject);
const parseableObject = JSON.parse(sendableObject);
console.log(typeof parseableObject, sendableObject);
