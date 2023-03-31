var workspace = "localhost:9090";
var ros;

function setWS() {
	document.getElementById("wsText").classList.remove("shaketh");
	document.getElementById("loader").style.visibility = 'visible';
	workspace = document.getElementById("wsText").value;
	ros = new ROSLIB.Ros({
		url: 'ws://' + workspace
	});
	ros.on('connection', function() {
		console.log("Connected");
		document.getElementById("loader").style.visibility = 'hidden';
		rosConnected();
		connectClientClose();
	});
	ros.on('error', function(error) {
		console.log("Error");
		document.getElementById("wsText").style.border = "2px solid red";
		document.getElementById("wsText").classList.add("shaketh");
		document.getElementById("loader").style.visibility = 'hidden';
	});
	ros.on('close', function() {
		console.log("Closed");
		document.getElementById("loader").style.visibility = 'hidden';
	});
}

function rosConnected() {
	// Motion of the ocean
	cmd_vel_listener = new ROSLIB.Topic({
		ros: ros,
		name: "/cmd_vel",
		messageType: 'geometry_msgs/Twist'
	});
	cmd_vel_listener.subscribe(function(twist) {
		var velocity = Math.sqrt(twist.linear.x * twist.linear.x + twist.linear.y * twist.linear.y);
		speed = (velocity * 1).toFixed(1)
			document.getElementById("speedSec").innerHTML = speed + " M/S";
	});
	
	// Connected clients
	connected_client_listener = new ROSLIB.Topic({
		ros: ros,
		name: "/client_count",
		messageType: 'std_msgs/Int32'
	});
	connected_client_listener.subscribe(function(clients) {
		var connections = clients.data
		var connectionsText = document.getElementById("cluster").getElementsByClassName("connectedClients")[0];
		connectionsText.innerHTML = '<i class="fa fa-desktop" style="font-size:16px"></i> ' + connections;
	});
	
	// Docking procedures
	dock_procedure = new ROSLIB.Topic({
		ros: ros,
		name: "/dock",
		messageType: 'std_msgs/Empty'
	});
	undock_procedure = new ROSLIB.Topic({
		ros: ros,
		name: "/undock",
		messageType: 'std_msgs/Empty'
	});
	dockFunction = function(){
		// Change HTML as necessary.
	}
	undockFunction = function(){
		// Change HTML as necessary.
	}
	
	// Battery 
	listener_battery_pct = new ROSLIB.Topic({
		ros: ros,
		name: "/battery/charge_ratio",
		messageType: 'std_msgs/Float32'
	});
	listener_battery_pct.subscribe(function(msg){
		var batteryPercentage = document.getElementById("cluster").getElementsByClassName("batteryPercentage")[0];
		batteryPercentage.innerHTML = '<i class="fa fa-battery-3" style="font-size:16px"></i> ' + msg.toFixed(2)*100;
	});
}

// JOYSTICK

move = function(linear, angular) {
    var twist = new ROSLIB.Message({
        linear: {
            x: linear,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: angular
        }
    });
    cmd_vel_listener.publish(twist);
}
createJoystick = function() {
    var options = {
        zone: document.getElementById('joystick'),
        threshold: 0.1,
        position: {
            left: 50 + '%'
        },
        mode: 'static',
        size: 150,
        color: '#fff',
        ui: {
            el: '<div class="nipple"></div>',
            front: Element,
            back: Element
        },
    };
    manager = nipplejs.create(options);

    linear_speed = 0;
    angular_speed = 0;

    self.manager.on('start', function(event, nipple) {
        console.log("Movement start");
    });

    self.manager.on('move', function(event, nipple) {
        console.log("Moving");
    });

    self.manager.on('end', function() {
        console.log("Movement end");
    });


    manager.on('start', function(event, nipple) {
        timer = setInterval(function() {
            move(linear_speed, angular_speed);
        }, 25);
    });


    manager.on('end', function() {
        if (timer) {
            clearInterval(timer);
        }
        self.move(0, 0);
    });


    manager.on('move', function(event, nipple) {
        max_linear = 5.0; // m/s
        max_angular = 2.0; // rad/s
        max_distance = 75.0; // pixels;
        linear_speed = Math.sin(nipple.angle.radian) * max_linear * nipple.distance / max_distance;
        angular_speed = -Math.cos(nipple.angle.radian) * max_angular * nipple.distance / max_distance;
    });

    var myKeyArray = [false, false, false, false];
	
    window.addEventListener('keydown', function (e) {
        if(e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown'){
            var ykey, xkey;
            if(e.key === 'ArrowUp'){
                myKeyArray[0] = true;
                ykey = "-50px";
            }else if(e.key === 'ArrowDown'){
                myKeyArray[1] = true;
                ykey = "50px";
            }else if(e.key === 'ArrowLeft'){
                myKeyArray[2] = true;
                xkey = "-50px";
            }else if(e.key === 'ArrowRight'){
                myKeyArray[3] = true;
                xkey = "50px";
            }else{
                // Do nothing
            }
            
            document.getElementById('nipple_0_0').style.opacity = "1.0";
            document.getElementById("joystick").getElementsByClassName("front")[0].style.top = ykey;
            document.getElementById("joystick").getElementsByClassName("front")[0].style.left = xkey;
	}
    })

    window.addEventListener('keyup', function (e) {
        if(e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown'){
            var ykey, xkey;
            if(e.key === 'ArrowUp'){
                myKeyArray[0] = false;
                ykey = "0px";
            }else if(e.key === 'ArrowDown'){
                myKeyArray[1] = false;
                ykey = "0px";
            }else if(e.key === 'ArrowLeft'){
                myKeyArray[2] = false;
                xkey = "0px";
            }else if(e.key === 'ArrowRight'){
                myKeyArray[3] = false;
                xkey = "0px";
            }else{
                // Do nothing
            }
            
            document.getElementById("joystick").getElementsByClassName("front")[0].style.top = ykey;
            document.getElementById("joystick").getElementsByClassName("front")[0].style.left = xkey;
		
            var bool = false;
	    for (index = 0; index < myKeyArray.length; index++){
		if(myKeyArray[index]){
			bool = true;
		}
		}
		if(bool){
			//There is still a key pressed
		}else{
			document.getElementById('nipple_0_0').style.opacity = "0.5";
			self.move(0, 0);
			move(0, 0);
		}
	}
    })

}
window.onload = function() {
    createJoystick();
}


