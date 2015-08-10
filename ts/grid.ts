class Grid {
  private _cells:Cell[][];
  private _newCells:boolean[][];
  private _canvas:fabric.ICanvas;

  constructor(rows:number, p:number, canvas:fabric.ICanvas) {
    this._canvas = canvas;
    this._cells = [];
    this._newCells = [];
    let size = canvas.getHeight() / rows;
    let cols = canvas.getWidth() / size;
    for (let r = 0; r < rows; r++) {
      let row = [];
      let newRow = [];
      for (let c = 0; c < cols; c++) {
        let rect = new fabric.Rect({
          left: size * c,
          top: size * r,
          stroke: 'gray',
          width: size,
          height: size
        });
        row.push(new Cell(canvas, rect, Math.random() < p));
        newRow.push(false);
      }
      this._cells.push(row);
      this._newCells.push(newRow);
    }
    this._canvas.renderAll();
  };

  public step() {
    for (let r = 0; r < this.numRows; r++) {
      let row:boolean[] = [];
      for (let c = 0; c < this.numCols; c++) {
        let n = this.numNeighbors(r, c);
        let cell = this._cells[r][c];
        console.log(r, c, n);
        if (cell.live && (n < 2 || n > 3)) {
          this._newCells[r][c] = false;
        } else if (!cell.live && n === 3) {
          this._newCells[r][c] = true;
        } else {
          this._newCells[r][c] = cell.live;
        }
      }
    }

    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        this._cells[r][c].live = this._newCells[r][c];
      }
    }

    this._canvas.renderAll();
  }

  get numRows() {
    return this._cells.length;
  }

  get numCols() {
    return this._cells[0].length;
  }

  private isLive(r:number, c:number):boolean {
    return r >= 0 && c >= 0 && r < this.numRows && c < this.numCols && this._cells[r][c].live;
  };

  private numNeighbors(r:number, c:number) {
    let result = 0;
    if (this.isLive(r - 1, c - 1)) result++;
    if (this.isLive(r - 1, c)) result++;
    if (this.isLive(r - 1, c + 1)) result++;
    if (this.isLive(r, c - 1)) result++;
    if (this.isLive(r, c + 1)) result++;
    if (this.isLive(r + 1, c - 1)) result++;
    if (this.isLive(r + 1, c)) result++;
    if (this.isLive(r + 1, c + 1)) result++;
    return result;
  }
}
