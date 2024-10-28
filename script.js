const nameInput =  document.getElementById('nameInput');

// Get user name
function getUserName() {
    if(nameInput.value != '') {
        let username = nameInput.value;
        localStorage.setItem('username',username)
        console.log(username)

        window.location.href = './todo.html';
    } else {
        alert('Please enter your name to proceed')
    }
}

// Update and set username
function setUserName() {
    const username = localStorage.getItem('username'); // Retrieve from localStorage

    if (username) {
        document.getElementById('greeting').innerText = `Hi there ${username}👋`;
    } else {
        console.log("Username not found");
    }
}

// Run this function when the page loads
window.onload = setUserName;

function addToDo() {
    const todoInput = document.getElementById('todoInput');
    const emptyState = document.querySelector('li')
    if(todoInput.value != '') {
        let todoItem = todoInput.value;
        emptyState.style.display = 'none';
        let li = document.createElement('li');
        document.getElementById('todoList').appendChild(li)
        li.innerHTML = `<input type="checkbox" ${todoItem.completed ? 'checked' : ''} onchange="toggleTodo(${todoItem.id})">
                <span>${todoItem}</span>
                <button class="delete-btn" onclick="deleteTodo(${todoItem.id})">Delete</button>`
        li.className = 'todo-item'        
    }
}
