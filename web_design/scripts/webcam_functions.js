var websocket = null; // websocket instance
var localhost = "192.168.1.65";
var b = document.getElementById('btnWS');
var buttonClicked = false;

// Initialize the websocket
function init() {
	if(window.location.hostname != "") {
		localhost = window.location.hostname;
	}

	doConnect();
}

function doConnect() { // makes a connection and defines callbacks
	if (b.innerText == "Click to Start Webcam") {
		writeToScreen("Connecting to ws://" + localhost + "/stream ...");
		b.disabled = true;
		websocket = new WebSocket("ws://" + localhost + "/stream");
		websocket.onopen = function(evt) {
			onOpen(evt)
		};
		websocket.onclose = function(evt) {
			onClose(evt)
		};
		websocket.onmessage = function(evt) {
			onMessage(evt)
		};
		websocket.onerror = function(evt) {
			onError(evt)
		};
	} else {
		writeToScreen("Disconnecting ...");
		websocket.close();
	}
}

function onOpen(evt) { // when handshake is complete:
	writeToScreen("Connected.");
	
	var para = document.createElement('p');
if (b.textContent == "Start Webcam" || b.textContent =="Click to Start Webcam" ) {
            b.textContent = "Stop Webcam";
            para.textContent = "Started! ";
        } else {
            b.textContent = "Start Webcam";
            para.textContent = "Stopped!";
        }
document.getElementById("btnWS").disabled = false;

	buttonClicked = false;
}

function onClose(evt) { // when socket is closed:
	writeToScreen("Disconnected. Error: " + evt);
	var para = document.createElement('p');
if (b.textContent == "Start Webcam" || b.textContent =="Click to Start Webcam" ) {
            b.textContent = "Stop Webcam";
            para.textContent = "Started! ";
        } else {
            b.textContent = "Start Webcam";
            para.textContent = "Stopped!";
        }
    
    // If the user never actually clicked the button to stop the webcam, reconnect.
	if (buttonClicked == false) {
		doConnect();
	}

document.getElementById("btnWS").disabled = false;
	buttonClicked = false;
}

function onMessage(msg) { // when client receives a WebSocket message because a new image is ready:
var n = new Date();
document.getElementById("timestamp").innerHTML = n;
	
	// Get the image just taken from WiFi chip's RAM.
	var image = document.getElementById('image');
	var reader = new FileReader();
	reader.onload = function(e) {
		var img_test = new Image();
		img_test.onload = function(){image.src = e.target.result;};
		img_test.onerror = function(){;};
		img_test.src = e.target.result;
	};
	reader.readAsDataURL(msg.data);
}

function updateBtn(){
var btn = document.querySelector('#btnWS');
    btn.addEventListener('click', updateBtn);
var para = document.createElement('p');
if (btn.textContent == "Start Webcam" || btn.textContent =="Click to Start Webcam" ) {
            btn.textContent = "Stop Webcam";
            para.textContent = "Started! ";
        } else {
            btn.textContent = "Start Webcam";
            para.textContent = "Stopped!";
        }
        document.body.appendChild(para);
    }




function onError(evt) { // when an error occurs
	websocket.close();
	writeToScreen("Websocket error");
	var para = document.createElement('p');
if (btn.textContent == "Start Webcam" || btn.textContent =="Click to Start Webcam" ) {
            btn.textContent = "Stop Webcam";
            para.textContent = "Started! ";
        } else {
            btn.textContent = "Start Webcam";
            para.textContent = "Stopped!";
        }
	
	
	buttonClicked = false;
}

// Set up event listeners
//*** When the button is clicked, disable it and set the 'buttonClicked' variable to true, and depending on whether a Websocket is open or not, either run "doConnect()" or "websocket.close()" ***//


// Function to display to the message box
 function writeToScreen(message)
  {
	document.getElementById("msg").innerHTML += message + "\n";
	document.getElementById("msg").scrollTop = document.getElementById("msg").scrollHeight;
  }

// Open Websocket as soon as page loads
window.addEventListener("load", init, false);
