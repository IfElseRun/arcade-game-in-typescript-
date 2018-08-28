/// <reference path = "./actor.speed.ts" />
/// <reference path = "./actor.type.ts" />

namespace udacity.entities {
  export class hero extends actor{
    public points: number = 0;
    public lives: number = 3;

    constructor(options: iActorOptions = {}){
      super();

      if(options.resource === undefined || options.resource == null){
        options.resource = udacity.ui.resources.all().girl;
      }
      if(options.speed === undefined || options.speed == null){
        options.speed = iActorSpeed[iActorSpeed.medium.toString()];
      }
      if(options.position !== undefined && options.position != null){
        options.position.moveInterval = 80;
      }

      options.type = iActorType.hero;

      this.construct(options);
    }

    public move(direction: movementDirection, deltaTime?: number): void {
      switch(direction){
        case movementDirection.up:
        this.position.y -= this.position.moveInterval;
        break;
        case movementDirection.right:
        this.position.x += this.position.moveInterval + 20;
        break;
        case movementDirection.down:
        this.position.y += this.position.moveInterval;
        break;
        case movementDirection.left:
        this.position.x -= this.position.moveInterval + 20;
        break;
      }
    }
    public newPosition(direction: movementDirection): position {
      let newPosition = new position (this.position.x, this.position.y);
      switch(direction){
        case movementDirection.up:
        newPosition.y -= this.position.moveInterval;
        break;
        case movementDirection.right:
        newPosition.x += this.position.moveInterval + 20;
        break;
        case movementDirection.down:
        newPosition.y += this.position.moveInterval;
        break;
        case movementDirection.left:
        newPosition.x -= this.position.moveInterval + 20;
        break;
      }
      return newPosition;
    }
  }
}
