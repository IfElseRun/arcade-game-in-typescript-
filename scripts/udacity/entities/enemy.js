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
                    options.position.moveInterval = 150;
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
//# sourceMappingURL=enemy.js.map