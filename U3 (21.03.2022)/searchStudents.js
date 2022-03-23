"use strict"

let allStudents = DATABASE.students

function renderStudent (student) {  
    let div = document.createElement('div');
    div.id = "container"
    div.innerHTML = 
    `<header>${student.firstName} ${student.lastName} (total: ${studentCredits(student)} credits)</header>
    <h4> Courses </h4>
    <div id = "courses">

    </div>
    `
    return div
  }

  function renderStudents (students) {
    let studentsElement = document.getElementById("container")
  
    for (let student of students) {
      let studentElement = renderStudent(student)
      studentsElement.appendChild(studentElement)
    }
  }

function studentCredits(){
  let credits = []


  let creditSum = 0;
  for (let i = 0; i < credits.length; i++){
    creditSum += credits[i]
  }
  return creditSum
}

function 

renderStudents(allStudents)

function onKeyUp() {
  console.log(this.value);
}


function searchBar(event){
  event.preventDefault()
  let input = document.getElementById("search");
  input.addEventListener("keyup", onKeyUp);
}
