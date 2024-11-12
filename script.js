const nameInput = document.getElementById("nameInput");
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Get user name
function getUserName() {
  if (nameInput.value != "") {
    let username = nameInput.value;
    localStorage.setItem("username", username);
    console.log(username);

    nameInput.value = "";
    window.location.href = "./todo.html";
  } else {
    alert("Please enter your name to proceed");
  }
}

// Update and set username
function setUserName() {
  const username = localStorage.getItem("username"); // Retrieve from localStorage

  if (username) {
    document.getElementById("greeting").innerText = `Hi there ${username}👋`;
  } else {
    console.log("Username not found");
  }
}

// load todo from local storage
function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      todoList = JSON.parse(savedTodos);
      renderTodoList();
    }
  }

// store items in local storage
function updateLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Add item to list
function addToDo() {
  const todoInput = document.getElementById("todoInput");
  const todoListElement = document.getElementById("todoList");
  const emptyState = todoListElement.querySelector(".empty-state");

  // Trim input to avoid empty whitespace entries
  if (todoInput.value.trim() !== "") {
    let todoItem = {
      id: Date.now(),
      text: todoInput.value.trim(),
      completed: false,
    };

    // Add the new item to the array
    todoList.push(todoItem);
    console.log("Added new item:", todoItem); // Debug log

    // Hide empty state if it exists
    if (emptyState) emptyState.style.display = "none";

    // Display the new todo
    displayTodo(todoItem);

    updateLocalStorage();

    // Clear input and set focus back
    todoInput.value = "";
    todoInput.focus();
  } else {
    alert("Please enter an item");
  }
}

// Display single todo item
function displayTodo(todoItem) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todoItem.id; // Store ID in dataset for easy reference

   // Set background color based on completed status
   li.style.backgroundColor = todoItem.completed ? "#96e9c87e" : "transparent";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todoItem.completed;
  checkbox.name = 'todo-checkbox'
  checkbox.addEventListener("change", function () {
    checkTodo(todoItem.id, this.checked);
  });

  const span = document.createElement("span");
  span.textContent = todoItem.text;

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteTodo(todoItem.id);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  document.getElementById("todoList").appendChild(li);
}

// Render entire todo list
function renderTodoList() {
  const todoListElement = document.getElementById("todoList");
  todoListElement.innerHTML = ""; // Clear current list

  if (todoList.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "No todos yet! Add one above.";
    todoListElement.appendChild(emptyState);
  } else {
    todoList.forEach((item) => displayTodo(item));

    // todoItem.style.backgroundColor = todo.completed ? '#90EE90' : 'transparent';
  }
}

// Delete item
function deleteTodo(id) {
  console.log("Deleting item with id:", id); // Debug log
  todoList = todoList.filter((item) => item.id !== id);
  const itemToRemove = document.querySelector(`li[data-id="${id}"]`);
  if (itemToRemove) {
    itemToRemove.remove();
  }

  updateLocalStorage();

  // Show empty state if no items left
  if (todoList.length === 0) {
    renderTodoList();
  }
}

// Check/uncheck Todo
function checkTodo(id, isChecked) {
  console.log("Checking item with id:", id, "Checked:", isChecked);

  todoList = todoList.map((item) => {
    if (item.id === id) {
      return { ...item, completed: isChecked };
    }
    return item;
  });

  // Update UI to reflect changes
  const todoItem = document.querySelector(`li[data-id="${id}"]`);
  if (todoItem) {
    todoItem.style.backgroundColor = isChecked ? "#96e9c87e" : "transparent";
  }

  updateLocalStorage();

  console.log("Updated todoList:", todoList);
}

window.onload = function () {
  // Set the username greeting
  setUserName();

  // Initialize todo list
  if (document.getElementById("todoList")) {
    renderTodoList();
  }
};

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
  });