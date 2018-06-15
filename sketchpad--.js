var Sketchpad = /** @class */ (function () {
    function Sketchpad(canvas) {
        var _this = this;
        this.color = 'lime';
        this.textColor = 'white';
        this.mousePos = { x: 0, y: 0 };
        this.lastPos = this.mousePos;
        this.loop = function () {
            window.requestAnimationFrame(_this.loop);
            _this.draw();
        };
        this.canvas = canvas.getContext('2d');
        this.canvas.canvas.setAttribute('style', 'cursor:crosshair;background-color:black;');
        this.isDrawing = false;
        this.buildListeners();
    }
    Sketchpad.prototype.Start = function () {
        this.loop();
    };
    Sketchpad.prototype.draw = function () {
        this.canvas.lineWidth = 5;
        this.canvas.strokeStyle = this.color;
        if (this.isDrawing) {
            this.canvas.moveTo(this.lastPos.x, this.lastPos.y);
            this.canvas.lineTo(this.mousePos.x, this.mousePos.y);
            this.canvas.stroke();
            this.lastPos = this.mousePos;
        }
    };
    Sketchpad.prototype.getMousePos = function (event) {
        var rect = this.canvas.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };
    Sketchpad.prototype.getTouchPos = function (touchEvent) {
        var rect = this.canvas.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    };
    Sketchpad.prototype.buildListeners = function () {
        var _this = this;
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == _this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function (e) {
            if (e.target == _this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function (e) {
            if (e.target == _this.canvas.canvas) {
                e.preventDefault();
            }
        }, false);
        this.canvas.canvas.addEventListener('mousedown', function (e) {
            if (e.target == _this.canvas.canvas) {
                e.preventDefault();
            }
            _this.isDrawing = true;
            _this.lastPos = _this.getMousePos(e);
        });
        this.canvas.canvas.addEventListener('mouseup', function () {
            _this.isDrawing = false;
        });
        this.canvas.canvas.addEventListener('mousemove', function (e) {
            if (e.target == _this.canvas.canvas) {
                e.preventDefault();
            }
            _this.mousePos = _this.getMousePos(e);
        });
        this.canvas.canvas.addEventListener("touchstart", function (e) {
            _this.mousePos = _this.getTouchPos(e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            _this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);
        this.canvas.canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            _this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);
        this.canvas.canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            _this.canvas.canvas.dispatchEvent(mouseEvent);
        }, false);
    };
    return Sketchpad;
}());
