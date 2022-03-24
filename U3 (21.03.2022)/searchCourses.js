"use strict"

let allTheCourses = DATABASE.courses;

function renderCourse (course){
    let div = document.createElement('div')
    div.id = "container"
    div.innerHTML = 
    `<h1>${course.title} (${course.totalCredits} credits)</h1>
    <h4> Course Responsible:     Teachers: </h4>
    <div id = "teachers">

    </div>
    <h4> Students: </h4>
    <div id = "students">

    </div>
    `
    return div
}

function renderCourses (courses) {
    let coursesElement = document.getElementById("container")
  
    for (let course of courses) {
      let courseElement = renderCourse(course)
      coursesElement.appendChild(courseElement)
    }
  }

  renderCourses(allTheCourses)