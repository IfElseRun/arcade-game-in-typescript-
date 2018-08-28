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
//# sourceMappingURL=actor.speed.js.map