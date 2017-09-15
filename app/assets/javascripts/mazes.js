
class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.mark = 0;
    this.isMouseDown = false;
    this.invertMouse = false;
  }

  reset() {
    this.mark = 0;
    setStartMarker();
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
      this.drawBarrier();
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


}

// move parts into class
$(document).ready( function() {
  let maze = new Maze(20, 20);
  maze.generateMaze();
  maze.setStartMarker();

  $(document).mouseup(function() {
    maze.isMouseDown = false;
    maze.invertMouse = false;
  });
});
