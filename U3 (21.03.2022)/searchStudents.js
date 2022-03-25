'use strict'

let allStudents = DATABASE.students
let allCourses = DATABASE.courses

function renderStudent (student) {
  let div = document.createElement('div')
  div.id = 'container'
  div.innerHTML = `<h1>${student.firstName} ${
    student.lastName
  } (total: ${studentCredits(student)} credits)</h1>
    <h2> Courses: </h2>
    <div id = "courses">
    ${allStudentCourses(student)}
    </div>
    `
  return div
}

function renderStudents (students) {
  let studentsElement = document.getElementById('container')

  for (let student of students) {
    let studentElement = renderStudent(student)
    studentsElement.appendChild(studentElement)
  }
}

function studentCredits (student) {
  let credits = []

  for (let course of student.courses) {
    credits.push(course.passedCredits)
  }

  let creditSum = 0
  for (let i = 0; i < credits.length; i++) {
    creditSum += credits[i]
  }
  return creditSum
}

function allStudentCourses (student) {
  let theCourses = []

  for (let i = 0; i < student.courses.length; i++) {
    let Id = student.courses[i].courseId
    theCourses.push(allCourses[Id])
  }

  let courseArray = []

  for (let i = 0; i < theCourses.length; i++) {
    let div = document.createElement("div")
    if(student.courses[i].passedCredits == allCourses[student.courses[i].courseId].totalCredits){
      let content = div.innerHTML = `
      <div id = "done"
      <h4>${allCourses[i].title}</h4> 
      <p> ${student.courses[i].started.semester} ${student.courses[i].started.year} ( ${student.courses[i].passedCredits} of ${allCourses[student.courses[i].courseId].totalCredits} credits)
      </div>
      `
      courseArray.push(content)
    } 
    else {
      let content = div.innerHTML = `
      <div id = "notdone"
      <h4>${allCourses[i].title}</h4> 
      <p> ${student.courses[i].started.semester} ${student.courses[i].started.year} ( ${student.courses[i].passedCredits} of ${allCourses[student.courses[i].courseId].totalCredits} credits)
      </div>
      `
      courseArray.push(content)
    }
    
  }
 return courseArray.toString().split(",").join("");
}


