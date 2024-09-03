document.querySelector('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const newTodo = {
    id: crypto.randomUUID(),
    title: input.value,
    complete: false
  };
  const todos = Storage.getTodos();
  todos.push(newTodo);
  Storage.saveTodos(todos);
  UI.renderTodos(todos);
  UI.clearInput();
});

document.querySelector('#todo-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('complete-btn')) {
    const id = e.target.parentElement.id;
    let todos = Storage.getTodos();
    todos = todos.filter(todo => todo.id !== id);
    Storage.saveTodos(todos);
    UI.renderTodos(todos);
  }
});

document.querySelector('.todo-type-toggles').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const state = e.target.textContent;
    document.querySelectorAll('.todo-type-toggles > button').forEach(btn => {
      btn.setAttribute('aria-pressed', false);
    });
    e.target.setAttribute('aria-pressed', true);
    buildUI(state);
  }
});

function buildUI(state) {
  let HTML = ``;
  let viewTODOs = [];

  if (state === 'Completed') {
    viewTODOs = Storage.getTodos().filter(todo => todo.complete);
  } else {
    viewTODOs = Storage.getTodos().filter(todo => !todo.complete);
  }

  if (viewTODOs.length === 0) {
    HTML = `<li class="empty">Nothing to do!</li>`;
  } else {
    viewTODOs.forEach(todo => {
      HTML += `
        <li id="${todo.id}" class="${todo.complete ? 'complete' : ''}">
          <span class="text">${todo.title}</span>
          <button class="complete-btn">
            <svg class="svg-check" width="20" height="20" viewBox="0 0 241.44 259.83">
              <polyline pathLength="1" points="16.17 148.63 72.17 225.63 225.17 11.63"></polyline>
            </svg>
          </button>
        </li>
      `;
    });
  }
  document.querySelector('#todo-list').innerHTML = HTML;
}

document.addEventListener('DOMContentLoaded', () => {
  buildUI('Active');
});

