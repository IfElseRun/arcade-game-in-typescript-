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
//# sourceMappingURL=resources.js.map