"use srtict";

let todos = document.querySelectorAll(".todo");
let allStatus = document.querySelectorAll(".status");
let modal = document.querySelector(".modal");
let addbtn = document.querySelector("#addbtn");
let closebtn = document.querySelector(".closebtn");
let overlay = document.querySelector(".overlay");
let nostatus = document.querySelector("#nostatus");
let draggableTodo = null;

todos.forEach((todos) => {
    todos.addEventListener("dragstart", dragStart);
    todos.addEventListener("dragend", dragEnd);
});

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
    console.log("dragStart");
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
    console.log("dragEnd");
}
allStatus.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
    // console.log("dragOver");
}

function dragLeave() {
    this.style.border = "none";
    // console.log("dragLeave");
}

function dragEnter() {
    this.style.border = "1px dashed #cccc";
    // console.log("dragEnter");
}

function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    // console.log("dragDrop");
}

function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

addbtn.addEventListener("click", openModal);
closebtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

//create todo functionality

let todosubmit = document.querySelector("#todosubmit");

todosubmit.addEventListener("click", createtodo);

function createtodo() {
    const todoDiv = document.createElement("div");
    // console.log(todoDiv);
    const inputDiv = document.querySelector("#todoinput").value;
    console.log(inputDiv);
    const txt = document.createTextNode(inputDiv);
    console.log(txt);
    let trashIcon = document.createElement("i");
    let checkIcon = document.createElement("i");
    // console.log(txt);

    if (inputDiv === "") {
        alert("Please Add Todo");
        return;
    }

    todoDiv.appendChild(txt);
    todoDiv.classList.add("todo");
    todoDiv.setAttribute("draggable", "true");

    //create a span
    let span = document.createElement("span");

    trashIcon.className = "fa fa-trash";
    // trashIcon.style.color = "lightgray";

    span.appendChild(trashIcon);

    span.classList.add("close");
    console.log(span);
    // span.appendChild(spanText);

    todoDiv.appendChild(span);

    todoDiv.addEventListener("dragstart", dragStart);
    todoDiv.addEventListener("dragend", dragEnd);
    // console.log(todoDiv);
    trashIcon.addEventListener("click", function() {
        // alert("working");
        todoDiv.remove();
    });

    nostatus.appendChild(todoDiv);
    console.log(nostatus);

    closeModal();
    todoinput.value = "";
}
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        let task = document.querySelector("#todoinput").value;
        console.log(task);
        if (!task) {
            alert("Please Add Todo");
            return;
        }
        createtodo();
    }
});