const smoothstep = (edge0, edge1, x) => {
	x = constrain((x - edge0) / (edge1 - edge0), 0, 1)
	return x * x * (3 - 2 * x)
}

class Particle {
    constructor(x, y, size) {
      this.x = this.ox = x;
      this.y = this.oy = y;
          this.size = size
    }
    
    update() {
          const p = {x: mouseX, y: mouseY}
      const d = dist(this.x, this.y, p.x, p.y);
      const a = atan2(this.y - p.y, this.x - p.x);
      const f = 5*smoothstep(240, 0, d);
      
      if (d < 400) {
        // Apply interaction force if within range
        this.x += cos(a) * f;
        this.y += sin(a) * f;
      }
  
      // Return to original position with easing
      this.x += (this.ox - this.x) * ease;
      this.y += (this.oy - this.y) * ease;
    }
    
    show(pointSize) {
          stroke(255,0,0)
          strokeWeight(this.size)
      point(this.x, this.y);
    }
  }

let h = window.innerHeight
let w = window.innerWidth
const particles = [];
const step = 6;
const pointSize = 4;
const ease = 0.01; // Controls the returning speed
let simulatedMouse = { x: 500, y: 300 }; // Starting position for the simulated mouse
let canvas;

function setup() {
  canvas = createCanvas(w, h);
  canvas.position(0,0);
  canvas.style('z-index', '-1')

  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
      const p = new Particle(
        x + random(-3, 3),
        y + random(-3, 3),
        pointSize
      );
      particles.push(p);
    }
  }
}

function draw() {
clear()

  // Update the simulated mouse position (e.g., sinusoidal movement)
  simulatedMouse.x = width / 2 + sin(frameCount * 0.02) * 200;
  simulatedMouse.y = height / 2 + cos(frameCount * 0.02) * 150;

  particles.forEach((particle) => {
    particle.update(simulatedMouse);
    particle.show(pointSize);
  });
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

let vid = document.getElementById('vid')
if(window.innerWidth >= 768) {
vid.setAttribute('src', "assets/videos/Composition 1.mp4")
} else {
  vid.setAttribute('src', "assets/videos/Composition 5_1.mp4")
}
console.log(vid.getAttribute('src'))

function touchStarted() {
  mouseClicked();
  return false;
  }
  
  function touchMoved() {
  mouseClicked();
  return false;
  }