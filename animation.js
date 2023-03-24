const paragraph = document.getElementById("main-paragraph");
const words = paragraph.innerHTML.split(" ");
paragraph.innerHTML = "";

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  paragraph.appendChild(span);
});

const paragraph1 = document.getElementById("main-paragraph1");
const words1 = paragraph1.innerHTML.split(" ");
paragraph1.innerHTML = "";

words1.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  paragraph1.appendChild(span);
});
