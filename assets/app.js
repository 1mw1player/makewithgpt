// app.js in the assets directory
var currentExperience = 0;

function goToExperience() {
  var nextExperience = currentExperience + 1;
  if (nextExperience > 9) {
    nextExperience = 1;
  } else if (nextExperience < 1) {
    nextExperience = 9;
  }
  currentExperience = nextExperience;
  loadPage("experiences/" + currentExperience + "/index.html");
}

function loadPage(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("main-content").innerHTML = this.responseText;

      // Add the CSS file to the head section
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.type = "text/css";
      css.href = url.replace("html", "css");
      document.head.appendChild(css);

      // Add the JavaScript file to the head section
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url.replace("html", "js");
      document.head.appendChild(script);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
