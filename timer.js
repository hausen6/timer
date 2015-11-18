(function () {
	'use strict'
	
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	var resetButton = document.getElementById("resetButton");
	var inputHour = document.getElementById("inputHour");
	var inputMin = document.getElementById("inputMin");
	var inputSec = document.getElementById("inputSec");

	var lastTime = 0.0;

	var isRunning = false;

	function updataTime() {
		
	}

	startButton.addEventListener("click", function () {
		if (isRunning) return;
		isRunning = true;
		lastTime = inputHour.g
	});
})();
