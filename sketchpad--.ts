

class Sketchpad {

    isDrawing: boolean;
    color: string = 'lime';
    textColor: string = 'white';
    mousePos = { x: 0, y: 0 };
    lastPos = this.mousePos;
    canvas: CanvasRenderingContext2D;
    lineWidth: number = 5;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas.getContext('2d');
        this.canvas.canvas.setAttribute('style', 'cursor:crosshair;background-color:black;');
        this.isDrawing = false;
        this.buildListeners();
    }

    Start() {
        this.loop();
    }

    loop = () => {
        window.requestAnimationFrame(this.loop);
        this.draw();
    }

    draw() {
        this.canvas.lineWidth = this.lineWidth;
        this.canvas.strokeStyle = this.color;
        if (this.isDrawing) {
            this.canvas.moveTo(this.lastPos.x, this.lastPos.y);
            this.canvas.lineTo(this.mousePos.x, this.mousePos.y);
            this.canvas.stroke();
            this.lastPos = this.mousePos;
        }
    }

    getMousePos(event: MouseEvent) {
        let rect = this.canvas.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    getTouchPos(touchEvent: TouchEvent) {
        var rect = this.canvas.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }


    buildListeners() {
        document.body.addEventListener("touchstart", (e) => {
            if (e.target == this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", (e) => {
            if (e.target == this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", (e) => {
            if (e.target == this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        this.canvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
            if (e.target == this.canvas.canvas) {
                e.preventDefault();
            }
            this.isDrawing = true;
            this.lastPos = this.getMousePos(e);
        });
        this.canvas.canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });
        document.body.addEventListener('mouseup', (e:MouseEvent) => {
            this.isDrawing = false;
        });
        this.canvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
            if (e.target == this.canvas.canvas) {
                e.preventDefault();
            }
            this.mousePos = this.getMousePos(e);
        });
        this.canvas.canvas.addEventListener("touchstart", (e) => {
            this.mousePos = this.getTouchPos(e as TouchEvent);
            let touch = (e as TouchEvent).touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);

        this.canvas.canvas.addEventListener("touchend", (e) => {
            let mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);
        this.canvas.canvas.addEventListener("touchmove", (e) => {
            let touch = (e as TouchEvent).touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);
    }
}