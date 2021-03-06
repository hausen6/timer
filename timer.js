(function () {
	'use strict'
	
	var startButton = document.getElementById("startButton");
	var stopButton = document.getElementById("stopButton");
	var resumeButton = document.getElementById("resumeButton");
	var Hour = document.getElementById("inputHour");
	var Min = document.getElementById("inputMin");
	var Sec = document.getElementById("inputSec");
	var textTime = document.getElementById("timeText");

	var startTime = 0;
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

	// タイムアップしたことを知らせるための画面チカチカ関数
	function noticeTimeUp(){
		timerID = setTimeout(function (){
			cnt += 1;
			if (isRunning) return;
			if (cnt >= 30) {
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
		}, 300);
	}

	function to2order(num){
		return ("0" + num).slice(-2);
	}

	function updateTime() {
		timerID = setTimeout(function (){
			// 時間をデクリメント
			lastTime -= 1;
			// 終了判定
			if (lastTime <= 0){
				finish();
				return;
			}
			// 時間の計算
			h = parseInt(lastTime / 3600);
			m = parseInt((lastTime - (3600 * h)) / 60);
			s = parseInt(lastTime - (3600 * h) - (60 * m));

			// 残り時間によって画面の背景を変化
			// 残り時間が 1 / 10 以下になったら画面を赤くする
			if (lastTime <= startTime / 10){
				document.body.className = "body red";
			}
			// 残り時間が 1 / 3 以下になったら画面を黄色くする
			else if (lastTime <= startTime / 3){
				document.body.className = "body yellow";
			}
			textTime.innerHTML = to2order(h) + ":" + to2order(m) + ":" + to2order(s);
			updateTime();
		}, 1000);
	}

	// start button を押した際の処理
	startButton.addEventListener("click", startButtonCB);
	function startButtonCB() {
		// フラグ管理
		if (isRunning) return;
		isRunning = true;

		// 背景を元の色に戻す
		document.body.className = "body";

		// entry からの数字読み込み
		h = parseInt(document.forms.id_form1.inputHour.value);
		m = parseInt(document.forms.id_form1.inputMin.value);
		s = parseInt(document.forms.id_form1.inputSec.value);
		// 時間計算
		lastTime = h * 3600 + m * 60 + s;
		startTime = lastTime;
		textTime.innerHTML = to2order(h) + ":" + to2order(m) + ":" + to2order(s);
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
