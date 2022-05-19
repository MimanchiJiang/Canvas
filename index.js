let canvas = document.getElementById("canvas");
//获取屏幕宽高
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

let ctx = canvas.getContext("2d");//2维渲染
ctx.fillStyle = "black";
ctx.strokeStyle = 'none';
ctx.lineWidth = 8;
ctx.lineCap = "round";//每个线的末尾是圆的还是方的

//画线
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


let painting = false
let last

var isTouchDevice = 'ontouchstart' in
    document.documentElement;

//手机版
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        last = [x, y]
    }
    canvas.ontouchmove/*触屏*/ = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        drawLine(last[0], last[1], x, y)
        last = [x, y]
    }
} else {
    canvas.onmousedown = (e) => {
        painting = true
        last = [e.clientX, e.clientY]
    }

    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
    }

    canvas.onmouseup = () => {
        painting = false
    }

}