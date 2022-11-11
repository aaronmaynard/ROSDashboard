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
		closeSetup();
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
	cmd_vel_listener = new ROSLIB.Topic({
		ros: ros,
		name: "/cmd_vel",
		messageType: 'geometry_msgs/Twist'
	});
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
}
