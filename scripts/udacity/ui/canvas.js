var udacity;
(function (udacity) {
    var ui;
    (function (ui) {
        var canvas;
        (function (canvas_1) {
            canvas_1.isTouch = false;
            function load(global, postResourceLoad = () => { }) {
                ui.resources.loadAllResources(() => {
                    canvas_1.document = global.document;
                    canvas_1.window = global.window;
                    canvas_1.canvas = canvas_1.document.createElement('canvas');
                    canvas_1.canvas.height = 606;
                    canvas_1.canvas.width = 505;
                    canvas_1.context = canvas_1.canvas.getContext('2d');
                    canvas_1.document.body.appendChild(canvas_1.canvas);
                    canvas_1.engine = new udacity.ui.engine();
                    canvas_1.engine.onCollision = () => {
                        if (canvas_1.isTouch) {
                            canvas_1.window.navigator.vibrate([500, 300, 100]);
                        }
                        alert('Uuuups!');
                        canvas_1.window.location.reload();
                    };
                    bindControls();
                    postResourceLoad();
                });
            }
            canvas_1.load = load;
            function bindControls() {
                let touchStartX;
                let touchStartY;
                let touchDistanceX;
                let touchDistanceY;
                let touchEllapsedTime;
                let touchStartTime;
                let touchDirection;
                canvas_1.window.addEventListener('touchstart', function touchCheck(e) {
                    touchStartX = e.changedTouches[0].pageX;
                    touchStartY = e.changedTouches[0].pageY;
                    touchStartTime = Date.now();
                    canvas_1.isTouch = true;
                }, false);
                canvas_1.window.addEventListener('touchend', function touchCheck(e) {
                    touchDistanceX = e.changedTouches[0].pageX - touchStartX;
                    touchDistanceY = e.changedTouches[0].pageY - touchStartY;
                    touchEllapsedTime = Date.now() - touchStartTime;
                    if (touchEllapsedTime <= touchStartTime) {
                        if (Math.abs(touchDistanceX) >= 150 && Math.abs(touchDistanceY) <= 100) {
                            touchDirection = touchDistanceX < 0 ? udacity.entities.movementDirection.left : udacity.entities.movementDirection.right;
                        }
                        else if (Math.abs(touchDistanceY) >= 150 && Math.abs(touchDistanceX) <= 100) {
                            touchDirection = touchDistanceX < 0 ? udacity.entities.movementDirection.down : udacity.entities.movementDirection.up;
                        }
                        canvas_1.engine.handleMove(touchDirection);
                    }
                }, false);
                canvas_1.window.addEventListener('touchend', function touchCheck(e) {
                    e.preventDefault();
                }, false);
                canvas_1.window.addEventListener('keyup', (e) => {
                    let direction = udacity.entities.movementDirection[udacity.entities.movementDirection[e.keyCode]];
                    canvas_1.engine.handleMove(direction);
                }, false);
            }
            canvas_1.bindControls = bindControls;
        })(canvas = ui.canvas || (ui.canvas = {}));
    })(ui = udacity.ui || (udacity.ui = {}));
})(udacity || (udacity = {}));
//# sourceMappingURL=canvas.js.map