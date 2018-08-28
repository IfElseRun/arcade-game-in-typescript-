/// <reference path = "./position.ts" />

namespace udacity.entities {
  export interface iActorBoundary {
    min: position,
    max: position
  }

  export interface iActorPosition {
    positionBuffer?: number,
    moveInterval?: number,
    boundary?: position,
    basePosition?: position
  }

  export class actorPosition extends position {
    public positionBuffer: number;
    public moveInterval: number;
    public boundary: position;
    public spaceMatrix: Array<number>;

    constructor(options: iActorPosition){
      super();

      if(options.boundary !== undefined){
        this.boundary = options.boundary;
      }
      if(options.moveInterval !== undefined){
        this.moveInterval = options.moveInterval;
      }
      if(options.positionBuffer !== undefined){
        this.positionBuffer = options.positionBuffer;
      }
      if(options.basePosition !== undefined){
        this.x = options.basePosition.x;
        this.y = options.basePosition.y;
      }
    }

    public composeSpaceMatrix(): any {
      this.spaceMatrix = new Array<number>();
      for(let row: number = 0; row <= this.positionBuffer; row++){
        for(let column: number = 0; column <= this.positionBuffer; column++){
          this.spaceMatrix.push(parseFloat((this.y +row).toString() + '.' + (this.x + column).toString()));
        }
      }
      return this.spaceMatrix;
    }

    /**
    *Is actor aout of bounds?
    */
    public isOutOfBounds(direction: movementDirection): boolean{
      let isOutOfBounds = false;
      switch(direction){
        case movementDirection.up:
        isOutOfBounds = this.y - 20 < 0;
        break;
        case movementDirection.right:
        isOutOfBounds = this.x + this.positionBuffer >= this.boundary.x - 80;
        break;
        case movementDirection.down:
        isOutOfBounds = this.y + this.positionBuffer >= this.boundary.y - 150;
        break;
        case movementDirection.left:
        isOutOfBounds = this.x - this.positionBuffer < 0;
        break;
      }
      return isOutOfBounds;
    }

    /**
    * Will the actor be oout of bounds?
    *@param pos New position to move to
    */
    public willBeOutOfBounds(pos: udacity.entities.position): boolean {
      return this.x + pos.x >= this.boundary.x || this.y + pos.y >= this.boundary.y;
    }
  }
}
