(function JuHe(){
	let $ = {};
	const __$ = {};
	$.count = -50;
	let $frm_text;
	let particles = [];
    let width = window.innerWidth;
    var height = window.innerHeight;
	__$.WIDTH =width  -4;
	__$.HEIGHT = height -4;
    __$.COLOR = "rgb(225, 225, 225)";
	__$.RADIUS = 3;
	__$.INTERVAL = 8000;

	document.addEventListener("DOMContentLoaded", ()=>{
		temp_canvas = document.createElement("canvas");
		temp_context = temp_canvas.getContext("2d");
		$.canvas = document.getElementById("canvas");
		$.context = canvas.getContext("2d");
		$.canvas.width = temp_canvas.width = __$.WIDTH;
		$.canvas.height = temp_canvas.height = __$.HEIGHT;
		$frm_text = document.getElementsByName("character")[0];
		init_pixel_character();
		generate_from_pixel_data();
		draw();
	});

	function init_pixel_character(){
		character = $frm_text.value.slice(0, 10);
		temp_context.font = "bold 300px sans-serif";
		temp_context.textAlign = "center";
		temp_context.textBaseline = "middle"
		temp_context.fillText(character, __$.WIDTH / 2, (__$.HEIGHT / 2 )+30);
	}

	function generate_from_pixel_data(){
		let data = temp_context.getImageData(0, 0, __$.WIDTH, __$.HEIGHT).data;
		let diameter = __$.RADIUS * 3;
	 	let index = 0;
	 	let delay = 0;
		for(let i = 0, iz = __$.WIDTH - diameter; i < iz; i += diameter){
			for(let j = 0, jz = __$.HEIGHT - diameter; j < jz; j += diameter){
				let threshold = data[((i + j * __$.WIDTH) * 4) + 3];
				if(threshold === 0){
					continue;
				}
				particles[index] = 	new Particle(i, j, delay);
				index += 1;
				if(j % 5 === 0){
					delay += 1;
				}
			}
		}
	}


	function draw(){
		$.context.clearRect(0, 0, __$.WIDTH, __$.HEIGHT);
		for(let i = 0, iz = particles.length; i < iz; i+=1){
			particles[i].move();
		}
		$.count += 1;
		animation_id = requestAnimationFrame(draw);
	}
  
  class Particle{
	constructor(x, y, index){
		this.x = this.random_x = Math.random() * ((__$.WIDTH + __$.RADIUS * 2) + 1) - __$.RADIUS;
		this.y = this.random_y = Math.random() * ((__$.HEIGHT + __$.RADIUS * 2) + 1) + __$.RADIUS;
		this.v = 80;
		this.delay = index;
		this.draft_x = x;
		this.draft_y = y;
		this.pattern = 0;
		this.running = false;
		this.draw();
	}

	move(){
		if($.count % __$.INTERVAL === this.delay && !this.running){
			this.running = true;
		}
		if(this.pattern === 0){
			if(this.running){
				let shift_x = Math.floor(((this.draft_x - this.x) / this.v) * 600) / 100;
				let shift_y = Math.floor(((this.draft_y - this.y) / this.v) * 600) / 100;
				this.x += shift_x;
				this.y += shift_y;
			}
			this.draw();
		}
	}
	draw(bool){
		$.context.beginPath();
		$.context.arc(this.x, this.y, __$.RADIUS, 0, Math.PI*2);
        $.context.fillStyle = __$.COLOR;
		$.context.fill();
	}
}
})();
