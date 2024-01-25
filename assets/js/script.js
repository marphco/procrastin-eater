$(document).ready(function () {
  let saveBtn = $('.btn');
  let currentDay = $('#currentDay');
  const timeBlocks = $('.time-block');

  // Function to display the current date
  function displayTime() {
    const today = dayjs().format('MMMM DD, YYYY');
    currentDay.text(today);
  }

  // Call the displayTime function to show the current date
  displayTime();

  // Get the current hour
  let currentHour = dayjs().hour();

  // Loop through each time block
  timeBlocks.each(function () {
    // Extract the start hour from the id of the current time block
    let blockHour = parseInt($(this).attr('id').split('-')[1]);

    // Compare the current hour with the hour of the time block
    if (currentHour === blockHour) {
      // If they are equal, add the "present" class to the time block
      $(this).addClass("present");
    } else if (currentHour < blockHour) {
      // If the current hour is less, add the "future" class
      $(this).addClass("future");
    } else {
      // If the current hour is greater, add the "past" class
      $(this).addClass("past");
    }

    // Retrieve the stored task from local storage for this time block
    let storedTask = localStorage.getItem($(this).find('.hour').text());

    // Populate the textarea with the stored task
    $(this).find('.description').val(storedTask);
  });

  // Event listener for the save button click
  saveBtn.on('click', function () {
    // Get the task from the description textarea and trim any extra spaces
    let task = $(this).closest('.time-block').find('.description').val().trim();

    // Get the time of the day (hour) associated with the clicked save button
    let timeOfDay = $(this).closest(".time-block").find('.hour').text();

    // Save the task in local storage with the time as the key
    localStorage.setItem(timeOfDay, task);
  });
});
