console.log('mazes');

class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
  }

  generateMaze() {
    for (let i = 0; i < this.rows; i++) {
      $('.maze table').append('<tr>');
      for (let j = 0; j < this.rows; j++) {
        $('.maze table tr').last().append(`<td>`);
      }
    }
  }
}


$(document).ready( function() {
  let maze = new Maze(20, 20);
  maze.generateMaze();
});
