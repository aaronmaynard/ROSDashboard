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

function toggleMiniMap() {
  var x = document.getElementById("mini-map");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function auxButtons() {
  var buttons = document.getElementsByClassName("buttonAux");
  const ListOfButtons = ["Y", "X", "B", "A"];
  for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function(e) {
          var x = this.id;
          console.log("Button ", ListOfButtons[x[x.length - 1] - 1]);
      });
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
