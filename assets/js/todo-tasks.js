const TPL_TODO = item => `<div class="card m-1">
  <div class="card-header"><b>${item.title}</b></div>
  <div class="card-body">
    <p class="card-text">${item.description}</p>
  </div>
  <button class="btn btn btn-light" value="${item.id}" onclick="finishTask(this)"><img src="https://www.svgrepo.com/show/474769/checkmark.svg" width="25" height="25"></button>
</div>`

const TPL_EMPTY = `<div class="m-4"><h4>Nenhuma tarefa a fazer...</h4></div>`

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

    updateResults();
}

function finishTask(btn) {
    let removedTask = getTodoTasks().filter(task => task.id === btn.value)[0];

    let newTodoList = getTodoTasks().filter(task => task.id !== btn.value);
    localStorage.setItem(TODO_TASKS, JSON.stringify(newTodoList));

    let finishedTasks = getFinishedTasks();
    finishedTasks.push(removedTask);
    localStorage.setItem(FINISHED_TASKS, JSON.stringify(finishedTasks));

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
    var todoTasks = getTodoTasks();

    if (todoTasks.length == 0) {
        document.querySelector("#todo-tasks").innerHTML = TPL_EMPTY;
    } else {
        document.querySelector("#todo-tasks")
            .innerHTML = getTodoTasks().map(item => TPL_TODO(item)).join('');
    }
}



//Chamar pra trazer registros no load da pagina
updateResults();