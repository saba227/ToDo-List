let input = document.getElementById("input");
let demo = document.getElementById("demo");
let trash = document.getElementById("trash");
let reset = document.getElementById("reset");

let check = "check";
let uncheck = "uncheck";
let linethrow = "linethrow";
let itemBorder = "itm-border"

//reset button
reset.addEventListener("click", () => {
    if(confirm("Do You Want To Clean Storage?") == true) {
        localStorage.clear();
        location.reload();
    }
})

let list = [];
let id = 0;

let data = localStorage.getItem("ToDo");

if(data) {
    list = JSON.parse(data);
    id = list.length;
    loadList(list);
} else {
    list = [];
    id = 0;
}

function loadList(array){
    array.forEach(element => {
        addTodo(element.name, element.id, element.done, element.trash);
    });
}

function addTodo(todo, id, done, trash) {
    if(trash){return;}

    const DONE = done ? check : "";
    const LINE = done ? linethrow : "";
    const itm = done ? itemBorder : "";

    let text = `
    <div class="item ${itm}">
        <i job="complate" id="${id}" class="bi bi-check-square ${DONE}"></i>
        <input type="text" class="input ${LINE}" value="${todo}" id="${id}" disabled></input>
        <i job="delete" class="bi bi-trash" id="${id}"></i>
    </div>`;

    demo.insertAdjacentHTML("beforeend", text);
}

window.addEventListener("keydown", (event) => {
    if(event.keyCode == 13) {
        let todo = input.value;
        if(todo) {
            addTodo(todo, id, false, false);
            list.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            })
            localStorage.setItem("ToDo", JSON.stringify(list))
            id++;
        }
        input.value = "";
    }
})

demo.addEventListener("click", (event) => {
    let element = event.target;
    let elementJob;
    try{ 
        elementJob = element.attributes.job.value;
    } catch(error) {
        error = "";
    }
    if(elementJob == "complate") {
        completeTodo(element)
    } else if(elementJob == "delete") {
        removeTodo(element)
    }
    localStorage.setItem("ToDo", JSON.stringify(list));
})

// if complete to do
function completeTodo(element) {
    element.classList.toggle(check);
    element.parentNode.querySelector(".input").classList.toggle(linethrow);
    element.parentNode.classList.toggle(itemBorder);
    list[element.id].done = list[element.id].done ? false : true;
}

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    list[element.id].trash = true;

}