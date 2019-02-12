/*
  August Luhrs
  Connected Devices and Networked Interaction
	Tom Igoe -- Spring 2019
  Week 2 Assignment

  based on p5 fadecandy examples from Scanlime's fadecandy github repo:
	https://github.com/scanlime/fadecandy/tree/master/examples/p5js
*/

// Connect to the local instance of fcserver

var socket = io();
var WebSocketAddress = "ws://192.168.1.4:7890"; //roompi's local IP

//control buttons
var redSlide, greenSlide, blueSlide, offOn;
var redCol = 0;
var greenCol = 0;
var blueCol = 0;
var light = true; //to toggle the off/on button

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight);
	// canvas.id(canvasId);
	socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.

	ledStrip(0, 64, width/2, height/2, width/70, 0, false);
	ledStrip(64, 64, width/2, height/2, width/70, 0, false);
	ledStrip(128, 64, width/2, height/2, width/70, 0, false);
	ledStrip(192, 64, width/2, height/2, width/70, 0, false);
	ledStrip(256, 64, width/2, height/2, width/70, 0, false);
	ledStrip(320, 64, width/2, height/2, width/70, 0, false);
	ledStrip(384, 64, width/2, height/2, width/70, 0, false);
	ledStrip(448, 64, width/2, height/2, width/70, 0, false);
	// frameRate(60);

	//UI
	textAlign(CENTER);
	redSlide = createSlider(0,255,40);
	redSlide.position(width/2, 3 * height/7 - height/10);
	greenSlide = createSlider(0,255,255);
	greenSlide.position(width/2, 3 * height/7);
	blueSlide = createSlider(0,255,188);
	blueSlide.position(width/2, 3 * height/7 + height/10);
	offOn = createButton('turn lights off/on');
	offOn.position(width/2, 5 * height/7);
	offOn.mousePressed(function(){
		if(light){
			redSlide.value(0);
			greenSlide.value(0);
			blueSlide.value(0);
			light = !light;
		}
		else{
			redSlide.value(255);
			greenSlide.value(255);
			blueSlide.value(255);
			light = !light;
		}
	});
}

function draw(){
	background(redSlide.value(), greenSlide.value(), blueSlide.value()); //color of page responds to user change
	textSize(width/20);
	fill(0);
	text('Choose The Shelf Color', width/2, height/6);

	textSize(width/20);
	fill(redSlide.value(), 0, 0);
	text('red', width/4, 3 * height/7 - height/10);
	fill(0, greenSlide.value(), 0);
	text('green', width/4, 3 * height/7);
	fill(0, 0, blueSlide.value());
	text('blue', width/4, 3 * height/7 + height/10);


	//Send to fcServer.
	drawFrame();
}

/* from flames example
//Show LED pixel locations.
var showPixelLocations = true;
//Change the HTML Id of the canvas.
var canvasId = "strip64_flames"

var im;

function setup(){
	var canvas = createCanvas(800, 200);
	canvas.id(canvasId);
	socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.


	im = loadImage("images/flames.jpeg"); // Load a sample image
	ledStrip(0, 64, width/2, height/2, width/70, 0, false);
	frameRate(60);
}

function draw() {

	// Scale the image so that it matches the width of the window
	var imHeight = im.height * width / im.width;

	// Scroll down slowly, and wrap around
	var speed = 0.05;
	var y = (millis() * -speed) % imHeight;

	// Use two copies of the image, so it seems to repeat infinitely
	image(im, 0, y, width, imHeight);
	image(im, 0, y + imHeight, width, imHeight);

	//Send to fcServer.
	drawFrame();
}

*/
