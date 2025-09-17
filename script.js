
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks initially
renderTasks();

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("⚠️ Please enter a task!");
    return;
  }

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  taskInput.value = "";

  saveAndRender();
});

// Render function
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="action-btns">
        <button onclick="toggleTask(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Toggle complete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

// Edit task
function editTask(index) {
  const updatedText = prompt("✏ Edit your task:", tasks[index].text);
  if (updatedText !== null && updatedText.trim() !== "") {
    tasks[index].text = updatedText.trim();
    saveAndRender();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// Save and re-render
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