// Steamdeck Controls

const gamepadsByIndex = {};

function addGamepad(gamepad) {
  console.log("add:", gamepad.index);
  const axes = [];
  const buttons = [];
  gamepadsByIndex[gamepad.index] = {
    gamepad,
    axes,
    buttons
  };
}

function removeGamepad(gamepad) {
  const info = gamepadsByIndex[gamepad.index];
  if (info) {
    delete gamepadsByIndex[gamepad.index];
  }
}

function addGamepadIfNew(gamepad) {
  const info = gamepadsByIndex[gamepad.index];
  if (!info) {
    addGamepad(gamepad);
  } else {
    info.gamepad = gamepad;
  }
}

function handleConnect(e) {
  console.log("connect");
  addGamepadIfNew(e.gamepad);
  captureLoop();
}

function handleDisconnect(e) {
  console.log("disconnect");
  removeGamepad(e.gamepad);
}

function processController(info) {
  captureLoop();
}

function addNewPads() {
  const gamepads = navigator.getGamepads();
  for (let i = 0; i < gamepads.length; i++) {
    const gamepad = gamepads[i];
    if (gamepad) {
      addGamepadIfNew(gamepad);
    }
  }
}

window.addEventListener("gamepadconnected", handleConnect);
window.addEventListener("gamepaddisconnected", handleDisconnect);

function process() {
  addNewPads(); // some browsers add by polling, others by event
  
  Object.values(gamepadsByIndex).forEach(processController);
  requestAnimationFrame(process);
}
requestAnimationFrame(process);

// Aaron's Steamdeck Code

function buttonPressed(b) {
  if (typeof(b) == "object") {
    return b.pressed;
  }
  return b == 1.0;
}

function axesPushed(a){
  if (typeof(a) == "double"){
    return true;
  }
  return a == 1.0;
}

var test = true;
function captureLoop() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if (!gamepads)
    return;
  var steamdeck = gamepads[0];
  
  if(test){
  	console.log("axes size: " + steamdeck.axes.length);
  	test = false;
  }
  
  // Buttons
  
  if (buttonPressed(steamdeck.buttons[0])) {
    console.log("0:A");
  } else if(buttonPressed(steamdeck.buttons[2])) {
    console.log("2:X");
  } else if(buttonPressed(steamdeck.buttons[1])) {
    console.log("1:B");
  } else if(buttonPressed(steamdeck.buttons[3])) {
    console.log("3:Y");
  } else if(buttonPressed(steamdeck.buttons[4])) {
    console.log("4:Left Bumper");  // Need to convert to double
  } else if(buttonPressed(steamdeck.buttons[5])) {
    console.log("5:Right Bumper"); // Need to convert to double
  } else if(buttonPressed(steamdeck.buttons[6])) {
    console.log("6:Left Trigger");
  } else if(buttonPressed(steamdeck.buttons[7])) {
    console.log("7:Right Trigger");
  } else if(buttonPressed(steamdeck.buttons[8])) {
    console.log("8:Left Menu");
  } else if(buttonPressed(steamdeck.buttons[9])) {
    console.log("9:Right Menu");
  } else if(buttonPressed(steamdeck.buttons[10])) {
    console.log("10:Left Thumbstick");
  } else if(buttonPressed(steamdeck.buttons[11])) {
    console.log("11:Right Thumbstick");
  } else if(buttonPressed(steamdeck.buttons[12])) {
    console.log("12:UP");
  } else if(buttonPressed(steamdeck.buttons[13])) {
    console.log("13:DOWN");
  } else if(buttonPressed(steamdeck.buttons[14])) {
    console.log("14:LEFT");
  } else if(buttonPressed(steamdeck.buttons[15])) {
    console.log("15:RIGHT");
  } else if(buttonPressed(steamdeck.buttons[16])) {
    console.log("16:??????");
  } 
  
  // Axes
  
  /* LR|UD
  console.log("Left Joy: " + steamdeck.axes[0] + "|" + steamdeck.axes[1]);
  console.log("Right Joy: " + steamdeck.axes[2] + "|" + steamdeck.axes[3]);
  */
  
  max_linear = 5.0; // m/s
  max_angular = 2.0; // rad/s
  dead_zone = 0.2;
  linear_speed = 0.0;
  angular_speed = 0.0;
  if(Math.abs(steamdeck.axes[0]) < dead_zone){
  	steamdeck.axes[0] = 0.0;
  } else{
  	angular_speed = -max_angular * steamdeck.axes[0];
  }
  if(Math.abs(steamdeck.axes[1]) < dead_zone){
  	steamdeck.axes[1] = 0.0;
  } else{
  	linear_speed = -max_linear * steamdeck.axes[1];
  }
  
  move(linear_speed, angular_speed);

};
