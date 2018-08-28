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
//# sourceMappingURL=movementDirection.js.map