class Game {
  private _grid: Grid;
  private _canvas: fabric.ICanvas;

  constructor(canvas: fabric.ICanvas) {
    this._canvas = canvas;
    this._canvas.selection = false;

    let resizeCanvas = () => {
      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);
      canvas.renderAll();
    };

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
  }

  public run():void {
    this._grid = new Grid(15, 0.2, this._canvas);
    setInterval(() => this._grid.step(), 200);
  }
}

var game = new Game(new fabric.Canvas('my-canvas'));
game.run();
