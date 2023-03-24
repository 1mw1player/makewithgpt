const paragraph = document.getElementById("main-paragraph");
const words = paragraph.innerHTML.split(" ");
paragraph.innerHTML = "";

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  paragraph.appendChild(span);
});
