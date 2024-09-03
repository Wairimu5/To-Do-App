import { buildUI } from './ui.js';
import { loadTodos } from './storage.js';
import { addTodo } from './todos.js';

// Get Data on page load
let TODOs = loadTodos();

// Event listeners
document.querySelector("#todo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target[0].value) {
    document.querySelector("#button-add-todo").classList.add("shake");
    return;
  }
  addTodo(event);
  event.target.reset();
});

document.querySelector("#button-add-todo").addEventListener("animationend", () => {
  document.querySelector("#button-add-todo").classList.remove("shake", "added");
});

document.documentElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-complete")) {
    toggleTodo(event);
  }
});

document.querySelector("#todo-list").addEventListener("dblclick", (event) => {
  const listItem = event.target.closest("li");
  if (listItem.classList.contains("editing")) return;
  listItem.classList.add("editing");
  const textItem = listItem.querySelector(".text");
  listItem.insertAdjacentHTML(
    "beforeend",
    `<form onsubmit="updateTodo(event);" class="form-edit"><input onblur="updateTodo(event);" type="text" class="input-edit" value="${textItem.textContent}"></form>`
  );
  const input = listItem.querySelector(".input-edit");
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
});

