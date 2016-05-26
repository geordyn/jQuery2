$(document).ready(function() {

  $('#newTaskForm').hide();
  var listo = [];


/// function deciding what to do after task click events way below.
  var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {

        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        }
        if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';

        }
        if (listo[i].id === 'archived') {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };


// task constructor
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  }


// add task
  var addTask = function(task) {
    if (task) {
      task = new Task(task);
	  console.log(task);
      listo.push(task);
	  console.log(listo);
	  // clears the input
      $('#newItemInput').val('');

      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span>' +
        '</li>' +
        '</a>'
      );
      $('#newTaskForm').slideToggle('fast', 'linear');
    }
  };


  $('#saveNewItem').on('click', function(e) {
    var task = $('#newItemInput').val().trim();
	console.log(task);
    addTask(task);
  });

// shows form to add task
  $('#add-todo').on('click', function() {
    $('#newTaskForm').slideToggle('slow');
  });


  $('#cancel').on('click', function(e) {
    $('#newTaskForm').slideToggle('slow');
  });


  $(document).on('click', '#item', function(e) {
    var task = this;
    advanceTask(task);
    task.id = 'inProgress';
	console.log(this);
	console.log(task);
    $('#currentList').append(task.outerHTML);
  });


  $(document).on('click', '#inProgress', function(e) {
    var task = this;
    task.id = "archived";
	console.log(task);
    advanceTask(task);
    $('#archivedList').append(task.outerHTML);
  });

  $(document).on('click', '#archived', function(e) {
    // e.preventDefault();
    var task = this;
    advanceTask(task);
  });



})
