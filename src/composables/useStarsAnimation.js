import { ref, onMounted, onUnmounted } from 'vue';

export default function useStarsAnimation() {
const canvas = ref(null);
let ctx;
let animationFrameId;

let stars = [], // Array that contains the stars
FPS = 60, // Frames per second
x = 100, // Number of stars
mouse = {
    x: 0,
    y: 0
};  // mouse location

const draw = () => {
    const canvasElement = canvas.value;
    ctx.clearRect(0,0,canvasElement.width,canvasElement.height);

    ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    }

    ctx.beginPath();
    for (var i = 0, x = stars.length; i < x; i++) {
        var starI = stars[i];
        ctx.moveTo(starI.x,starI.y); 
        if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
        for (var j = 0, x = stars.length; j < x; j++) {
            var starII = stars[j];
            if(distance(starI, starII) < 150) {
                //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
                ctx.lineTo(starII.x,starII.y); 
            }
        }
    }
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

const distance = ( point1, point2 ) => {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt( xs + ys );
}

// Update star locations

const update = () => {
    const canvasElement = canvas.value;
    for (var i = 0, x = stars.length; i < x; i++) {
        var s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvasElement.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvasElement.height) s.vy = -s.vy;
    }
}

const handleMouseMove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};

onMounted(() => {
    const canvasElement = canvas.value;
    ctx = canvasElement.getContext('2d');
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    // Push stars to array
    for (var i = 0; i < x; i++) {
        stars.push({
            x: Math.random() * canvasElement.width,
            y: Math.random() * canvasElement.height,
            radius: Math.random() * 1 + 1,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25
        });
    }

    canvasElement.addEventListener('mousemove', handleMouseMove);
    tick();
})

onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    if (canvas.value) {
        canvas.value.removeEventListener('mousemove', handleMouseMove);
    }
});

const tick = () => {
    draw();
    update();
    animationFrameId = requestAnimationFrame(tick);
}

  return {
    canvas,
    tick  // you can return anything else you may need
  };
}

