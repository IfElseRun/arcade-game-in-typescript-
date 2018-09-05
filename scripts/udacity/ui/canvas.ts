/// <reference path = "../entities/movementDirection.ts"/>

namespace udacity.ui.canvas {
  export let document: HTMLDocument;
  export let window: Window;
  export let canvas: HTMLCanvasElement;
  export let context: CanvasRenderingContext2D;
  export let engine: udacity.ui.engine;
  export let isTouch: boolean = false;

  export function load(global: any, postResourceLoad: () => void = () => {}):void{
      resources.loadAllResources(() => {
      document = global.document;
      window = global.window;
      canvas = document.createElement('canvas');
      canvas.height = 606;
      canvas.width = 505;
      context = canvas.getContext('2d');
      document.body.appendChild(canvas);
      engine = new udacity.ui.engine();

      engine.onCollision = () => {
        if(isTouch){
          window.navigator.vibrate([500, 300, 100]);
        }
        engine.heroReset();

        engine.hero.lives--;
        if(engine.hero.lives == 0){
          engine.stopGame = !confirm('You have no more lives left! Play again?');
          engine.init();
        }
      };

      engine.onHeroSuccess = () => {
        engine.heroReset();
        engine.stopGame = !confirm('Congratulations you won the game! Play again?');
        engine.init();
      }

      bindControls();
      postResourceLoad();
    });
}

  export function bindControls(): void {
    let touchStartX : number;
    let touchStartY: number;
    let touchDistanceX: number;
    let touchDistanceY: number;
    let touchEllapsedTime: number;
    let touchStartTime: number;
    let touchDirection: udacity.entities.movementDirection;

    window.addEventListener('touchstart', function touchCheck(e) {
      touchStartX = e.changedTouches[0].pageX;
      touchStartY = e.changedTouches[0].pageY;
      touchStartTime = Date.now();
      isTouch = true;
    }, false);

    window.addEventListener('touchend', function touchCheck(e){
      touchDistanceX = e.changedTouches[0].pageX - touchStartX;
      touchDistanceY = e.changedTouches[0].pageY - touchStartY;
      touchEllapsedTime = Date.now() - touchStartTime;
      if(touchEllapsedTime <= touchStartTime){
        if(Math.abs(touchDistanceX) >= 150 && Math.abs(touchDistanceY) <= 100){
          touchDirection = touchDistanceX < 0 ? udacity.entities.movementDirection.left : udacity.entities.movementDirection.right;
        } else if(Math.abs(touchDistanceY) >= 150 && Math.abs(touchDistanceX) <= 100){

          touchDirection = touchDistanceX < 0 ? udacity.entities.movementDirection.down : udacity.entities.movementDirection.up;
        }
        engine.handleMove(touchDirection);
      }
    }, false);

    window.addEventListener('touchend', function touchCheck(e){
      e.preventDefault();
    }, false);

    window.addEventListener('keyup', (e) => {
      let direction = udacity.entities.movementDirection[udacity.entities.movementDirection[e.keyCode]];
      engine.handleMove(direction);
    }, false);

  }
}
