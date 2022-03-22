"use strict"

function renderStudent (student) {
    let div = document.createElement('div')
    div.id = "container"
    div.innerHTML = 
    `<header>${student.students[i].firstName} ${student.students[i].lastName} (total:  credits)}</header>
    <h4> Courses </h4>'
    <div id = "courses">

    </div>
    `
    console.log(student)
  }

  function renderStudents (students) {
    let studentsElement = document.getElementById("container")
  
    for (let student of students) {
      let studentElement = renderSong(student)
      studentsElement.appendChild(studentElement)
    }
  }