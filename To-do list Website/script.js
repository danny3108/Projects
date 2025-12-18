const taskInput = document.getElementById("taskInput");
const task_list = document.getElementById("task-list");
const resetbutton = document.getElementById("reset");
const printbutton = document.getElementById("print");

function add_task() {
    if(taskInput.value === "") {
        alert('No input')
    }
    else {
        let li = document.createElement("li")
        li.innerHTML = taskInput.value;
        task_list.appendChild(li);
    }
    taskInput.value = "";
    saveList()
}

task_list.addEventListener("click", function(e) {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("finished");
        saveList()
    }
},false);

function reset() {
    localStorage.setItem("data", "");
    location.reload();
}

function saveList() {
    localStorage.setItem("data", task_list.innerHTML);
}

function showList() {
    task_list.innerHTML = localStorage.getItem("data");
}

showList()

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        add_task();
    }
});