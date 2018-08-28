var udacity;
(function (udacity) {
    var ui;
    (function (ui) {
        class engine {
            constructor() {
                this.onCollision = () => { };
                this.rows = 6;
                this.columns = 5;
            }
            init() {
                this.load();
                this.run();
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
                if (!this.hero.position.isOutOfBounds()) {
                    this.hero.move(direction);
                }
            }
            run() {
                let now = Date.now();
                ui.canvas.engine.deltaTime = ui.canvas.engine.lastTime !== undefined ? (now - ui.canvas.engine.lastTime) / 1000.0 : 0,
                    ui.canvas.engine.renderCanvas();
                ui.canvas.engine.hero.render(udacity.ui.canvas.context);
                ui.canvas.engine.enemies.forEach(enemy => {
                    enemy.move(udacity.entities.movementDirection.right, ui.canvas.engine.deltaTime);
                    enemy.render(udacity.ui.canvas.context);
                    if (enemy.position.isOutOfBounds()) {
                        enemy.position.x = 0;
                        enemy.speed = enemy.randomSpeed();
                    }
                    if (ui.canvas.engine.hero.isInCollision(enemy)) {
                        ui.canvas.engine.onCollision();
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
                        boundary: new udacity.entities.position(ui.canvas.canvas.width, ui.canvas.canvas.height),
                        positionBuffer: 60
                    })
                });
            }
        }
        ui.engine = engine;
    })(ui = udacity.ui || (udacity.ui = {}));
})(udacity || (udacity = {}));
//# sourceMappingURL=engine.js.map