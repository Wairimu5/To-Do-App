import { TODOs } from './storage.js';
import { updateTodo, toggleTodo } from './todos.js';

// Enums
const states = {
  ACTIVE: "Active",
  COMPLETED: "Completed"
};

export function buildUI(state) {
  let HTML = ``;
  let viewTODOs = [];

  if (state === states.COMPLETED) {
    viewTODOs = TODOs.filter((todo) => todo.complete);
  } else {
    viewTODOs = TODOs.filter((todo) => !todo.complete);
  }

  if (viewTODOs.length === 0) {
    HTML = `<li class="empty">Nothing to do!</li>`;
  }

  viewTODOs.forEach((todo) => {
    if (todo !== null) {
      HTML += `<li id="${todo.id}" style="view-transition-name: list-item-${todo.id};" data-complete="${todo.complete}">
      <span class="text">${todo.title}</span>
      <button aria-label="Complete" class="button-complete">
        <svg width="20" height="20" viewBox="0 0 241.44 259.83" class="svg-check">
          <polyline points="16.17 148.63 72.17 225.63 225.17 11.63" pathLength="1" />
        </svg>
      </button>
    </li>`;
    }
  });

  document.querySelector("#todo-list").innerHTML = HTML;
}

document.querySelectorAll(".todo-type-toggles > button").forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    document.querySelectorAll(".todo-type-toggles > button").forEach((toggle) => {
      toggle.setAttribute("aria-pressed", false);
    });
    toggle.setAttribute("aria-pressed", true);

    if (toggle.textContent === states.ACTIVE) {
      buildUI(states.ACTIVE);
    } else {
      buildUI(states.COMPLETED);
    }
  });
});

