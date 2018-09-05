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
      return this.position.inCollision(other.position) || other.position.inCollision(this.position);
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
