// get a reference to the button element
const button = document.querySelector('.button');

// get a reference to the audio element
const audio = new Audio('path/to/sound.mp3');

// add an event listener to the button
button.addEventListener('click', function() {
  // play the sound
  audio.play();
});
