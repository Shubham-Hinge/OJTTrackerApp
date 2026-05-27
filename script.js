const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const productivity = document.getElementById("productivity");

const emptyState = document.getElementById("emptyState");

let tasks = [];

/* DARK MODE */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

/* ADD TASK */

taskForm.addEventListener("submit", function(event){

  event.preventDefault();

  const title =
    document.getElementById("taskTitle").value;

  const category =
    document.getElementById("category").value;

  const dueDate =
    document.getElementById("dueDate").value;

  const priority =
    document.getElementById("priority").value;

  const task = {

    id:Date.now(),

    title,

    category,

    dueDate,

    priority,

    completed:false

  };

  tasks.push(task);

  renderTasks();

  updateDashboard();

  showToast("Task Added Successfully");

  taskForm.reset();

});

/* RENDER TASKS */

function renderTasks(filteredTasks = tasks){

  taskList.innerHTML = "";

  if(filteredTasks.length === 0){

    emptyState.style.display = "block";

  }else{

    emptyState.style.display = "none";

  }

  filteredTasks.forEach(task => {

    const taskCard = document.createElement("div");

    taskCard.classList.add("task-card");

    if(task.completed){

      taskCard.classList.add("completed");

    }

    taskCard.innerHTML = `

      <div class="task-info">

        <h3>${task.title}</h3>

        <p>Category: ${task.category}</p>

        <p>Due: ${task.dueDate}</p>

        <span class="priority ${task.priority.toLowerCase()}">
          ${task.priority}
        </span>

      </div>

      <div class="task-actions">

        <button class="complete-btn"
          onclick="toggleComplete(${task.id})">

          <i class="fa-solid fa-check"></i>

        </button>

        <button class="edit-btn"
          onclick="editTask(${task.id})">

          <i class="fa-solid fa-pen"></i>

        </button>

        <button class="delete-btn"
          onclick="deleteTask(${task.id})">

          <i class="fa-solid fa-trash"></i>

        </button>

      </div>

    `;

    taskList.appendChild(taskCard);

  });

}

/* DELETE TASK */

function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  renderTasks();

  updateDashboard();

  showToast("Task Deleted");

}

/* COMPLETE TASK */

function toggleComplete(id){

  tasks = tasks.map(task => {

    if(task.id === id){

      task.completed = !task.completed;
    }

    return task;

  });

  renderTasks();

  updateDashboard();

  showToast("Task Status Updated");

}

/* EDIT TASK */

function editTask(id){

  const task = tasks.find(task => task.id === id);

  const newTitle =
    prompt("Edit Task Title", task.title);

  if(newTitle){

    task.title = newTitle;

    renderTasks();

    showToast("Task Updated");

  }

}

/* DASHBOARD */

function updateDashboard(){

  totalTasks.innerText = tasks.length;

  const completed =
    tasks.filter(task => task.completed).length;

  completedTasks.innerText = completed;

  pendingTasks.innerText =
    tasks.length - completed;

  const percent =
    tasks.length === 0
    ? 0
    : Math.round((completed / tasks.length) * 100);

  productivity.innerText = percent + "%";

}

/* SEARCH */

searchInput.addEventListener("input", function(){

  const searchValue =
    searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>

    task.title.toLowerCase()
    .includes(searchValue)

  );

  renderTasks(filteredTasks);

});

/* TOAST */

function showToast(message){

  const toast =
    document.createElement("div");

  toast.classList.add("toast");

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  }, 3000);

}