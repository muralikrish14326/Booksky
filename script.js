let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounters() {
    document.getElementById("total").textContent = tasks.length;

    let completed = tasks.filter(task => task.completed).length;
    document.getElementById("completed").textContent = completed;

    document.getElementById("pending").textContent =
        tasks.length - completed;
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}"
                  onclick="toggleTask(${index})">
                ${task.text}
            </span>

            <div class="actions">
                <button class="edit-btn"
                        onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                        onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCounters();
    saveTasks();
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    let newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        renderTasks();
    }
}

function clearAll() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
}

function searchTask() {
    let search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let items =
        document.querySelectorAll("#taskList li");

    items.forEach(item => {
        let text =
            item.querySelector(".task-text")
            .textContent
            .toLowerCase();

        item.style.display =
            text.includes(search)
            ? "flex"
            : "none";
    });
}

renderTasks();