// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const addTaskBtn = $("#addTaskBtn");
const openDialog = $('#formModal');

addTaskBtn.on('click', function (event){
    event.preventDefault();
    // .modal('show'); allows the dialog box to be interactive
    openDialog.modal('show');
});


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
    
    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
   
    // Datepicker
    $('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
      });
});



// taskList.attr = ('id', )