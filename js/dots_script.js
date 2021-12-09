// let sectionEl = document.getElementById('section');
// console.log(sectionEl);
// setTimeout(function(){

// }, 3000);


(function JuHe(){
	let $ = {};
	const __$ = {};
	// let temp_canvas;
	// let temp_context;
	// $.canvas = "";
	// $.context = "";
	// コアの描画回数を追加
	// 初期化した時は-50してアニメーションのスタートを遅らせる
	$.count = -50;
	// let character;
	// let $btn;
	let $frm_text;
	let particles = [];
	// let animation_id;
	// let requestAnimationFrame = window.requestAnimationFrame || 
	// 	window.mozRequestAnimationFrame ||
	// 	window.webkitRequestAnimationFrame || 
	// 	window.msRequestAnimationFrame;
    // window.requestAnimationFrame = requestAnimationFrame;
    
    // let cancelAnimationFrame = window.cancelAnimationFrame ||
	// 	window.mozcancelAnimationFrame ||
	// 	window.webkitcancelAnimationFrame ||
	// 	window.mscancelAnimationFrame;
    // window.cancelAnimationFrame = cancelAnimationFrame;
    let width = window.innerWidth;
    var height = window.innerHeight;
	__$.WIDTH =width  -4;
	__$.HEIGHT = height -4;
    // console.log(	__$.HEIGHT);
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
		// $btn = document.getElementsByName("btn")[0];
		// $btn.addEventListener("click", ()=>{
		// 	refresh();
		// });

		init_pixel_character();

		generate_from_pixel_data();

		draw();
	});

	// function refresh() {
		// cancelAnimationFrame(animation_id);

		// $.context.clearRect(0, 0, __$.WIDTH, __$.HEIGHT);
		// $.count = -50;
		// particles = [];
		
		// init_pixel_character();

		// generate_from_pixel_data();

		// draw();
	// }

    
	// temp canvasに文字を描画する
	function init_pixel_character(){
		// temp_context.clearRect(0, 3, __$.WIDTH, __$.HEIGHT);
		character = $frm_text.value.slice(0, 10);
		// fontのスタイル、サイズ、種類の指定
		temp_context.font = "bold 300px sans-serif";
		// textの揃え位置の指定
		temp_context.textAlign = "center";
		
		// textの上下の基準線の指定
		temp_context.textBaseline = "middle"
		// temp_context.fillStyle = "rgb(255,255,255)";
		temp_context.fillText(character, __$.WIDTH / 2, (__$.HEIGHT / 2 )+30);
	}

	// temp canvasのピクセルデータをもとにパーティクル(x,y)を生成する
	// ピクセルnは
	// (n*4): 0~255(r)
	// (n*4)+1: 0~255(g)
	// (n*4)+2: 0~255(b)
	// (n*4)+3: 0~255(a)
	// のようになっている
	function generate_from_pixel_data(){
		let data = temp_context.getImageData(0, 0, __$.WIDTH, __$.HEIGHT).data;
		let diameter = __$.RADIUS * 3;
	 	let index = 0;
	 	let delay = 0;
		for(let i = 0, iz = __$.WIDTH - diameter; i < iz; i += diameter){
			for(let j = 0, jz = __$.HEIGHT - diameter; j < jz; j += diameter){
				// 透明ではないならパーティクルを生成する
				let threshold = data[((i + j * __$.WIDTH) * 4) + 3];
				if(threshold === 0){
					continue;
				}
				particles[index] = 	new Particle(i, j, delay);
				index += 1;
				// delayで移動する最初タイミングをずらす
				if(j % 5 === 0){
					delay += 1;
				}
			}
		}
	}

	// 描画再帰処理
	function draw(){
		$.context.clearRect(0, 0, __$.WIDTH, __$.HEIGHT);
		for(let i = 0, iz = particles.length; i < iz; i+=1){
			particles[i].move();
		}
		// コアの描画回数を追加
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
	// 移動する
	move(){
        // this.running = true;
		if($.count % __$.INTERVAL === this.delay && !this.running){
			this.running = true;
		}
		// パターン1
		// 文字になる動き
		if(this.pattern === 0){
			if(this.running){
				let shift_x = Math.floor(((this.draft_x - this.x) / this.v) * 600) / 100;
				let shift_y = Math.floor(((this.draft_y - this.y) / this.v) * 600) / 100;
				this.x += shift_x;
				this.y += shift_y;
				// if(shift_x === 0 && shift_y === 0){
				// 	this.pattern = 1;
				// 	this.running = false;
				// }
				// // 近づいたら色を変える
				// if(Math.abs(shift_x) <= 0.05 && Math.abs(shift_y) <= 0.05){
				// 	this.draw(true);
				// 	return;
				// }
			}
			this.draw();
		// 文字がバラバラになる動き
		}
        // else if(this.pattern === 1){
		// 	if(this.running){
		// 		let shift_x = Math.floor(((this.random_x - this.x) / this.v) * 100) / 100;
		// 		let shift_y = Math.floor(((this.random_y - this.y) / this.v) * 100) / 100;
		// 		this.x += shift_x;
		// 		this.y += shift_y;
		// 		if(shift_x === 0 && shift_y === 0){
		// 			this.pattern = 0;
		// 			this.x = this.random_x;
		// 			this.y = this.random_y;
		// 			this.running = false;
		// 		}
		// 		// 離れ始めたら色を変える
		// 		if(Math.abs(shift_x) <= 8 && Math.abs(shift_y) <= 8){
		// 			this.draw();
		// 			return;
		// 		}
		// 	}
		// 	this.draw(true);
		// }
	}
	draw(bool){
		$.context.beginPath();
		$.context.arc(this.x, this.y, __$.RADIUS, 0, Math.PI*2);
        $.context.fillStyle = __$.COLOR;
		// if(bool){
		// 	$.context.fillStyle =    __$.COLOR;
		// }
		$.context.fill();
	}
}
})();
// function Start(){
//     JuHe();
// }
