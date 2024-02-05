const paragraph = document.getElementById("main-paragraph");
const words = paragraph.innerHTML.split(" ");
paragraph.innerHTML = "";

words.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  span.style.display = "inline-block"; // set display to inline-block
  span.style.transform = "translateY(100%)"; // move span down by 100%
  paragraph.appendChild(span);

  // use setTimeout to delay the animation
  setTimeout(() => {
    span.style.transform = "translateY(0)"; // move span up to its original position
  }, index * 100);
});

const paragraph1 = document.getElementById("main-paragraph1");
const words1 = paragraph1.innerHTML.split(" ");
paragraph1.innerHTML = "";

words1.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  span.style.display = "inline-block"; // set display to inline-block
  span.style.transform = "translateY(100%)"; // move span down by 100%
  paragraph1.appendChild(span);

  // use setTimeout to delay the animation
  setTimeout(() => {
    span.style.transform = "translateY(0)"; // move span up to its original position
  }, index * 100);
});


const paragraph2 = document.getElementById("main-paragraph2");
const words2 = paragraph2.innerHTML.split(" ");
paragraph2.innerHTML = "";

words2.forEach((word, index) => {
  const span = document.createElement("span");
  span.innerHTML = word + " ";
  span.style.animationDelay = `${index * 0.1}s`; // add delay for each word
  span.style.display = "inline-block"; // set display to inline-block
  span.style.transform = "translateY(100%)"; // move span down by 100%
  paragraph2.appendChild(span);

  // use setTimeout to delay the animation
  setTimeout(() => {
    span.style.transform = "translateY(0)"; // move span up to its original position
  }, index * 100);
});

