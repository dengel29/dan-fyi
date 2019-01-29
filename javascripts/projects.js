// projects.js


 // var project = document.getElementById('project-sticker')
 // project.addEventListener('click', function(e){
 //  console.log(e.target)
 // })


// var expandContent = function(e) {
//   var project = e.target.parentNode.id
//   var projEl = document.getElementById(project)
//   console.log(e)

//   projEl.children[1].classList.toggle('uncollapse')
// }

// const buttons = document.getElementsByClassName('card-head')

// for (let button of buttons) {
//   button.addEventListener('click', expandContent)
// }


//////////

var expandContent = function(e) {
  // console.log(e.target.parentNode.id)
  console.log(e.target)
  if ((e.target.parentNode.id) || (e.target.parentNode.parentNode.parentNode.id)) {

    let project = e.target.parentElement.parentNode.parentNode.id || e.target.parentElement.parentNode.id || e.target.parentNode.id
    let projEl = document.getElementById(project)
    projEl.children[1].classList.toggle('uncollapse')
  }

  // if e.target.parentNode.id ==
}

const projectsContainer = document.querySelector('.projects')
projectsContainer.addEventListener('click', expandContent)




