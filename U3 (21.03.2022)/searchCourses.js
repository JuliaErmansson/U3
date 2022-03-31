"use strict"

//Github repository: https://github.com/JuliaErmansson/U3

let allTheCourses = DATABASE.courses;
let allTheStudents = DATABASE.students;
let allTheTeachers = DATABASE.teachers;


function renderCourse (course){
    let id = course.courseId;
    let div = document.createElement('div')
    div.id = "container"
    div.innerHTML = 
    `<h1>${course.title} (${course.totalCredits} credits)</h1>
    <h2> Course Responsible:  </h2>
    <div id = "res">
    <div> <p>${courseRes(id)}</p> </div>
    </div>
    <h2> Teachers: </h2> 
     <div id = "teachers">
    <div>  ${courseTeacher(course)} </div>
    </div>
    <h3> Students: </h3>
    <div id = "students">
    ${allStudents(course)}
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

//En funktion som visar kursens kursansvarig
  function courseRes(id){
    let theCourse = DATABASE.courses[id];
    let resName = allTheTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let res = theCourse.courseResponsible;
    return resName[res]

  }
  
//En funktion som visar kursens lärare
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
  
//En funktion som visar vilka elever som går kursen
  function allStudents(thisCourse){
    let allCourseStudents = allTheStudents.filter((student) => student.courses.some((course) => course.courseId == thisCourse.courseId))
    let theStudents = []
      let div = document.createElement('div')
    for ( let student of allCourseStudents) {
      let idGetCourse = student.courses.filter((course) => course.courseId == thisCourse.courseId);
      for(let a = 0; a < idGetCourse.length; a++){ 
        if (
          idGetCourse[a].passedCredits ==
          allTheCourses[idGetCourse[a].courseId].totalCredits
        ) {
          let content = (div.innerHTML = `
          <div id = "done"
          <h2>${student.firstName} ${student.lastName} (${idGetCourse[a].passedCredits} credits) </h2> 
          <p> ${idGetCourse[a].started.semester} ${idGetCourse[a].started.year} </p>
          </div>
          `)
          theStudents.push(content)
        } 
        else {
          let content = (div.innerHTML = `
          <div id = "notdone"
          <h2>${student.firstName} ${student.lastName} (${idGetCourse[a].passedCredits} credits) </h2> 
          <p> ${idGetCourse[a].started.semester} ${idGetCourse[a].started.year} </p>
          </div>
          `)
            theStudents.push(content)
        }
      }}
      return theStudents
        .toString()
        .split(',')
        .join('')
    }
    
    //en funktion som gör så att man kan söka på kurstiteln
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
       //gör så att kurstitlarna hamnar i bokstavsordning när man söker på dem
     courseArray.sort((a, b) =>{
          if (a.title > b.title){
            return 1
          }
          if (a.title > b.title){
            return -1
          }
          return 0
        })


      renderCourses(courseArray)
    }
    
    
    document.getElementById("searchBar").addEventListener("keyup", onKeyUp)
    
    renderCourses(allTheCourses)

// mörkt tema

let selector = document.querySelector("#theme-select");
let cssLink = document.querySelector("#theme-color")

selector.addEventListener("change", changeTheme);

function changeTheme(){
    cssLink.href = `${selector.value}.css`
    console.log(cssLink.href)
    localStorage.setItem("theme", selector.value);
}

function setTheme(){
    let theme = localStorage.getItem("theme");
    cssLink.href = `${theme}.css`;
}

setTheme()
