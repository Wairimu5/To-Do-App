const UI = {
  renderTodos(todos) {
    const list = document.querySelector('#todo-list');
    list.innerHTML = '';
    todos.forEach(todo => {
      list.innerHTML += `
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
  },
  clearInput() {
    document.querySelector('#todo-form input').value = '';
  },
  showToast(message) {
    // Implement a toast notification for feedback
    console.log(message); // Placeholder for actual implementation
  }
};

