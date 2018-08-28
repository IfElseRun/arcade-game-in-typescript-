/// <reference path = "./actor.speed.ts" />
/// <reference path = "./actor.type.ts" />

namespace udacity.entities {
  export class enemy extends actor {
    constructor(options: iActorOptions = {}){
      super();

      if(options.resource === undefined || options.resource == null){
        options.resource = udacity.ui.resources.all().bug;
      }
      if(options.speed === undefined || options.speed == null){
        options.speed = this.randomSpeed();
      }
      if(options.position !== undefined && options.position != null){
        options.position.moveInterval = 100;
      }

      options.type = iActorType.enemy;
      this.construct(options);
    }

    /**
    *Generate random random speed
    */
    public randomSpeed(): iActorSpeed {
      return iActorSpeed[(Math.floor(Math.random() * 3) + 1).toString()];
    }

    public move(direction: movementDirection, deltaTime?: number): void {
      let speed: number = parseInt(iActorSpeed[this.speed]);
      switch(direction){
        case movementDirection.up:
        this.position.y -= this.position.moveInterval * speed * deltaTime;
        break;
        case movementDirection.right:
        this.position.x += this.position.moveInterval * speed * deltaTime;
        break;
        case movementDirection.down:
        this.position.y += this.position.moveInterval * speed * deltaTime;
        break;
        case movementDirection.left:
        this.position.x -= this.position.moveInterval * speed * deltaTime;
        break;

      }
    }

    public newPosition(direction: movementDirection): position {
      let newPosition = new position (this.position.x, this.position.y);
      let speed: number = parseInt(iActorSpeed[this.speed]);
      switch(direction){
        case movementDirection.up:
        newPosition.y -= this.position.moveInterval  * speed;
        break;
        case movementDirection.right:
        newPosition.x += this.position.moveInterval * speed;
        break;
        case movementDirection.down:
        newPosition.y += this.position.moveInterval * speed;
        break;
        case movementDirection.left:
        newPosition.x -= this.position.moveInterval * speed;
        break;
      }
      return newPosition;
    }

  }
}
