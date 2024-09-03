const form = document.querySelector("#todo-form");
const buttonAddTodo = document.querySelector("#button-add-todo");
const list = document.querySelector("#todo-list");
let TODOs = [];

// Read existing to-dos from localStorage
if (localStorage.getItem("data")) {
  TODOs = JSON.parse(localStorage.getItem("data"));
  buildUI();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form[0].value) {
    buttonAddTodo.classList.add("shake");
    return;
  }
  addTodo();
  form.reset();
});

function addTodo() {
  const todo = {
    title: form[0].value,
    complete: false,
    id: crypto.randomUUID(),
  };
  TODOs.push(todo);
  localStorage.setItem("data", JSON.stringify(TODOs));
  buttonAddTodo.classList.add("added");
  buildUI();
}

function buildUI(state = "Active") {
  let HTML = ``;
  let viewTODOs = state === "Completed" ? TODOs.filter(todo => todo.complete) : TODOs.filter(todo => !todo.complete);

  if (viewTODOs.length === 0) {
    HTML = `<li class="empty">Nothing to do!</li>`;
  }

  viewTODOs.forEach((todo) => {
    HTML += `<li id="${todo.id}" class="${todo.complete ? 'complete' : ''}">
      <span class="text">${todo.title}</span>
      <button aria-label="Complete" class="button-complete">
        <svg class="svg-check">
          <polyline pathLength="1" points="16.17 148.63 72.17 225.63 225.17 11.63" />
        </svg>
      </button>
    </li>`;
  });

  list.innerHTML = HTML;
}

document.documentElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-complete")) {
    toggleTodoComplete(event);
  }
});

function toggleTodoComplete(event) {
  const listItem = event.target.closest("li");
  listItem.classList.toggle("complete");

  setTimeout(() => {
    TODOs = TODOs.map(todo => {
      if (todo.id === listItem.id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    localStorage.setItem("data", JSON.stringify(TODOs));
    buildUI();
  }, 1000);
}

buttonAddTodo.addEventListener("animationend", () => {
  buttonAddTodo.classList.remove("shake", "added");
});

const toggles = document.querySelectorAll(".todo-type-toggles > button");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    toggles.forEach((toggle) => toggle.setAttribute("aria-pressed", false));
    toggle.setAttribute("aria-pressed", true);
    buildUI(toggle.textContent);
  });
});

