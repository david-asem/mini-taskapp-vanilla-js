//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//function to load all event listeners
loadEventListeners();


//all eventlisteners() definition
function loadEventListeners(){

  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  
}


//Get Tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

  });
}

//Add Task function
function addTask(e){
  if(taskInput.value ==="") {
    alert('Please add Task');
  }
  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  //store in localStorage
  storeTasksInLocalStorage();

  //clear the input
  taskInput.value = '';
  e.preventDefault();
}

//removeTask()function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    
    if (confirm("Are you sure you wanna delete?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
   }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}