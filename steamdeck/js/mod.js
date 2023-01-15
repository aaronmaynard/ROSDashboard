function connectClientOpen() {
	document.getElementById("connectClient").style.height = "100%";
}

function connectClientClose() {
	document.getElementById("connectClient").style.height = "0%";
}

function settingsOpen() {
	document.getElementById("settings").style.height = "100%";
}

function settingsClose() {
	document.getElementById("settings").style.height = "0%";
}

// Buttons

function toggleJoy() {
  var x = document.getElementById("joystick");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function openDesktopSite() {

}

function actionLink() {

}


document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  // Hide joystick on load
  toggleJoy();
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      // do this
      console.log('Checked');
	  toggleJoy();
    } else {
      // do that
      console.log('Not checked');
	  toggleJoy();
    }
  });
});