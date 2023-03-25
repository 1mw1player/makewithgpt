function clearExperience() {
  // Remove the CSS and JavaScript files
  var cssUrl = "experiences/" + currentExperience + "/styles.css";
  var jsUrl = "experiences/" + currentExperience + "/script.js";
  var css = document.querySelector("link[href='" + cssUrl + "']");
  var script = document.querySelector("script[src='" + jsUrl + "']");
  if (css) {
    document.head.removeChild(css);
  }
  if (script) {
    document.head.removeChild(script);
  }

  // Remove the HTML content
  document.getElementById("main-content").innerHTML = "";

  // Clear all variables from the previous experience
  shape = null;
  shapes1 = null;
  shapes2 = null;
  circles = null;
  
  // Reset any global variables to their initial values
  currentCircle = 0;
}

var currentExperience = 0;

function goToExperience() {
  // Hide the paragraph tag
  document.getElementById("main-paragraph").style.display = "none";

  // Hide the orange button
  document.getElementById("hoops").style.display = "none";

  // Clear old experience
  clearExperience();

  var nextExperience = currentExperience % 4 + 1; // Use modulus to cycle through experiences 1-4

  currentExperience = nextExperience;
  loadPage("experiences/" + currentExperience + "/index.html");
}

function loadPage(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("main-content").innerHTML = this.responseText;

      // Load the CSS file if it exists
      var cssUrl = url.replace("html", "css");
      if (fileExists(cssUrl)) {
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.type = "text/css";
        css.href = cssUrl;
        document.head.appendChild(css);
      }

      // Load the JavaScript file if it exists
      var jsUrl = url.replace("html", "js");
      if (fileExists(jsUrl)) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = jsUrl;
        document.head.appendChild(script);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

  // Utility function to check if a file exists
  function fileExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }
}
