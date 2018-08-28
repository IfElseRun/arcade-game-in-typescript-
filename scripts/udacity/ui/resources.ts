namespace udacity.ui{
  export interface iResourceMap{
    water?: iResourceAsset,
    stone?: iResourceAsset,
    grass?: iResourceAsset,
    bug?: iResourceAsset,
    girl?: iResourceAsset

  }

  export interface iResourceAsset {
    asset: HTMLImageElement,
    url: string
  }

  export class resources {
    public static water: string = 'images/water-block.png';
    public static stone: string = 'images/stone-block.png';
    public static grass: string = 'images/grass-block.png';
    public static bug: string = 'images/enemy-bug.png';
    public static girl: string = 'images/char-horn-girl.png';

    private static _resources: iResourceMap = {

    };

    /**  Gett all resources
    *@returns iResourceMap
    */
    public static all(): iResourceMap{
      return resources._resources;
    }

    /** Load all resources into cache */
    public static loadAllResources(callback: () => void = () => {}):void {
      this.loadResource('water', resources.water, callback);
      this.loadResource('stone', resources.stone, callback);
      this.loadResource('grass', resources.grass, callback);
      this.loadResource('bug', resources.bug, callback);
      this.loadResource('girl', resources.girl, callback);

    }
    /** Load a resource and cache them
    * @param name Resource name
    * @param url Resource url
    */
    private static loadResource(name: string, url: string, callback: () => void = () => {}): void{
      if(this._resources[name] === undefined || this._resources[name] == null){
        let image: HTMLImageElement = new window.Image();
        let self = this;
        image.onload = function(){
          self._resources[name].asset = image;
          let allLoaded: boolean = true;
          for(let key in self._resources){
            if(self._resources[key].asset === undefined || self._resources[key].asset == null){
              allLoaded = false;
            }
          }
          if(allLoaded){
            callback();
          }
                }
                image.src = url;
                this._resources[name] = {
                  assset: null,
                  url: url
                };

      }
    }

  }
}
