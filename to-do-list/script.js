function addTask() {
    var taskInput = document.getElementById('task');
    var priorityInput = document.getElementById('priority');
    var dueDateInput = document.getElementById('dueDate');
    var taskText = taskInput.value.trim();
    var priority = priorityInput.value;
    var dueDate = dueDateInput.value;

    if (taskText !== '') {
        var taskList = document.getElementById('taskList');
        var newTask = document.createElement('li');
        newTask.innerHTML = `
            ${taskText} (Priority: ${priority}, Due: ${dueDate})
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(newTask);

        taskInput.value = '';
        priorityInput.value = 'low';
        dueDateInput.value = '';
    }
}

function removeTask(button) {
    var taskItem = button.parentElement;
    taskItem.remove();
}
