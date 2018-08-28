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
                this.spaceMatrix = {};
                for (let row = 0; row <= this.positionBuffer; row++) {
                    for (let column = 0; column <= this.positionBuffer; column++) {
                        this.spaceMatrix[(this.y + row).toString() + ',' + (this.x + column).toString()] = true;
                    }
                }
                return this.spaceMatrix;
            }
            isOutOfBounds() {
                return this.x < 0 ||
                    this.x + this.positionBuffer >= this.boundary.x ||
                    this.y + this.positionBuffer >= this.boundary.y;
            }
            willBeOutOfBounds(pos) {
                return this.x + pos.x >= this.boundary.x || this.y + pos.y >= this.boundary.y;
            }
        }
        entities.actorPosition = actorPosition;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
//# sourceMappingURL=actor.position.js.map