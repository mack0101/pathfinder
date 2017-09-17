
class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.mark = 0;
    this.isMouseDown = false;
    this.invertMouse = false;
    this.startPos = [];
    this.endPos = [];
    // setup for pathfinding
    this.activeSet = [];
    this.calculatedSet = [];
  }

  generateMaze() {
    this.mark = 0;
    for (let i = 0; i < this.rows; i++) {
      $('.maze table').append('<tr>');
      for (let j = 0; j < this.rows; j++) {
        $('.maze table tr').last().append(`<td class="cell" id="${i}-${j}">`);
      }
    }
    this.setStartMarker();
  }

  setStartMarker() {
    $('.cell').on('click', (e) => {
      if (this.mark === 0) {
        $(e.target).addClass('origin');
        this.mark += 1;
        this.startPos = e.target.id.split('-')
        console.log('Start Position:', this.startPos);
      }
      this.setEndMarker();
    });
  }

  setEndMarker() {
    $('.cell').on('click', (e) => {
      let c = $(e.target);
      if (this.mark === 1 && !c.hasClass('origin')) {
        c.addClass('destination');
        this.mark += 1;
        this.endPos = e.target.id.split('-')
        console.log('End Position:', this.endPos);
        this.drawBarrier();
      }
    });
  }

  drawBarrier() {

    // global cell mousedown operations
    $('.cell').mousedown( (e) => {
      e.preventDefault();
      let c = $(e.target);

      // set barrier operations
      if (this.mark === 2) {
        if (!c.hasClass('origin') && !c.hasClass('destination') && !c.hasClass('barrier')) {
          this.isMouseDown = true;
          $(e.target).toggleClass('barrier');
        } else if (!c.hasClass('origin') && !c.hasClass('destination') && c.hasClass('barrier')) {
          this.isMouseDown = true;
          this.invertMouse = true;
          $(e.target).removeClass('barrier');
        }
        return false;
      }
    });

    $('.cell').mouseover( (e) => {
      let c = $(e.target);
      if (this.isMouseDown && !this.invertMouse) {
        if (!c.hasClass('destination') && !c.hasClass('origin')) {
          c.addClass('barrier');
        }
      } else if (this.isMouseDown && this.invertMouse) {
        if (!c.hasClass('destination') && !c.hasClass('origin')) {
          c.removeClass('barrier');
        }
      }
    });

  }

  setHover() {
    $('.cell').hover((e) => {
      $(e.target).toggleClass('hoverBorder');
    });
  }

  // get cell information from assigned classes
  getCell(x, y) {

  }

  // set cell information using classes
  setCell(x, y) {

  }

  // div active = "currently in active set"
  // div checked = "currently in calculated set"
  findPath() {
    console.log('findPath() Method');
  }


}

// move parts into class
$(document).ready( function() {
  const maze = new Maze(20, 20);
  maze.generateMaze();

  $(document).mouseup(function() {
    maze.isMouseDown = false;
    maze.invertMouse = false;
  });

  $('#reset').on('click', (e) => {
    $('table').empty();
    maze.generateMaze();
  });

  $('#findPath').on('click', (e) => {
    maze.findPath();
  });
});
