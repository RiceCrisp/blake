import { useEffect, useState, useRef } from 'react'
import { RadioGroup } from '../../components'

export default function Post() {
  const [ms, setMS] = useState(100)
  const [cs, setCS] = useState(10)
  const canvas = useRef(null)

  function refreshMaze() {
    initMaze(canvas.current, ms, cs)
  }

  return (
    <>
      <canvas
        id="maze-canvas"
        ref={ canvas }
        className="bg-black"
      />
      <div className="flex space-x-4 my-lg">
        <RadioGroup
          label="Map Size"
          options={ [
            { label: 'Small', value: 100 },
            { label: 'Medium', value: 200 },
            { label: 'Large', value: 500 }
          ] }
          onChange={ newValue => setMS(newValue) }
          value={ ms }
        />
        <RadioGroup
          label="Cell Size"
          options={ [
            { label: 'Small', value: 10 },
            { label: 'Medium', value: 20 },
            { label: 'Large', value: 50 }
          ] }
          onChange={ newValue => setCS(newValue) }
          value={ cs }
        />
      </div>
      <button
        onClick={ () => refreshMaze() }
        className="bg-gray-light py-sm px-md rounded"
      >
        Create Maze
      </button>
    </>
  )
}

// const c = document.getElementById("maze-canvas");
let ctx;
let width;
let height;
let mapSize;
let cellSize;
let cells = [];
let cellStack = [];
let currentCell;
let visitedCells = 1;
let totalCells;

function initMaze(canvas, ms, cs) {
  ctx = canvas.getContext('2d');
  cellSize = cs;
  mapSize = ms;
  width = mapSize;
  height = mapSize;
  cells = [];
  cellStack = [];
  canvas.width = width;
  canvas.height = height;
  totalCells = (width / cellSize) * (height / cellSize);
  visitedCells = 1;
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      cells[cells.length] = new Cell(x, y, cells.length, cells);
    }
  }
  currentCell = cells[0];

  createMaze(ctx);

  return false;
};


function createMaze() {
  let availableCell;
  currentCell.white();
  if (visitedCells < totalCells) {
    currentCell.visit();
    var neighborArray = currentCell.getNeighbors();
    if (neighborArray.length > 0) {
      var choice = Math.floor(Math.random() * neighborArray.length);
      availableCell = neighborArray[choice];
      breakWall(currentCell, availableCell);
      cellStack.push(currentCell);
      currentCell = availableCell;
      visitedCells++;
    } else {
      currentCell = cellStack.pop();
    }
    currentCell.gray();
    requestAnimationFrame(createMaze);
  } else {
    playMaze(ctx);
  }
}

function playMaze() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(1, 1, cellSize - 2, cellSize - 2);
  ctx.fillStyle = "#f00";
  ctx.fillRect(width - cellSize + 1, height - cellSize + 1, cellSize - 2, cellSize - 2);
}

function breakWall(currentCell, availableCell) {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = cellSize - 2;
  ctx.beginPath();
  ctx.moveTo(currentCell.x + (cellSize / 2), currentCell.y + (cellSize / 2));
  ctx.lineTo(availableCell.x + (cellSize / 2), availableCell.y + (cellSize / 2));
  ctx.stroke();
}

function Cell(x, y, index, cells) {
  this.x = x;
  this.y = y;
  this.index = index;
  this.north = "wall";
  this.west = "wall";
  this.south = "wall";
  this.east = "wall";
  if (this.index < width / cellSize) {
    this.west = "border";
  }
  if (this.index >= totalCells - (width / cellSize)) {
    this.east = "border";
  }
  if (this.index % (width / cellSize) == 0) {
    this.north = "border";
  }
  if ((this.index + 1) % (width / cellSize) == 0) {
    this.south = "border";
  }
  this.visited = false;
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

  this.visit = function() {
    this.visited = true;
  }

  this.gray = function() {
    ctx.fillStyle = "#aaa";
    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
  }

  this.white = function() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
  }

  this.getNeighbors = function() {
    var neighbors = [];
    // Check north
    if (this.north != "border") {
      if (cells[this.index - 1].visited == false) {
        neighbors[neighbors.length] = cells[this.index - 1];
      }
    }
    // Check west
    if (this.west != "border") {
      if (cells[this.index - (width / cellSize)].visited == false) {
        neighbors[neighbors.length] = cells[this.index - (width / cellSize)];
      }
    }
    // Check south
    if (this.south != "border") {
      if (cells[this.index + 1].visited == false) {
        neighbors[neighbors.length] = cells[this.index + 1];
      }
    }
    // Check east
    if (this.east != "border") {
      if (cells[this.index + (width / cellSize)].visited == false) {
        neighbors[neighbors.length] = cells[this.index + (width / cellSize)];
      }
    }

    return neighbors;
  }
}
