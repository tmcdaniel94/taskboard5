// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const addTaskBtn = $(".btn-success");
const openDialog = $('#formModal');
const submitTaskBtn = $('#submitTask');

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
    card.setAttribute('class', 'card draggable');

    card.dataset.taskId = task.id;

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
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.textContent = ('Delete');
    deleteBtn.addEventListener('click', handleDeleteTask);

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
    else if (now.isAfter(dueDate, 'day')) {
        card.classList.add('bg-danger');
    }

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
    else if (taskList[i].status === 'in-progress') {
        document.getElementById('in-progress-cards').append(createTaskCard(taskList[i]))
    }
    else if (taskList[i].status === 'done') {
        document.getElementById('done-cards').append(createTaskCard(taskList[i]))
    }

    // draggable functionality goes in this function (refer to mini-project)
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
    // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
    //   const original = $(e.target).card('ui-draggable')
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return $(this).clone().css({
        width: $(this).outerWidth(),
      });
    },
  });
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
    console.log('hello');
    // remove task/div from taskList array on delete (click)
    // find the closest card element
    let currentDiv = event.target.closest('.card');
    // Get the task ID from the data attribute
    let taskId = parseInt(currentDiv.dataset.taskId);
    console.log(currentDiv);
    console.log('here is taskId: ', taskId);
    // Find the index of the task in the taskList array
    let taskIndex = taskList.findIndex(task => task.id === taskId);
    console.log('here is taskIndex:', taskIndex);

    if (taskIndex !== -1) {
        // Remove task for the taskList array
        taskList.splice(taskIndex, 1);
        // Update to local storage
        localStorage.setItem('tasks', JSON.stringify(taskList));
        // Rerender the task list
        renderTaskList();
    }

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //  Read tasks from localStorage
  const tasks = taskList;
  // Get the project id from the event
  const taskId = ui.draggable.data('taskId');
  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
      task.status = newStatus;
    }}

  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();

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

    // Make lanes droppable
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    submitTaskBtn.on('click', handleAddTask);




});