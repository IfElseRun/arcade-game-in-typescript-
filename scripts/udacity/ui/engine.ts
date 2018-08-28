/// <reference path = "./image.ts" />
/// <reference path = "./resources.ts" />
/// <reference path = "../entities/position.ts" />
/// <reference path = "../entities/movementDirection.ts" />
/// <reference path = "../entities/actor.position.ts" />
/// <reference path = "../entities/actor.ts" />
/// <reference path = "../entities/enemy.ts" />
/// <reference path = "../entities/hero.ts" />
/// <reference path = "./canvas.ts" />

namespace udacity.ui {
  export class engine{
    public lastTime: number;
    public deltaTime: number;
    public rows: number;
    public columns: number;
    public enemies: Array<udacity.entities.enemy>;
    public hero: udacity.entities.hero;
    public stopGame: boolean = false;

    public onCollision: () => void = () => {};

    public onHeroSuccess: () => void = () => {};

    constructor(){
      this.rows = 6;
      this.columns = 5;
    }

    public init(): void {
      this.load();
      this.run();
    }

    public heroReset(): void{
      this.hero.position.x = 200;
      this.hero.position.y = 380;
    }

    public heroMove(direction: udacity.entities.movementDirection, callback: (success: boolean) => {}){
      if(!this.hero.position.willBeOutOfBounds(this.hero.newPosition(direction))){
        this.hero.move(direction, this.lastTime);
        callback(true);
      } else{
        callback(false);
      }
    }

    public handleMove(direction: udacity.entities.movementDirection): void{
      if(direction == udacity.entities.movementDirection.up && 
        this.hero.position.y - this.hero.position.positionBuffer <= 0){
        this.onHeroSuccess();
        this.renderText();
      } else {
        if(!this.hero.position.isOutOfBounds(direction)){
          this.hero.move(direction);
        }
      }
    }

    private run(): void{
      if(canvas.engine.stopGame){
        return;
      }
      let now:number = Date.now();
      canvas.engine.deltaTime = canvas.engine.lastTime !== undefined ? (now - canvas.engine.lastTime) / 1000.0 : 0,
      canvas.engine.renderCanvas();
      canvas.engine.hero.render(udacity.ui.canvas.context);
      canvas.engine.enemies.forEach(enemy => {
        enemy.move(udacity.entities.movementDirection.right, canvas.engine.deltaTime);
        enemy.render(udacity.ui.canvas.context);
        if(enemy.position.isOutOfBounds(udacity.entities.movementDirection.right)){
          enemy.position.x = 0;
          enemy.speed = enemy.randomSpeed();
        }
        if(canvas.engine.hero.isInCollision(enemy)){
          canvas.engine.onCollision();
          canvas.engine.renderText();
        }
      });
      canvas.engine.lastTime = now;
      canvas.window.requestAnimationFrame(canvas.engine.run);
    }
    private load(): void {
      udacity.ui.resources.loadAllResources();
      this.renderCanvas();
      this.renderEnemies([
        new udacity.entities.position(0,60),
        new udacity.entities.position(0,140),
        new udacity.entities.position(0,220)
      ]);
      this.renderHero(new udacity.entities.position(200,380));
      this.renderText();
    }

    private renderCanvas(): void{
      for(let row: number = 0; row < this.rows; row++){
        for(let col: number = 0; col < this.columns; col++){
          let resource: iResourceAsset = null;
          switch(row){
            case 0:
            resource = udacity.ui.resources.all().water;
            break;
            case 1:
            case 2:
            case 3:
            resource = udacity.ui.resources.all().stone;
            break;
            case 4:
            case 5:
            resource = udacity.ui.resources.all().grass;
            break;
          }
          canvas.context.drawImage(resource.asset, col * 101, row * 83);
        }
      }
    }

    private renderText(){
      canvas.context.font = '20px serif';
      canvas.context.clearRect(0, 0, canvas.canvas.width, 50);
      canvas.context.fillText('You have ' + this.hero.lives.toString() + ' lives left!         You have ' +  this.hero.points.toString() + ' points!', 10, 43);
    }

    private renderEnemies(enemyStartCoordinates: Array<udacity.entities.position> = new Array<udacity.entities.position>()): void{
      this.enemies = new Array<udacity.entities.enemy>();
      let self = this;
      enemyStartCoordinates.forEach(enemyPosition => {
        self.enemies.push(new udacity.entities.enemy({
          position: new udacity.entities.actorPosition({
            basePosition: enemyPosition,
            boundary: new udacity.entities.position(
              canvas.canvas.width,
              canvas.canvas.height
            ),
            positionBuffer: 70
          })
        }));
      });
    }

    private renderHero(position: udacity.entities.position){
      this.hero = new udacity.entities.hero({
        position: new udacity.entities.actorPosition({
          basePosition: position,
          boundary: new udacity.entities.position(
            canvas.canvas.width,
            canvas.canvas.height
          ),
          positionBuffer: 80
        })
      });
    }
  }
}
