const TPL_FINISHED = item => `<div class="card card text-bg-secondary m-1" >
  <div class="card-header"><b>${item.title}</b></div>
  <div class="card-body">
    <p class="card-text">${item.description}</p>
  </div>
  <button class="btn btn-secondary" value="${item.id}" onclick="rollbackTask(this)"><img src="https://www.svgrepo.com/show/514219/revert.svg" width="25" height="25"></button>
</div>`

const TPL_EMPTY = `<div class="m-4"><h4>Nenhuma tarefa concluída...</h4></div>`

const TODO_TASKS = "todo-tasks";
const FINISHED_TASKS = "finished-tasks";

function createTask(closeModal) {
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-description").value;


    if (title == "" || description == "") {
        if (title == "") {
            document.getElementById("task-title").style.border = "2px solid red";
        } else {
            document.getElementById("task-title").style.border = "";
        }

        if (description == "") {
            document.getElementById("task-description").style.border = "2px solid red";
        } else {
            document.getElementById("task-description").style.border = "";
        }

        return;
    } else {
        document.getElementById("task-title").style.border = "";
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").style.border = "";
        document.getElementById("task-description").value = "";
    }

    if (closeModal) {
        document.getElementById("close-modal-button").click();
    }
    

    const newTask = { id: crypto.randomUUID(), title: title, description: description };

    let tasks = getTodoTasks();

    tasks.push(newTask);
    localStorage.setItem(TODO_TASKS, JSON.stringify(tasks));
}

function rollbackTask(btn) {
    let rollbackedTask = getFinishedTasks().filter(task => task.id === btn.value)[0];

    let newFinishedList = getFinishedTasks().filter(task => task.id !== btn.value);
    localStorage.setItem(FINISHED_TASKS, JSON.stringify(newFinishedList));
    
    let todoTasks = getTodoTasks();
    todoTasks.push(rollbackedTask);
    localStorage.setItem(TODO_TASKS, JSON.stringify(todoTasks));

    updateResults();
}

// Pegar tarefas do local storage
function getTodoTasks() {
    return JSON.parse(localStorage.getItem(TODO_TASKS) || "[]");
}

function getFinishedTasks() {
    return JSON.parse(localStorage.getItem(FINISHED_TASKS) || "[]");
}

function updateResults() {
        var finishedTasks = getFinishedTasks()

        if (finishedTasks.length == 0) {
            document.querySelector("#finished-tasks").innerHTML = TPL_EMPTY;
        } else {
            document.querySelector("#finished-tasks")
            .innerHTML = finishedTasks.map(item => TPL_FINISHED(item)).join('');
        }
}


//Chamar pra trazer registros no load da pagina
updateResults();
