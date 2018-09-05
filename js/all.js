var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        let movementDirection;
        (function (movementDirection) {
            movementDirection[movementDirection["up"] = 38] = "up";
            movementDirection[movementDirection["right"] = 39] = "right";
            movementDirection[movementDirection["down"] = 40] = "down";
            movementDirection[movementDirection["left"] = 37] = "left";
        })(movementDirection = entities.movementDirection || (entities.movementDirection = {}));
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
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
                        canvas_1.engine.heroReset();
                        canvas_1.engine.hero.lives--;
                        if (canvas_1.engine.hero.lives == 0) {
                            canvas_1.engine.stopGame = !confirm('You have no more lives left! Play again?');
                            canvas_1.engine.init();
                        }
                    };
                    canvas_1.engine.onHeroSuccess = () => {
                        canvas_1.engine.heroReset();
                        canvas_1.engine.stopGame = !confirm('Congratulations you won the game! Play again?');
                        canvas_1.engine.init();
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
var udacity;
(function (udacity) {
    var ui;
    (function (ui) {
        class resources {
            static all() {
                return resources._resources;
            }
            static loadAllResources(callback = () => { }) {
                this.loadResource('water', resources.water, callback);
                this.loadResource('stone', resources.stone, callback);
                this.loadResource('grass', resources.grass, callback);
                this.loadResource('bug', resources.bug, callback);
                this.loadResource('girl', resources.girl, callback);
            }
            static loadResource(name, url, callback = () => { }) {
                if (this._resources[name] === undefined || this._resources[name] == null) {
                    let image = new window.Image();
                    let self = this;
                    image.onload = function () {
                        self._resources[name].asset = image;
                        let allLoaded = true;
                        for (let key in self._resources) {
                            if (self._resources[key].asset === undefined || self._resources[key].asset == null) {
                                allLoaded = false;
                            }
                        }
                        if (allLoaded) {
                            callback();
                        }
                    };
                    image.src = url;
                    this._resources[name] = {
                        assset: null,
                        url: url
                    };
                }
            }
        }
        resources.water = 'images/water-block.png';
        resources.stone = 'images/stone-block.png';
        resources.grass = 'images/grass-block.png';
        resources.bug = 'images/enemy-bug.png';
        resources.girl = 'images/char-horn-girl.png';
        resources._resources = {};
        ui.resources = resources;
    })(ui = udacity.ui || (udacity.ui = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class position {
            constructor(x = 0, y = 0) {
                this.x = 0;
                this.y = 0;
                this.x = x;
                this.y = y;
            }
        }
        entities.position = position;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class actorPosition extends entities.position {
            constructor(options) {
                super();
                if (options.boundary !== undefined) {
                    this.boundary = options.boundary;
                }
                if (options.moveInterval !== undefined) {
                    this.moveInterval = options.moveInterval;
                }
                if (options.positionBuffer !== undefined) {
                    this.positionBuffer = options.positionBuffer;
                }
                if (options.basePosition !== undefined) {
                    this.x = options.basePosition.x;
                    this.y = options.basePosition.y;
                }
            }
            composeSpaceMatrix() {
                this.spaceMatrix = new Array();
                for (let row = 0; row <= this.positionBuffer; row++) {
                    for (let column = 0; column <= this.positionBuffer; column++) {
                        this.spaceMatrix.push(parseFloat((this.y + row).toString() + '.' + (this.x + column).toString()));
                    }
                }
                return this.spaceMatrix;
            }
            isOutOfBounds(direction) {
                let isOutOfBounds = false;
                switch (direction) {
                    case entities.movementDirection.up:
                        isOutOfBounds = this.y - 20 < 0;
                        break;
                    case entities.movementDirection.right:
                        isOutOfBounds = this.x + this.positionBuffer >= this.boundary.x - 80;
                        break;
                    case entities.movementDirection.down:
                        isOutOfBounds = this.y + this.positionBuffer >= this.boundary.y - 150;
                        break;
                    case entities.movementDirection.left:
                        isOutOfBounds = this.x - this.positionBuffer < 0;
                        break;
                }
                return isOutOfBounds;
            }
            willBeOutOfBounds(pos) {
                return this.x + pos.x >= this.boundary.x || this.y + pos.y >= this.boundary.y;
            }
            topLeft() {
                return this;
            }
            topRight() {
                return new entities.position(this.x + this.positionBuffer, this.y);
            }
            bottomLeft() {
                return new entities.position(this.x, this.y + this.positionBuffer);
            }
            bottomRight() {
                return new entities.position(this.x + this.positionBuffer, this.y + this.positionBuffer);
            }
            inCollision(other) {
                return ((this.topLeft().x < other.topLeft().x &&
                    this.topLeft().y < other.topLeft().y
                    &&
                        this.bottomRight().x > other.topLeft().x &&
                    this.bottomRight().y > other.topLeft().y) || (this.topRight().x > other.topRight().x &&
                    this.topRight().y < other.topRight().y
                    &&
                        this.bottomLeft().x < other.topRight().x &&
                    this.bottomLeft().y > other.topRight().y) || (this.bottomLeft().x < other.bottomLeft().x &&
                    this.bottomLeft().y > other.bottomLeft().y
                    &&
                        this.topRight().x > other.bottomLeft().x &&
                    this.topRight().y < other.bottomLeft().y) || (this.bottomRight().x > other.bottomRight().x &&
                    this.bottomRight().y > other.bottomRight().y
                    &&
                        this.topLeft().x < other.bottomRight().x &&
                    this.topLeft().y < other.bottomRight().y));
            }
        }
        entities.actorPosition = actorPosition;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class actor {
            constructor() {
                this.position = null;
            }
            construct(options = {}) {
                if (options.resource === undefined || options.resource == null) {
                    throw new Error("The options.resource parametar is required!");
                }
                if (options.type === undefined || options.type == null) {
                    throw new Error("The options.type parametar is required!");
                }
                if (options.speed === undefined || options.speed == null) {
                    throw new Error("The options.speed parametar is required!");
                }
                this.type = options.type;
                this.resource = options.resource;
                this.speed = options.speed;
                this.position = new entities.actorPosition({
                    moveInterval: options.position.moveInterval,
                    boundary: options.position.boundary,
                    positionBuffer: options.position.positionBuffer,
                    basePosition: options.position
                });
            }
            isInCollision(other) {
                return this.position.inCollision(other.position) || other.position.inCollision(this.position);
            }
            ;
            render(context) {
                context.drawImage(this.resource.asset, this.position.x, this.position.y);
            }
        }
        entities.actor = actor;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        let iActorSpeed;
        (function (iActorSpeed) {
            iActorSpeed[iActorSpeed["slow"] = 1] = "slow";
            iActorSpeed[iActorSpeed["medium"] = 2] = "medium";
            iActorSpeed[iActorSpeed["fast"] = 3] = "fast";
        })(iActorSpeed = entities.iActorSpeed || (entities.iActorSpeed = {}));
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        let iActorType;
        (function (iActorType) {
            iActorType[iActorType["enemy"] = 1] = "enemy";
            iActorType[iActorType["hero"] = 2] = "hero";
        })(iActorType = entities.iActorType || (entities.iActorType = {}));
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class enemy extends entities.actor {
            constructor(options = {}) {
                super();
                if (options.resource === undefined || options.resource == null) {
                    options.resource = udacity.ui.resources.all().bug;
                }
                if (options.speed === undefined || options.speed == null) {
                    options.speed = this.randomSpeed();
                }
                if (options.position !== undefined && options.position != null) {
                    options.position.moveInterval = 100;
                }
                options.type = entities.iActorType.enemy;
                this.construct(options);
            }
            randomSpeed() {
                return entities.iActorSpeed[(Math.floor(Math.random() * 3) + 1).toString()];
            }
            move(direction, deltaTime) {
                let speed = parseInt(entities.iActorSpeed[this.speed]);
                switch (direction) {
                    case entities.movementDirection.up:
                        this.position.y -= this.position.moveInterval * speed * deltaTime;
                        break;
                    case entities.movementDirection.right:
                        this.position.x += this.position.moveInterval * speed * deltaTime;
                        break;
                    case entities.movementDirection.down:
                        this.position.y += this.position.moveInterval * speed * deltaTime;
                        break;
                    case entities.movementDirection.left:
                        this.position.x -= this.position.moveInterval * speed * deltaTime;
                        break;
                }
            }
            newPosition(direction) {
                let newPosition = new entities.position(this.position.x, this.position.y);
                let speed = parseInt(entities.iActorSpeed[this.speed]);
                switch (direction) {
                    case entities.movementDirection.up:
                        newPosition.y -= this.position.moveInterval * speed;
                        break;
                    case entities.movementDirection.right:
                        newPosition.x += this.position.moveInterval * speed;
                        break;
                    case entities.movementDirection.down:
                        newPosition.y += this.position.moveInterval * speed;
                        break;
                    case entities.movementDirection.left:
                        newPosition.x -= this.position.moveInterval * speed;
                        break;
                }
                return newPosition;
            }
        }
        entities.enemy = enemy;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class hero extends entities.actor {
            constructor(options = {}) {
                super();
                this.points = 0;
                this.lives = 3;
                if (options.resource === undefined || options.resource == null) {
                    options.resource = udacity.ui.resources.all().girl;
                }
                if (options.speed === undefined || options.speed == null) {
                    options.speed = entities.iActorSpeed[entities.iActorSpeed.medium.toString()];
                }
                if (options.position !== undefined && options.position != null) {
                    options.position.moveInterval = 80;
                }
                options.type = entities.iActorType.hero;
                this.construct(options);
            }
            move(direction, deltaTime) {
                switch (direction) {
                    case entities.movementDirection.up:
                        this.position.y -= this.position.moveInterval;
                        break;
                    case entities.movementDirection.right:
                        this.position.x += this.position.moveInterval + 20;
                        break;
                    case entities.movementDirection.down:
                        this.position.y += this.position.moveInterval;
                        break;
                    case entities.movementDirection.left:
                        this.position.x -= this.position.moveInterval + 20;
                        break;
                }
            }
            newPosition(direction) {
                let newPosition = new entities.position(this.position.x, this.position.y);
                switch (direction) {
                    case entities.movementDirection.up:
                        newPosition.y -= this.position.moveInterval;
                        break;
                    case entities.movementDirection.right:
                        newPosition.x += this.position.moveInterval + 20;
                        break;
                    case entities.movementDirection.down:
                        newPosition.y += this.position.moveInterval;
                        break;
                    case entities.movementDirection.left:
                        newPosition.x -= this.position.moveInterval + 20;
                        break;
                }
                return newPosition;
            }
        }
        entities.hero = hero;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
var udacity;
(function (udacity) {
    var ui;
    (function (ui) {
        class engine {
            constructor() {
                this.stopGame = false;
                this.onCollision = () => { };
                this.onHeroSuccess = () => { };
                this.rows = 6;
                this.columns = 5;
            }
            init() {
                this.load();
                this.run();
            }
            heroReset() {
                this.hero.position.x = 200;
                this.hero.position.y = 380;
            }
            heroMove(direction, callback) {
                if (!this.hero.position.willBeOutOfBounds(this.hero.newPosition(direction))) {
                    this.hero.move(direction, this.lastTime);
                    callback(true);
                }
                else {
                    callback(false);
                }
            }
            handleMove(direction) {
                if (direction == udacity.entities.movementDirection.up &&
                    this.hero.position.y - this.hero.position.positionBuffer <= 0) {
                    this.onHeroSuccess();
                    this.renderText();
                }
                else {
                    if (!this.hero.position.isOutOfBounds(direction)) {
                        this.hero.move(direction);
                    }
                }
            }
            run() {
                if (ui.canvas.engine.stopGame) {
                    return;
                }
                let now = Date.now();
                ui.canvas.engine.deltaTime = ui.canvas.engine.lastTime !== undefined ? (now - ui.canvas.engine.lastTime) / 1000.0 : 0,
                    ui.canvas.engine.renderCanvas();
                ui.canvas.engine.hero.render(udacity.ui.canvas.context);
                ui.canvas.engine.enemies.forEach(enemy => {
                    enemy.move(udacity.entities.movementDirection.right, ui.canvas.engine.deltaTime);
                    enemy.render(udacity.ui.canvas.context);
                    if (enemy.position.isOutOfBounds(udacity.entities.movementDirection.right)) {
                        enemy.position.x = 0;
                        enemy.speed = enemy.randomSpeed();
                    }
                    if (ui.canvas.engine.hero.isInCollision(enemy)) {
                        ui.canvas.engine.onCollision();
                        ui.canvas.engine.renderText();
                    }
                });
                ui.canvas.engine.lastTime = now;
                ui.canvas.window.requestAnimationFrame(ui.canvas.engine.run);
            }
            load() {
                udacity.ui.resources.loadAllResources();
                this.renderCanvas();
                this.renderEnemies([
                    new udacity.entities.position(0, 60),
                    new udacity.entities.position(0, 140),
                    new udacity.entities.position(0, 220)
                ]);
                this.renderHero(new udacity.entities.position(200, 380));
                this.renderText();
            }
            renderCanvas() {
                for (let row = 0; row < this.rows; row++) {
                    for (let col = 0; col < this.columns; col++) {
                        let resource = null;
                        switch (row) {
                            case 0:
                                resource = udacity.ui.resources.all().water;
                                break;
                            case 1:
                            case 2:
                            case 3:
                                resource = udacity.ui.resources.all().stone;
                                break;
                            case 4:
                            case 5:
                                resource = udacity.ui.resources.all().grass;
                                break;
                        }
                        ui.canvas.context.drawImage(resource.asset, col * 101, row * 83);
                    }
                }
            }
            renderText() {
                ui.canvas.context.font = '20px serif';
                ui.canvas.context.clearRect(0, 0, ui.canvas.canvas.width, 50);
                ui.canvas.context.fillText('You have ' + this.hero.lives.toString() + ' lives left! ' , 10, 43);
            }
            renderEnemies(enemyStartCoordinates = new Array()) {
                this.enemies = new Array();
                let self = this;
                enemyStartCoordinates.forEach(enemyPosition => {
                    self.enemies.push(new udacity.entities.enemy({
                        position: new udacity.entities.actorPosition({
                            basePosition: enemyPosition,
                            boundary: new udacity.entities.position(ui.canvas.canvas.width, ui.canvas.canvas.height),
                            positionBuffer: 60
                        })
                    }));
                });
            }
            renderHero(position) {
                this.hero = new udacity.entities.hero({
                    position: new udacity.entities.actorPosition({
                        basePosition: position,
                        boundary: new udacity.entities.position(ui.canvas.canvas.width, ui.canvas.canvas.height - 20),
                        positionBuffer: 65
                    })
                });
            }
        }
        ui.engine = engine;
    })(ui = udacity.ui || (udacity.ui = {}));
})(udacity || (udacity = {}));
udacity.ui.canvas.load(this, () => {
    udacity.ui.canvas.engine.init();
});
//# sourceMappingURL=all.js.map