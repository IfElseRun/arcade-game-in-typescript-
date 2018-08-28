namespace udacity.entities{
  export interface iActorOptions{
    type?: iActorType,
    resource?: udacity.ui.iResourceAsset,
    position?: actorPosition,
    speed?: iActorSpeed
  }

  export abstract class actor{
    public type: iActorType;
    public resource: udacity.ui.iResourceAsset;
    public position: actorPosition = null;
    public speed: iActorSpeed;

    protected construct(options: iActorOptions = {}): void {
      if(options.resource === undefined || options.resource == null){
        throw new Error("The options.resource parametar is required!");
      }

      if(options.type === undefined || options.type == null){
        throw new Error("The options.type parametar is required!");
      }

      if(options.speed === undefined || options.speed == null){
        throw new Error("The options.speed parametar is required!");
      }

      this.type = options.type;
      this.resource = options.resource;
      this.speed = options.speed;
      this.position = new actorPosition ({
        moveInterval: options.position.moveInterval,
        boundary: options.position.boundary,
        positionBuffer: options.position.positionBuffer,
        basePosition: options.position
      });
    }

    /**
    * Determine wether this and actor supplied are in collision
    *@param other Other actor to compare position
    */
    public isInCollision(other: actor): boolean {
      this.position.composeSpaceMatrix()
      other.position.composeSpaceMatrix()
      let result: boolean = false;
      let current: number = 0;
      let min: number = 0;
      let max: number = other.position.spaceMatrix.length - 1;
      for(var i = 0; i < this.position.spaceMatrix.length && !result; i++){
        let thisCurrent: number = this.position.spaceMatrix[i];
        while(current <= max){
          current = (min + max) / 2;
          if(current < 0){
            current = 0;
          }
          if(other.position.spaceMatrix[current] < thisCurrent) {
            min = current + 1;
          } else if(other.position.spaceMatrix[current] > thisCurrent) {
            max = current - 1;
          } else {
            result = true;
            break;
          }
        }
      }
      return result;
    };

    /**
    * Move the actor
    * @param direction Direction to move in
    */
    public abstract move(direction: movementDirection, deltaTime?: number): void;

    /**
    *Get the new position of the actor before the move is commited
    * @param direction Direction to move in
    * @return position
    */
    public abstract newPosition(direction: movementDirection): position;

    /** Render the actor
    * @param context - Canvas rendering context
    */
    public render (context: CanvasRenderingContext2D): void{
      context.drawImage(this.resource.asset, this.position.x, this.position.y);
    }
  }
}
