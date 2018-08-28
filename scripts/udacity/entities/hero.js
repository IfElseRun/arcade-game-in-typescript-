var udacity;
(function (udacity) {
    var entities;
    (function (entities) {
        class hero extends entities.actor {
            constructor(options = {}) {
                super();
                this.points = 0;
                this.live = 0;
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
//# sourceMappingURL=hero.js.map