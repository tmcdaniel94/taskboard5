// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const addTaskBtn = $(".btn-success");
const openDialog = $('#formModal');
const submitTaskBtn = $('#submitTask');
const deleteBtn = $(this);


// Todo: create a function to generate a unique task id
function generateTaskId() {
    // Increment nextId for the new task
    const newId = nextId;
    // Update nextId for the next task
    nextId++;
    // Save the updated nextId back to localStorage
    localStorage.setItem('nextId', JSON.stringify(nextId));

    return newId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log(task);

    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    let cardTitleEl = document.createElement('h5');
    cardTitleEl.setAttribute('class', 'card-title');
    cardTitleEl.textContent = task.title;

    let cardDateEl = document.createElement('p');
    cardDateEl.setAttribute('class', 'card-body');
    cardDateEl.textContent = task.date;

    let cardDescEl = document.createElement('p');
    cardDescEl.setAttribute('class', 'card-body');
    cardDescEl.textContent = task.description;

    // Add a button to delete the task
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('id', 'deleteBtn');
    deleteBtn.setAttribute('class', 'btn');
    deleteBtn.textContent = ('Delete');

    card.appendChild(cardTitleEl);
    card.appendChild(cardDateEl);
    card.appendChild(cardDescEl);
    card.appendChild(deleteBtn);

    // write a conditional to compare the task date to the current date to color code the tasks
    const now = dayjs();
    const dueDate = dayjs(task.date, 'DD/MM/YYYY');
    if (now.isSame(dueDate, 'day')) {
        card.classList.add('bg-warning');
    }
    // Write a conditional to handle if the duedate is after today



    return card;
};

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // consider clearing the todo-cards, in-progress-cards, done-cards divs before adding the cards
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();
    
// use the taskList variable
// Loop through the taskList var and append it to the corresponding status div
for (var i = 0; i < taskList.length; i++) {
    // todo, in-progress, done
    if (taskList[i].status === 'todo') {
        document.getElementById('todo-cards').append(createTaskCard(taskList[i]))
    }
    // write a conditional to handle in-progress and done cards

    // draggable functionality goes in this function (refer to mini-project)
}
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const newId = generateTaskId();

    let cardTitle = $('#taskTitle').val();
    let cardDate = $('#taskDate input').val();
    let cardDesc = $('#taskDesc').val();

    // Save the title, date, and description under an object
    const newTask = {
        id: newId,
        title: cardTitle,
        date: cardDate,
        description: cardDesc,
        status: 'todo'
    };
    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    event.preventDefault();
    // remove task/div from taskList array on delete (click)
    

    // delete this;




    // let currentDiv = getElementById('#newId');

    // currentDiv = null;

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    // Datepicker
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    addTaskBtn.on('click', function (event) {
        event.preventDefault();
        // .modal('show'); allows the dialog box to be interactive
        openDialog.modal('show');
    })

    submitTaskBtn.on('click', handleAddTask);
    deleteBtn.on('click', handleDeleteTask);

});