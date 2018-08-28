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
                this.position.composeSpaceMatrix();
                other.position.composeSpaceMatrix();
                let result = false;
                for (let key in this.position.spaceMatrix) {
                    if (other.position.spaceMatrix[key] !== undefined) {
                        result = true;
                        break;
                    }
                }
                return result;
            }
            ;
            render(context) {
                context.drawImage(this.resource.asset, this.position.x, this.position.y);
            }
        }
        entities.actor = actor;
    })(entities = udacity.entities || (udacity.entities = {}));
})(udacity || (udacity = {}));
//# sourceMappingURL=actor.js.map