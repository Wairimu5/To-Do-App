export function loadTodos() {
  let TODOs = [];
  if (localStorage["data"] !== null && localStorage["data"] !== undefined) {
    TODOs = JSON.parse(localStorage["data"]);
  }
  return TODOs;
}

export function saveTodos(TODOs) {
  localStorage["data"] = JSON.stringify(TODOs);
}

