import Project from './todoClass.js'

// Initialized Some variables to be used in the code ----->
const projDiv = document.getElementById('projDiv')
const addProjBtn = document.getElementById('addProjBtn')
const projects = []
const LStore = localStorage

// Load values from the local storage on the page  --------->
let checkOnLoad = false
while (!checkOnLoad) {
  const projs = JSON.parse(LStore.getItem('projs'))
  if (projs) {
    projs.forEach((element, index) => {
      const projTitle = element._projName
      const projDesc = element._description
      projects.push(new Project(projTitle, projDesc))
      const arrayLength = projects.length
      if (arrayLength <= index + 1) {
        const listItem = document.createElement('LI')
        listItem.innerHTML = element._projName
        projDiv.appendChild(listItem)
      }
    })
  }
  const toDoStore = JSON.parse(LStore.getItem('toDoStore'))
  if (toDoStore) {
    projects.forEach((project) => {
      toDoStore.forEach((todo) => {
        if (project._projName == todo._relation) {
          const title = todo._title
          const description = todo._description
          const dueDate = todo._dueDate
          const priority = todo._priority
          const relation = todo._relation
          project.createTodos(title, description, dueDate, priority, relation)
        }
      })
    })
  }

  checkOnLoad = true
}

console.log(projects)

// Add New Project Button Working Code
addProjBtn.addEventListener('click', () => {
  const projTitle = prompt('Enter New Project Title')
  const projDesc = prompt('Enter Project Description')
  projects.push(new Project(projTitle, projDesc))
  LStore.setItem('projs', JSON.stringify(projects))
  const projs = JSON.parse(LStore.getItem('projs'))
  projs.forEach((element, index) => {
    const arrayLength = projects.length

    if (arrayLength <= index + 1) {
      const listItem = document.createElement('LI')
      listItem.innerHTML = element._projName
      projDiv.appendChild(listItem)
    }
  })
})

// Click the project List item working code ----------->
const workDiv = document.getElementById('workingDiv')
const currProjTitle = document.getElementById('currProj')
const addTodoBtn = document.getElementById('addTodoBtn')

projDiv.addEventListener('click', (event) => {
  if (event.target.tagName == 'LI') {
    const array1 = workDiv.querySelectorAll('LI')
    for (let index = 0; index < array1.length; index++) {
      workDiv.removeChild(array1[index])
    }
    const titleText = 'Project: ' + event.target.innerText
    currProjTitle.innerText = titleText
    addTodoBtn.style.visibility = 'visible'
    projects.forEach((element) => {
      if (
        workDiv.firstElementChild.innerText ==
        'Project: ' + element._projName
      ) {
        element._toDoList.forEach((toDoListElem) => {
          const toDoItem = document.createElement('LI')
          toDoItem.innerText = toDoListElem._title
          workDiv.appendChild(toDoItem)
        })
      }
    })
  }
})

let toDoStore = []

// Add To Do Button Working code ------------------->
workDiv.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    const title = prompt('Enter title of Todo')
    const desc = prompt('Enter description of Todo')
    const dueDate = prompt('Enter due date of Todo')
    const priority = prompt('Enter Priority of Todo')

    projects.forEach((element) => {
      if (
        workDiv.firstElementChild.innerText ==
        'Project: ' + element._projName
      ) {
        element.createTodos(title, desc, dueDate, priority) // ---------

        element._toDoList.forEach((toDoListElem, index) => {
          const arrayLength = element._toDoList.length
          if (arrayLength <= index + 1) {
            const toDoItem = document.createElement('LI')
            toDoItem.innerText = toDoListElem._title
            workDiv.appendChild(toDoItem)
          }
        })
      }
    })
  }
  // This is the Working Code ============--------->
  projects.forEach((elem) => {
    elem._toDoList.forEach((todo) => {
      toDoStore.push(todo)
    })
  }) /* Add all the todo objects in the projects object array named _toDoList to an array named "toDoStore" */
  const temArrayOfToDos = [] /* Make  a temporary  array to keep all the TODOS even the Duplicate ones */
  const temToDoObjsOfObj = {} /* Make a temporary object where you will keep all the todo objects after removing the duplicates (In the objects similar keys will automatically be removed with its values) */

  for (const i in toDoStore) { /* start a for loop in the array toDoStore and get all the index values one by on to the variable i */
    const objTitle = toDoStore[i]._title /* A variable is initialized name objTitle where the values of the _title key is extracted from the objects in the array toDoStore and put in the variable which is initialized */

    temToDoObjsOfObj[objTitle] = toDoStore[i] /* now the initialized empty object is taken and values of the _title extracted above are put as keys and corresponding objects in the toDoStore are put as values of those keys in this object, and as it is known that the objects will delete the keys and their values if there are duplicates leaving only one that comes first  */
  }

  for (const i in temToDoObjsOfObj) { /* now a for loop is started again where the temporary object of sorted keys and values is iterated */
    temArrayOfToDos.push(temToDoObjsOfObj[i]) /* only the values(todo objects) are extracted using the key(i) and pushed to the temporary array amking a new array of objects with all the sorted values (todo objects) */
  }

  toDoStore = temArrayOfToDos // Now the temporary array of final sorted todo objects is cloned into the original array

  LStore.setItem('toDoStore', JSON.stringify(toDoStore)) // the todo objects are sent to the localstore
})

// Working of Selected todo ---->
const selToDoDiv = document.getElementById('descriptionDiv')
workDiv.addEventListener('click', (event) => {
  if (event.target.tagName == 'LI') {
    const array1 = selToDoDiv.querySelectorAll('LI')
    for (let index = 0; index < array1.length; index++) {
      selToDoDiv.removeChild(array1[index])
    }

    const projTitle = currProjTitle.innerText.replace('Project: ', '').trim()
    projects.forEach((project) => {
      if (project._projName == projTitle) {
        project._toDoList.forEach((toDoObj) => {
          if (toDoObj._title == event.target.innerText) {
            const toDoDescLi = document.createElement('LI')
            const toDoDueDateLi = document.createElement('LI')
            const toDoPriorityLi = document.createElement('LI')
            toDoDescLi.innerText = 'Description:- ' + toDoObj._description
            toDoDueDateLi.innerText = 'Due Date:- ' + toDoObj._dueDate
            toDoPriorityLi.innerText = 'Priority:- ' + toDoObj._priority

            selToDoDiv.appendChild(toDoDescLi)
            selToDoDiv.appendChild(toDoDueDateLi)
            selToDoDiv.appendChild(toDoPriorityLi)
          }
        })
      }
    })
  }
})

// To Do :- Store Data locally. (Find how to remove and replace data)
