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
  toggleJoy();
  var checkboxElems = document.querySelectorAll("input[type='checkbox']");
  for (var i = 0; i < checkboxElems.length; i++) {
    checkboxElems[i].addEventListener("change", displayCheck);
  }

  function displayCheck(e){
    if(e.target.id === 'toggle-virtual-joystick'){
      console.log('toggling')
      toggleJoy();
    }
    if(e.target.id === 'toggle-mini-map'){
      console.log('toggling')
      toggleMiniMap();
    }

  }
});
