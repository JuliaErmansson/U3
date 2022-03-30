"use strict"

let allTheCourses = DATABASE.courses;
let allTheStudents = DATABASE.students;
let allTheTeachers = DATABASE.teachers;


function renderCourse (course){
    let id = course.courseId;
    let div = document.createElement('div')
    div.id = "container"
    div.innerHTML = 
    `<h1>${course.title} (${course.totalCredits} credits)</h1>
    <div id = "res">
    <h4> Course Responsible:  </h4>
    <div> ${courseRes(id)} </div>
    </div>
    <div id = "teachers">
    <h4> Teachers: </h4> 
    <div>  ${courseTeacher(course)} </div>
    </div>
    <h4> Students: </h4>
    <div id = "students">
    ${allStudents()}
    </div>
    `
    return div
}
//
function renderCourses (courses) {
    let coursesElement = document.getElementById("container")
  
    for (let course of courses) {
      let courseElement = renderCourse(course)
      coursesElement.appendChild(courseElement)
    }
  }

  function courseRes(id){
    let theCourse = DATABASE.courses[id];
    let resName = allTheTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let res = theCourse.courseResponsible;
    return resName[res]

  }
  

  function courseTeacher(course){
    let teachersArray = []
      let div = document.createElement('div') 
      for (let a = 0; a < course.teachers.length; a++){ 
      for(let i = 0; i < allTheTeachers.length; i++){
      if (allTheTeachers[i].teacherId == course.teachers[a]){
        let content = (div.innerHTML = `
      <div id = "teachers"
      <h4>${allTheTeachers[i].firstName} ${allTheTeachers[i].lastName} (${allTheTeachers[i].post})</h4> 
      </div>
      `)
      teachersArray.push(content)
      }
    }}
    return teachersArray.toString().split(",").join(" ")
  }
  

  function allStudents(){/*
    let theStudents = []

  for (let i = 0; i < allTheCourses.length; i++) {
    let Id = course[i].courseId
    theStudents.push(allTheStudents[Id])
  }
    let studentArray = []

    for (let i = 0; i < theStudents.length; i++) {
        let div = document.createElement('div')
        if (
          student.courses[i].passedCredits ==
          allCourses[student.courses[i].courseId].totalCredits
        ) {
          let content = (div.innerHTML = `
          <div id = "done"
          <h2>${allTheStudents[i].firstName} ${allTheStudents[i].lastName} (${allTheStudents[i].title}) </h2> 
          <p> ${student.courses[i].started.semester} ${student.courses[i].started.year} </p>
          </div>
          `)
          studentArray.push(content)
        } 
        else {
          let content = (div.innerHTML = `
          <div id = "notdone"
          <h2>${allTheStudents[i].firstName} ${allTheStudents[i].lastName} (${allTheStudents[i].title}) </h2> 
          <p> ${student.courses[i].started.semester} ${student.courses[i].started.year} </p>
          </div>
          `)
            studentArray.push(content)
        }
      }
      return studentArray
        .toString()
        .split(',')
        .join('')*/
    }
    
    function onKeyUp () {
      let courseArray = [] 
      let input = document.getElementById("searchBar")
      for (let i = 0; i < allTheCourses.length; i++) {
        document.querySelector("#container").innerHTML = ""
        if ("" == input.value) {
          document.querySelector("#container").innerHTML = ""
        } else if (allTheCourses[i].title.toLowerCase().includes(input.value)) {
          courseArray.push(allTheCourses[i]);
        }
      }
    
      renderCourses(courseArray)
    }
    
    
    document.getElementById("searchBar").addEventListener("keyup", onKeyUp)
    
    renderCourses(allTheCourses)
