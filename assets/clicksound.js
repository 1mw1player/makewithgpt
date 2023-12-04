// get references to all the button elements with class .button
const buttons = document.querySelectorAll('.button');

// get a reference to the audio element
const audio = new Audio('assets/sounds/fantasy_ui_button_6-102219.mp3');

// add an event listener to each button
buttons.forEach(function(button) {
  button.addEventListener('mouseover', function() {
  
   // reset the audio to the beginning
   audio.currentTime = 0;
   // play the sound
   audio.play();
  });
});
