const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const productivity = document.getElementById("productivity");

const emptyState = document.getElementById("emptyState");

const filterCategory =
  document.getElementById("filterCategory");

const exportBtn =
  document.getElementById("exportBtn");

const notes =
  document.getElementById("dailyNotes");

let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

if(notes){
  notes.value =
    localStorage.getItem("notes") || "";
}

/* DARK MODE */

const themeToggle =
  document.getElementById("themeToggle");

if(themeToggle){

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode")
    );

  });

}

/* LOAD THEME */

if(localStorage.getItem("theme") === "true"){

  document.body.classList.add("light-mode");

}

/* SAVE NOTES */

if(notes){

  notes.addEventListener("input", () => {

    localStorage.setItem("notes", notes.value);

  });

}

/* ADD TASK */

if(taskForm){

taskForm.addEventListener("submit", function(event){

  event.preventDefault();

  const title =
    document.getElementById("taskTitle")
    .value
    .trim();

  const category =
    document.getElementById("category").value;

  const dueDate =
    document.getElementById("dueDate").value;

  const priority =
    document.getElementById("priority").value;

  /* VALIDATION */

  if(title === ""){

    showToast("Task title cannot be empty","error");

    return;

  }

  /* DUPLICATE VALIDATION */

  const duplicate =
    tasks.find(task =>
      task.title.toLowerCase() ===
      title.toLowerCase()
    );

  if(duplicate){

    showToast("Task already exists","error");

    return;

  }

  const task = {

    id:Date.now(),

    title,

    category,

    dueDate,

    priority,

    completed:false,

    createdAt:new Date().toLocaleString()

  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  updateDashboard();

  updateChart();

  showToast("Task Added Successfully","success");

  taskForm.reset();

});

}

/* SAVE TASKS */

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

/* RENDER TASKS */

function renderTasks(filteredTasks = tasks){

  taskList.innerHTML = "";

  if(filteredTasks.length === 0){

    emptyState.style.display = "block";

  }else{

    emptyState.style.display = "none";

  }

  filteredTasks.forEach(task => {

    const taskCard =
      document.createElement("div");

    taskCard.classList.add("task-card");

    if(task.completed){

      taskCard.classList.add("completed");

    }

    taskCard.innerHTML = `

      <div class="task-info">

        <h3>${task.title}</h3>

        <p>Category: ${task.category}</p>

        <p>Due Date: ${task.dueDate}</p>

        <p>Created: ${task.createdAt}</p>

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

  const confirmDelete =
    confirm("Are you sure you want to delete this task?");

  if(!confirmDelete){

    return;

  }

  tasks = tasks.filter(task => task.id !== id);

  saveTasks();

  renderTasks();

  updateDashboard();

  updateChart();

  showToast("Task Deleted","error");

}

/* COMPLETE TASK */

function toggleComplete(id){

  tasks = tasks.map(task => {

    if(task.id === id){

      task.completed = !task.completed;

    }

    return task;

  });

  saveTasks();

  renderTasks();

  updateDashboard();

  updateChart();

  showToast("Task Status Updated","success");

}

/* EDIT TASK */

function editTask(id){

  const task =
    tasks.find(task => task.id === id);

  const newTitle =
    prompt("Edit Task Title", task.title);

  if(newTitle === null){

    return;

  }

  if(newTitle.trim() === ""){

    showToast("Task title cannot be empty","error");

    return;

  }

  task.title = newTitle;

  saveTasks();

  renderTasks();

  showToast("Task Updated","success");

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

  productivity.innerText =
    percent + "%";

}

/* SEARCH */

if(searchInput){

searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase();

  const filtered =
    tasks.filter(task =>

      task.title.toLowerCase().includes(value)

    );

  renderTasks(filtered);

});

}

/* FILTER */

if(filterCategory){

filterCategory.addEventListener("change", () => {

  const category =
    filterCategory.value;

  if(category === "All"){

    renderTasks();

  }else{

    const filtered =
      tasks.filter(task =>
        task.category === category
      );

    renderTasks(filtered);

  }

});

}

/* EXPORT CSV */

if(exportBtn){

exportBtn.addEventListener("click", () => {

  let csv =
    "Title,Category,DueDate,Priority,Completed,CreatedAt\n";

  tasks.forEach(task => {

    csv += `${task.title},
${task.category},
${task.dueDate},
${task.priority},
${task.completed},
${task.createdAt}\n`;

  });

  const blob =
    new Blob([csv], { type:"text/csv" });

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "tasks.csv";

  a.click();

  showToast("CSV Exported","success");

});

}

/* TOAST */

function showToast(message,type){

  const toast =
    document.createElement("div");

  toast.classList.add("toast");

  if(type === "success"){

    toast.style.background = "#22c55e";

  }else{

    toast.style.background = "#ef4444";

  }

  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  },3000);

}

/* CHART */

const ctx =
  document.getElementById("taskChart");

const taskChart = ctx
  ? new Chart(ctx, {

    type:"doughnut",

    data:{

      labels:["Completed","Pending"],

      datasets:[{

        data:[0,0],

        backgroundColor:[
          "#22c55e",
          "#ef4444"
        ]

      }]

    }

})
  : null;

function updateChart(){

  if(!taskChart){
    return;
  }

  const completed =
    tasks.filter(task => task.completed).length;

  const pending =
    tasks.length - completed;

  taskChart.data.datasets[0].data = [
    completed,
    pending
  ];

  taskChart.update();

}

/* INITIAL LOAD */

renderTasks();

updateDashboard();

updateChart();
/* ==========================
   SIDEBAR NAVIGATION
========================== */

const dashboardBtn = document.getElementById("dashboardBtn");
const tasksBtn = document.getElementById("tasksBtn");
const analyticsBtn = document.getElementById("analyticsBtn");
const notesBtn = document.getElementById("notesBtn");
const settingsBtn = document.getElementById("settingsBtn");

if(dashboardBtn){

dashboardBtn.addEventListener("click", () => {

  document
  .getElementById("dashboardSection")
  .scrollIntoView({
    behavior:"smooth"
  });

});

}

if(tasksBtn){

tasksBtn.addEventListener("click", () => {

  document
  .getElementById("taskSection")
  .scrollIntoView({
    behavior:"smooth"
  });

});

}

if(analyticsBtn){

analyticsBtn.addEventListener("click", () => {

  document
  .getElementById("analyticsSection")
  .scrollIntoView({
    behavior:"smooth"
  });

});

}

if(notesBtn){

notesBtn.addEventListener("click", () => {

  document
  .getElementById("notesSection")
  .scrollIntoView({
    behavior:"smooth"
  });

});

}

if(settingsBtn){

  settingsBtn.addEventListener("click", () => {

    document
    .getElementById("settingsSection")
    .scrollIntoView({
      behavior:"smooth"
    });

  });

}

/* ==========================
   ACTIVE SIDEBAR MENU
========================== */

const menuItems =
document.querySelectorAll(".menu li");

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    menuItems.forEach(i => {
      i.classList.remove("active");
    });

    item.classList.add("active");

  });

});

/* ==========================
   SETTINGS THEME BUTTON
========================== */

const settingsThemeBtn =
document.getElementById(
  "themeToggleSettings"
);

if(settingsThemeBtn){

  settingsThemeBtn.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light-mode"
      );

      localStorage.setItem(
        "theme",
        document.body.classList.contains(
          "light-mode"
        )
      );

    }
  );

}