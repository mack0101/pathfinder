
class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.mark = 0;
    this.isMouseDown = false;
    this.invertMouse = false;
  }

  generateMaze() {
    for (let i = 0; i < this.rows; i++) {
      $('.maze table').append('<tr>');
      for (let j = 0; j < this.rows; j++) {
        $('.maze table tr').last().append(`<td class="cell" id="${i}-${j}">`);
      }
    }
  }

  setStartMarker() {
    $('.cell').on('click', (e) => {
      console.log(this.mark);
      console.log(this);
      if (this.mark === 0) {
        $(e.target).addClass('origin');
        this.mark += 1;
      }
      this.setEndMarker();
    });
  }

  setEndMarker() {
    $('.cell').on('click', (e) => {
      if (this.mark === 1) {
        $(e.target).addClass('destination');
        this.mark += 1;
      }
      //this.drawBarrier();
    });
  }

  drawBarrier() {

  }

  setHover() {
    $('.cell').hover((e) => {
      $(e.target).toggleClass('hoverBorder');
    });
  }


}

// move parts into class
$(document).ready( function() {
  let maze = new Maze(20, 20);
  maze.generateMaze();
  maze.setStartMarker();

  // global cell mousedown operations
  $('.cell').mousedown((e) => {
    e.preventDefault();
    c = $(e.target);

    // set barrier operations
    if (maze.mark === 2) {
      if (!c.hasClass('origin') && !c.hasClass('destination') && !c.hasClass('barrier')) {
        maze.isMouseDown = true;
        $(e.target).toggleClass('barrier');
      } else if (!c.hasClass('origin') && !c.hasClass('destination') && c.hasClass('barrier')) {
        maze.isMouseDown = true;
        maze.invertMouse = true;
        $(e.target).removeClass('barrier');
      }
      return false;
    }
  });

  $('.cell').mouseover((e) => {
    console.log(maze.invertMouse);
    c = $(e.target);
    if (maze.isMouseDown && !maze.invertMouse) {
      if (!c.hasClass('destination') && !c.hasClass('origin')) {
        c.addClass('barrier');
      }
    } else if (maze.isMouseDown && maze.invertMouse) {
      if (!c.hasClass('destination') && !c.hasClass('origin')) {
        c.removeClass('barrier');
      }
    }
  });

  $(document).mouseup(function() {
    maze.isMouseDown = false;
    maze.invertMouse = false;
  });
});
