"use strict"

function renderCourse (course){
    let div = document.createElement('div')
    div.id = "container"
    div.innerHTML = 
    `<header>${course.courses[i].title} (${course.courses[i].totalCredits} credits)}</header>
    <h4> Course Responsible:     Teachers: </h4>'
    <div id = "teachers">

    </div>
    <h4> Students: </h4>
    <div id = "students">

    </div>
    `
}

function renderCourses (courses) {
    let songsElement = document.getElementById("container")
  
    for (let course of courses) {
      let courseElement = renderCourse(course)
      coursesElement.appendChild(courseElement)
    }
  }