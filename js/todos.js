import { buildUI } from './ui.js';
import { saveTodos } from './storage.js';

export function addTodo(event) {
  let TODOs = JSON.parse(localStorage["data"] || "[]");
  TODOs.push({
    title: event.target[0].value,
    complete: false,
    id: self.crypto.randomUUID()
  });
  saveTodos(TODOs);
  document.querySelector("#button-add-todo").classList.add("added");
  buildUI();
}

export function updateTodo(event) {
  event.preventDefault();
  const listItem = event.target.closest("li");
  const textItem = listItem.querySelector(".text");
  const inputItem = listItem.querySelector(".input-edit");
  const form = listItem.querySelector(".form-edit");
  textItem.textContent = inputItem.value;
  listItem.classList.remove("editing");
  form.remove();
  let TODOs = JSON.parse(localStorage["data"] || "[]");
  TODOs = TODOs.map((todo) => {
    if (todo.id === listItem.id) {
      todo.title = inputItem.value;
    }
    return todo;
  });
  saveTodos(TODOs);
}

export function toggleTodo(event) {
  let TODOs = JSON.parse(localStorage["data"] || "[]");
  const listItem = event.target.closest("li");
  TODOs = TODOs.map((todo) => {
    if (todo.id === listItem.id) {
      todo.complete = !todo.complete;
    }
    return todo;
  });
  saveTodos(TODOs);
  buildUI();
}

