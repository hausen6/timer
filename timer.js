(function () {
	'use strict'
	
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	var resumeButton = document.getElementById("resumeButton");
	var Hour = document.getElementById("inputHour");
	var Min = document.getElementById("inputMin");
	var Sec = document.getElementById("inputSec");
	var textTime = document.getElementById("timeText");

	var lastTime = 0;
	var h, m, s;

	var isRunning = false;
	var timerID;
	var cnt = 0;

	function setButtonState(start, stop, resume){
		startButton.disabled = !start;
		stopButton.disabled = !stop;
		resumeButton.disabled = !resume;

		startButton.className = start ? "button active": "button inactive";
		stopButton.className  = stop ? "button active": "button inactive";
		resumeButton.className = resume ? "button active": "button inactive";
	}

	function finish(){
		stopButtonCB();
		textTime.innerHTML = "Time Up";
		document.body.className = "body yellow";
		cnt = 0;
		noticeTimeUp();
	}

	function noticeTimeUp(){
		timerID = setTimeout(function (){
			cnt += 1;
			if (cnt >= 10) {
				clearTimeout(timerID);
				return;
			};
			if (cnt % 2 == 0){
				document.body.className = "body yellow";
			}
			else{
				document.body.className = "body red";
			}
			noticeTimeUp();
		}, 1000);
	}

	function updateTime() {
		timerID = setTimeout(function (){
			// 時間をデクリメント
			lastTime -= 1;
			// 終了判定
			if (lastTime == 0){
				finish();
				return;
			}
			// 時間の計算
			h = parseInt(lastTime / 3600);
			m = parseInt((lastTime - (3600 * h)) / 60);
			s = parseInt(lastTime - (3600 * h) - (60 * m));
			textTime.innerHTML = h + ":" + m + ":" + s;
			updateTime();
		}, 1000);
	}

	// start button を押した際の処理
	startButton.addEventListener("click", startButtonCB);
	function startButtonCB() {
		// フラグ管理
		if (isRunning) return;
		isRunning = true;
		// entry からの数字読み込み
		h = parseInt(document.forms.id_form1.inputHour.value);
		m = parseInt(document.forms.id_form1.inputMin.value);
		s = parseInt(document.forms.id_form1.inputSec.value);
		// 時間計算
		lastTime = h * 3600 + m * 60 + s;
		textTime.innerHTML = h + ":" + m + ":" + s;
		// 処理の呼び出し
		updateTime();
		// button の状態を変化
		setButtonState(false, true, false);
	};

	// stop button 処理
	stopButton.addEventListener("click", stopButtonCB);
	function stopButtonCB () {
		// フラグ管理
		if (!isRunning) return;
		isRunning = false;
		// タイマーの削除
		clearTimeout(timerID);
		// button の状態を変化
		setButtonState(true, false, true);
	};

	// resume button 処理
	resumeButton.addEventListener("click", function(){
		// フラグ管理
		if (isRunning) return;
		isRunning = true;
		updateTime();
		// button の状態を変化
		setButtonState(false, true, false);
	}) 
})();
