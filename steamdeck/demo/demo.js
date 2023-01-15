var gradient = [
	[
		0, [204, 50, 50]
	],
	[
		50, [231, 180, 22]
	],
	[
		100, [45, 201, 55]
	]
];
var sliderWidth = 500;
var width = $(window).width();
$(window).on('resize', function() {
	if($(this).width() !== width) {
		width = $(this).width();
	}
});
$("#sliderBattery").slider({
	min: 1,
	slide: function(event, ui) {
		var colorRange = []
		$.each(gradient, function(index, value) {
			if(ui.value <= value[0]) {
				colorRange = [index - 1, index]
				return false;
			}
		});
		//Get the two closest colors
		var firstcolor = gradient[colorRange[0]][1];
		var secondcolor = gradient[colorRange[1]][1];
		//Calculate ratio between the two closest colors
		var firstcolor_x = sliderWidth * (gradient[colorRange[0]][0] / 100);
		var secondcolor_x = sliderWidth * (gradient[colorRange[1]][0] / 100) - firstcolor_x;
		var slider_x = sliderWidth * (ui.value / 100) - firstcolor_x;
		var ratio = slider_x / secondcolor_x;
		//Get the color with pickHex(thx, less.js's mix function!)
		var result = pickHex(secondcolor, firstcolor, ratio);
		$('.statusBar').children().children().css("background-color", 'rgb(' + result.join() + ')');
		$('.statusBar').children().children().css("width", (width / 2 * (ui.value / 100)));
		var batteryPercentage = document.getElementById("cluster").getElementsByClassName("batteryPercentage")[0];
		if(ui.value < 10) {
			// Critical
			ui.value = '00' + ui.value;
			batteryPercentage.innerHTML = '<i class="fa fa-battery-0" style="font-size:16px"></i> ' + ui.value;
		} else if(ui.value < 25) {
			// Low
			ui.value = '0' + ui.value;
			batteryPercentage.innerHTML = '<i class="fa fa-battery-1" style="font-size:16px"></i> ' + ui.value;
		} else if(ui.value < 60) {
			// Medium
			ui.value = '0' + ui.value;
			batteryPercentage.innerHTML = '<i class="fa fa-battery-2" style="font-size:16px"></i> ' + ui.value;
		} else if(ui.value < 85) {
			// High
			ui.value = '0' + ui.value;
			batteryPercentage.innerHTML = '<i class="fa fa-battery-3" style="font-size:16px"></i> ' + ui.value;
		} else if(ui.value < 100) {
			// Full
			ui.value = '0' + ui.value;
			batteryPercentage.innerHTML = '<i class="fa fa-battery-4" style="font-size:16px"></i> ' + ui.value;
		} else {
			batteryPercentage.innerHTML = '<i class="fa fa-battery-4" style="font-size:16px"></i> ' + ui.value;
		}
	}
});

function pickHex(color1, color2, weight) {
	var p = weight;
	var w = p * 2 - 1;
	var w1 = (w / 1 + 1) / 2;
	var w2 = 1 - w1;
	var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
		Math.round(color1[1] * w1 + color2[1] * w2),
		Math.round(color1[2] * w1 + color2[2] * w2)
	];
	return rgb;
}
$("#sliderVelocity").slider({
	min: 1,
	slide: function(event, ui) {
		var velDisplay = document.getElementById("cluster").getElementsByClassName("velocity")[0];
		var maxSpeed = 1.00; // m/s
		var vel = maxSpeed * (ui.value / 100);
		velDisplay.innerHTML = (vel).toFixed(2);
		$('.velocityPercentage').children().children().css("width", (ui.value) + "%");
	}
});
