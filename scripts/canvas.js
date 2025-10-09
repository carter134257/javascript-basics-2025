
//@ts-check

/** @type { HTMLCanvasElement } */
//@ts-ignore This is an HTML Canvas
const CANVAS = document.getElementById("game-canvas");

/** @type { CanvasRenderingContext2D } */
//@ts-ignore is not null
const CTX = CANVAS.getContext("2d");

const HEIGHT = 500;
const WIDTH = 1200;

CANVAS.height = HEIGHT;
CANVAS.width = WIDTH;

class Box {
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;

		this.speed = 1000;
		this.width = 50;
		this.height = this.width;

		this.xDirection = 1;
		this.yDirection = 1;
	}

	draw() {
		CTX.fillStyle = this.color;
		CTX.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		let top = this.y;
		let bottom = this.y + this.height;
		let left = this.x;
		let right = this.x + this.width;

		if (top < 0) {
			// colliding with top
			this.yDirection = 1;
		} else if (bottom > HEIGHT) {
			// colliding with bottom
			this.yDirection = -1;
		}

		if (left < 0) {
			// colliding with left
			this.xDirection = 1;
		} else if (right > WIDTH) {
			// colliding with right
			this.xDirection = -1;
		}

		this.x += this.xDirection * this.speed;
		this.y += this.yDirection * this.speed;
	}
}

/** @type { Box[] } */
let boxes = [];

let colors = ["black", "green", "blue",
	"purple", "red", "orange", "yellow",
	"gray", "Salmon", "Crimson", "FireBrick",
	"Pink", "DeepPink", "OrangeRed", "Coral",
	"Gold", "PeachPuff", "DarkKhaki", "Khaki",
	"Lavender", "MediumSlateBlue", "Lime", "LawnGreen",
	"DarkGreen", "ForestGreen", "Aqua", "Silver"
]
CTX.globalAlpha = 1.0


for (let i = 0; i <= 10000; i++) {
	let color = colors[Math.floor(Math.random() * colors.length)];

	let box = new Box(WIDTH / 2, HEIGHT / 2, color);
	box.width = 20;
	box.height = 20;
	box.x = Math.random() * (WIDTH - 100);
	box.y = Math.random() * (HEIGHT - 100);
	box.speed = Math.random() * 5 + 5;
	boxes.push(box);
}

let currentTimestamp = 0;

function drawLoop(timestamp) {
	CTX.clearRect(0, 0, WIDTH, HEIGHT);

	boxes.forEach((b) => {
		b.draw();
		b.update();
	});

	// console.log(elapsedTime);
	requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);



