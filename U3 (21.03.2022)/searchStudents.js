'use strict'

//Github repository: https://github.com/JuliaErmansson/U3

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

//en funktion som räknar ihop alla studentens credits
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

//en funktion som visar alla studenternas kurser
function allStudentCourses (student) {
  let theCourses = []

  for (let i = 0; i < student.courses.length; i++) {
    let Id = student.courses[i].courseId
    theCourses.push(allCourses[Id])
  }

  let courseArray = []

  for (let i = 0; i < theCourses.length; i++) {
    let div = document.createElement('div')
    if (
      student.courses[i].passedCredits ==
      allCourses[student.courses[i].courseId].totalCredits
    ) {
      let content = (div.innerHTML = `
      <div id = "done"
      <h4>${allCourses[i].title}</h4> 
      <p> ${student.courses[i].started.semester} ${
        student.courses[i].started.year
      } ( ${student.courses[i].passedCredits} of ${
        allCourses[student.courses[i].courseId].totalCredits
      } credits)
      </div>
      `)
      courseArray.push(content)
    } else {
      let content = (div.innerHTML = `
      <div id = "notdone"
      <h4>${allCourses[i].title}</h4> 
      <p> ${student.courses[i].started.semester} ${
        student.courses[i].started.year
      } ( ${student.courses[i].passedCredits} of ${
        allCourses[student.courses[i].courseId].totalCredits
      } credits)
      </div>
      `)
      courseArray.push(content)
    }
  }
  return courseArray
    .toString()
    .split(',')
    .join('')
}

//en funktion som gör så att man kan söka på efternamnen
function onKeyUp () {
  let studentArray = []
  let input = document.getElementById('searchBar')
  for (let i = 0; i < allStudents.length; i++) {
    document.querySelector('#container').innerHTML = ''
    if ('' == input.value) {
      document.querySelector('#container').innerHTML = ''
    } else if (allStudents[i].lastName.toLowerCase().includes(input.value)) {
      studentArray.push(allStudents[i])
    }
  }
  //gör så att efternamnen hamnar i bokstavsordning när man söker på dem
  studentArray.sort((a, b) => {
    if (a.lastName > b.lastName) {
      return 1
    }
    if (a.lastName > b.lastName) {
      return -1
    }
    return 0
  })

  renderStudents(studentArray)
}

document.getElementById('searchBar').addEventListener('keyup', onKeyUp)

//mörkt tema

let selector = document.querySelector('#theme-select')
let cssLink = document.querySelector('#theme-color')

selector.addEventListener('change', changeTheme)

function changeTheme () {
  cssLink.href = `${selector.value}.css`
  console.log(cssLink.href)
  localStorage.setItem('theme', selector.value)
}

function setTheme () {
  let theme = localStorage.getItem('theme')
  cssLink.href = `${theme}.css`
}

setTheme()
