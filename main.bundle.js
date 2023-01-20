/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Components/App.css":
/*!********************************!*\
  !*** ./src/Components/App.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Components/MazeDisplay.css":
/*!****************************************!*\
  !*** ./src/Components/MazeDisplay.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Algorithms/Kruskal.ts":
/*!***********************************!*\
  !*** ./src/Algorithms/Kruskal.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Kruskal": () => (/* binding */ Kruskal)
/* harmony export */ });
/* harmony import */ var _Maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Algorithms/Utils.ts");


const SELECTED_COLOR = "#1682f4";
const VISITED_COLOR = "#f5c016";
class Kruskal extends _Maze__WEBPACK_IMPORTED_MODULE_0__.MazeAlgorithm {
    constructor(maze) {
        super(maze);
        this.stepCount = 0;
        this.edges = maze.allEdges();
        (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.shuffle)(this.edges);
        this.unionFind = new _Utils__WEBPACK_IMPORTED_MODULE_1__.UnionFind(maze.allPositions());
    }
    step() {
        if (this.stepCount % 2 == 0) {
            this.currentEdge = this.edges.pop();
            if (this.currentEdge !== undefined) {
                const [p1, p2] = this.currentEdge;
                this.maze.setColor(p1, SELECTED_COLOR);
                this.maze.setColor(p2, SELECTED_COLOR);
            }
            else {
                this.finished = true;
            }
        }
        else {
            const [p1, p2] = this.currentEdge;
            if (!this.unionFind.connected(p1, p2)) {
                this.maze.connectCells(p1, p2);
                this.unionFind.union(p1, p2);
            }
            this.maze.setColor(p1, VISITED_COLOR);
            this.maze.setColor(p2, VISITED_COLOR);
        }
        this.stepCount++;
    }
}


/***/ }),

/***/ "./src/Algorithms/Maze.ts":
/*!********************************!*\
  !*** ./src/Algorithms/Maze.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_POSITION_COLOR": () => (/* binding */ EMPTY_POSITION_COLOR),
/* harmony export */   "Maze": () => (/* binding */ Maze),
/* harmony export */   "MazeAlgorithm": () => (/* binding */ MazeAlgorithm),
/* harmony export */   "Position": () => (/* binding */ Position)
/* harmony export */ });
const EMPTY_POSITION_COLOR = "rgba(255, 255, 255, 0.8)";
class Position {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    move(direction) {
        switch (direction) {
            case "north":
                return new Position(this.X, this.Y + 1);
            case "south":
                return new Position(this.X, this.Y - 1);
            case "west":
                return new Position(this.X - 1, this.Y);
            case "east":
                return new Position(this.X + 1, this.Y);
        }
    }
    equals(other) {
        return this.X == other.X && this.Y == other.Y;
    }
}
class Maze {
    constructor(cols, rows) {
        this.cells = [];
        for (let x = 0; x < cols; x++) {
            let column = [];
            for (let y = 0; y < rows; y++) {
                column.push({
                    northOpen: false,
                    westOpen: false,
                    color: EMPTY_POSITION_COLOR
                });
            }
            this.cells.push(column);
        }
    }
    nColumns() {
        return this.cells.length;
    }
    nRows() {
        return this.cells[0].length;
    }
    getNeighborDirections(pos) {
        const result = [];
        if (pos.X > 0) {
            result.push("west");
        }
        if (pos.X < this.nColumns() - 1) {
            result.push("east");
        }
        if (pos.Y > 0) {
            result.push("south");
        }
        if (pos.Y < this.nRows() - 1) {
            result.push("north");
        }
        return result;
    }
    getNeighbors(pos) {
        const directions = this.getNeighborDirections(pos);
        return directions.map(direction => pos.move(direction));
    }
    get({ X, Y }) {
        return this.cells[X][Y];
    }
    connectCells(cell1, cell2) {
        if (cell1.Y < cell2.Y) {
            this.get(cell1).northOpen = true;
        }
        else if (cell1.Y > cell2.Y) {
            this.get(cell2).northOpen = true;
        }
        else if (cell1.X < cell2.X) {
            this.get(cell2).westOpen = true;
        }
        else if (cell1.X > cell2.X) {
            this.get(cell1).westOpen = true;
        }
    }
    setOpen(location, direction, isOpen) {
        switch (direction) {
            case "north":
                this.get(location).northOpen = isOpen;
                return;
            case "south":
                this.get(location.move("south")).northOpen = isOpen;
                return;
            case "west":
                this.get(location).westOpen = isOpen;
                return;
            case "east":
                this.get(location.move("east")).westOpen = isOpen;
                return;
        }
    }
    isOpen(location, direction) {
        switch (direction) {
            case "north":
                return this.get(location).northOpen;
            case "south":
                return this.get(location.move("south")).northOpen;
            case "west":
                return this.get(location).westOpen;
            case "east":
                return this.get(location.move("east")).westOpen;
        }
    }
    setColor(location, color) {
        this.get(location).color = color;
    }
    getColor(location) {
        return this.get(location).color;
    }
    allPositions() {
        const cols = this.nColumns();
        const rows = this.nRows();
        const result = [];
        for (let X = 0; X < cols; X++) {
            for (let Y = 0; Y < rows; Y++) {
                result.push(new Position(X, Y));
            }
        }
        return result;
    }
    allEdges() {
        return this.allPositions().flatMap(p => this.getNeighborDirections(p)
            .filter(d => d == "north" || d == "west")
            .map(d => [p, p.move(d)]));
    }
}
class MazeAlgorithm {
    constructor(maze) {
        this.finished = false;
        this.maze = maze;
    }
    isFinished() {
        return this.finished;
    }
}


/***/ }),

/***/ "./src/Algorithms/RecursiveBacktracker.ts":
/*!************************************************!*\
  !*** ./src/Algorithms/RecursiveBacktracker.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecursiveBacktracker": () => (/* binding */ RecursiveBacktracker)
/* harmony export */ });
/* harmony import */ var _Maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Algorithms/Utils.ts");


const STACK_COLOR = "#1682f4";
const VISITED_COLOR = "#f5c016";
class RecursiveBacktracker extends _Maze__WEBPACK_IMPORTED_MODULE_0__.MazeAlgorithm {
    push(pos) {
        this.stack.push(pos);
    }
    peek() {
        return this.stack[this.stack.length - 1];
    }
    pop() {
        return this.stack.pop();
    }
    constructor(maze) {
        super(maze);
        this.stack = [];
        this.visited = new _Utils__WEBPACK_IMPORTED_MODULE_1__.CustomSet();
        const firstPos = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(maze.allPositions());
        maze.setColor(firstPos, STACK_COLOR);
        this.push(firstPos);
        this.visited.add(firstPos);
    }
    step() {
        if (this.stack.length != 0) {
            const current = this.peek();
            let neighbors = this.maze.getNeighbors(current).filter(neighbor => !this.visited.has(neighbor));
            if (neighbors.length != 0) {
                const nextNeighbor = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(neighbors);
                this.maze.connectCells(current, nextNeighbor);
                this.maze.setColor(nextNeighbor, STACK_COLOR);
                this.visited.add(nextNeighbor);
                this.push(nextNeighbor);
            }
            else {
                this.pop();
                this.maze.setColor(current, VISITED_COLOR);
            }
        }
        else {
            this.finished = true;
        }
    }
}


/***/ }),

/***/ "./src/Algorithms/RecursiveDivision.ts":
/*!*********************************************!*\
  !*** ./src/Algorithms/RecursiveDivision.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RecursiveDivision": () => (/* binding */ RecursiveDivision)
/* harmony export */ });
/* harmony import */ var _Maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Algorithms/Utils.ts");


const COLOR = "#f5c016";
class MazeRoom {
    constructor(sw, ne) {
        this.southWest = sw;
        this.northEast = ne;
    }
    nRows() {
        return this.northEast.Y - this.southWest.Y + 1;
    }
    nCols() {
        return this.northEast.X - this.southWest.X + 1;
    }
}
class RecursiveDivision extends _Maze__WEBPACK_IMPORTED_MODULE_0__.MazeAlgorithm {
    constructor(maze) {
        super(maze);
        this.rooms = [];
        maze.allPositions().forEach(pos => {
            if (pos.Y < maze.nRows() - 1) {
                maze.setOpen(pos, "north", true);
            }
            if (pos.X > 0) {
                maze.setOpen(pos, "west", true);
            }
            maze.setColor(pos, COLOR);
        });
        this.rooms.push(new MazeRoom(new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(0, 0), new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(maze.nColumns() - 1, maze.nRows() - 1)));
    }
    divideHorizontally(room) {
        const Y = room.southWest.Y + (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, room.nRows() - 1);
        const openX = room.southWest.X + (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, room.nCols());
        for (let X = room.southWest.X; X <= room.northEast.X; X++) {
            if (X != openX) {
                this.maze.setOpen(new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(X, Y), "north", false);
            }
        }
        const southRoom = new MazeRoom(room.southWest, new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(room.northEast.X, Y));
        const northRoom = new MazeRoom(new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(room.southWest.X, Y + 1), room.northEast);
        if (southRoom.nRows() > 1) {
            this.rooms.push(southRoom);
        }
        if (northRoom.nRows() > 1) {
            this.rooms.push(northRoom);
        }
    }
    divideVertically(room) {
        const X = room.southWest.X + (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, room.nCols() - 1);
        const openY = room.southWest.Y + (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, room.nRows());
        for (let Y = room.southWest.Y; Y <= room.northEast.Y; Y++) {
            if (Y != openY) {
                this.maze.setOpen(new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(X, Y), "east", false);
            }
        }
        const westRoom = new MazeRoom(room.southWest, new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(X, room.northEast.Y));
        const eastRoom = new MazeRoom(new _Maze__WEBPACK_IMPORTED_MODULE_0__.Position(X + 1, room.southWest.Y), room.northEast);
        if (westRoom.nCols() > 1) {
            this.rooms.push(westRoom);
        }
        if (eastRoom.nCols() > 1) {
            this.rooms.push(eastRoom);
        }
    }
    step() {
        if (this.rooms.length > 0) {
            const room = this.rooms.pop();
            if (room.nRows() > room.nCols()) {
                this.divideHorizontally(room);
            }
            else if (room.nCols() > room.nRows()) {
                this.divideVertically(room);
            }
            else if ((0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInt)(0, 2) == 1) {
                this.divideHorizontally(room);
            }
            else {
                this.divideVertically(room);
            }
        }
        else {
            this.finished = true;
        }
    }
}


/***/ }),

/***/ "./src/Algorithms/Utils.ts":
/*!*********************************!*\
  !*** ./src/Algorithms/Utils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomMap": () => (/* binding */ CustomMap),
/* harmony export */   "CustomSet": () => (/* binding */ CustomSet),
/* harmony export */   "UnionFind": () => (/* binding */ UnionFind),
/* harmony export */   "getRandomElement": () => (/* binding */ getRandomElement),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt),
/* harmony export */   "shuffle": () => (/* binding */ shuffle)
/* harmony export */ });
function getRandomInt(minInclusive, maxExclusive) {
    const cmin = Math.ceil(minInclusive);
    const fmax = Math.floor(maxExclusive);
    return Math.floor(Math.random() * (fmax - cmin) + cmin);
}
function getRandomElement(array) {
    return array[getRandomInt(0, array.length)];
}
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
class CustomSet {
    constructor() {
        this.data = new Set();
    }
    add(element) {
        this.data.add(JSON.stringify(element));
    }
    has(element) {
        return this.data.has(JSON.stringify(element));
    }
    delete(element) {
        return this.data.delete(JSON.stringify(element));
    }
    clear() {
        this.data.clear();
    }
}
class CustomMap {
    constructor() {
        this.data = new Map();
    }
    set(key, value) {
        this.data.set(JSON.stringify(key), value);
    }
    get(key) {
        return this.data.get(JSON.stringify(key));
    }
    has(key) {
        return this.data.has(JSON.stringify(key));
    }
    delete(key) {
        return this.data.delete(JSON.stringify(key));
    }
    clear() {
        this.data.clear();
    }
}
class UnionFind {
    constructor(elements) {
        this.parents = new CustomMap();
        this.sizes = new CustomMap();
        elements.forEach(e => {
            this.parents.set(e, e);
            this.sizes.set(e, 1);
        });
    }
    find(element) {
        while (true) {
            const parent = this.parents.get(element);
            if (this.equal(element, parent)) {
                return parent;
            }
            element = parent;
        }
    }
    union(element1, element2) {
        const parent1 = this.find(element1);
        const parent2 = this.find(element2);
        if (this.equal(parent1, parent2)) {
            return;
        }
        const size1 = this.sizes.get(parent1);
        const size2 = this.sizes.get(parent2);
        const [smaller, larger] = (size1 < size2) ? [parent1, parent2] : [parent2, parent1];
        this.parents.set(smaller, larger);
        this.sizes.set(larger, size1 + size2);
    }
    connected(element1, element2) {
        const parent1 = this.find(element1);
        const parent2 = this.find(element2);
        return this.equal(parent1, parent2);
    }
    equal(e1, e2) {
        return JSON.stringify(e1) == JSON.stringify(e2);
    }
}


/***/ }),

/***/ "./src/Algorithms/Wilson.ts":
/*!**********************************!*\
  !*** ./src/Algorithms/Wilson.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wilson": () => (/* binding */ Wilson)
/* harmony export */ });
/* harmony import */ var _Maze__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./src/Algorithms/Utils.ts");


const RANDOM_WALK_COLOR = "#1682f4";
const UST_COLOR = "#f5c016";
const RANDOM_WALK_POS_COLOR = "green";
const CUR_POS_COLOR = "yellow";
// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm.html
class Wilson extends _Maze__WEBPACK_IMPORTED_MODULE_0__.MazeAlgorithm {
    constructor(maze) {
        super(maze);
        this.ust = new _Utils__WEBPACK_IMPORTED_MODULE_1__.CustomSet();
        this.isRandomWalk = false;
        this.randomWalkDirections = new _Utils__WEBPACK_IMPORTED_MODULE_1__.CustomMap();
        const firstPos = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(maze.allPositions());
        this.ust.add(firstPos);
        maze.setColor(firstPos, UST_COLOR);
    }
    setRandomWalkDirection(direction) {
        this.randomWalkDirections.set(this.currentRandomWalkPos, direction);
    }
    step() {
        if (this.isRandomWalk) {
            if (this.ust.has(this.currentRandomWalkPos)) {
                let p = this.currentPos;
                while (!p.equals(this.currentRandomWalkPos)) {
                    this.ust.add(p);
                    this.maze.setColor(p, UST_COLOR);
                    const next = p.move(this.randomWalkDirections.get(p));
                    this.randomWalkDirections.delete(p);
                    this.maze.connectCells(p, next);
                    p = next;
                }
                this.maze.setColor(p, UST_COLOR);
                this.isRandomWalk = false;
            }
            else if (this.randomWalkDirections.has(this.currentRandomWalkPos)) {
                let p = this.currentRandomWalkPos;
                let isStart = true;
                while (isStart || !p.equals(this.currentRandomWalkPos)) {
                    this.maze.setColor(p, _Maze__WEBPACK_IMPORTED_MODULE_0__.EMPTY_POSITION_COLOR);
                    const next = p.move(this.randomWalkDirections.get(p));
                    this.randomWalkDirections.delete(p);
                    p = next;
                    isStart = false;
                }
                this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_POS_COLOR);
            }
            else {
                if (!this.currentRandomWalkPos.equals(this.currentPos)) {
                    this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_COLOR);
                }
                else {
                    this.maze.setColor(this.currentPos, CUR_POS_COLOR);
                }
                const direction = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(this.maze.getNeighborDirections(this.currentRandomWalkPos));
                this.setRandomWalkDirection(direction);
                this.currentRandomWalkPos = this.currentRandomWalkPos.move(direction);
                this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_POS_COLOR);
            }
        }
        else {
            const nonUstPositions = this.maze.allPositions().filter(p => !this.ust.has(p));
            if (nonUstPositions.length == 0) {
                this.finished = true;
            }
            else {
                this.currentPos = (0,_Utils__WEBPACK_IMPORTED_MODULE_1__.getRandomElement)(nonUstPositions);
                this.maze.setColor(this.currentPos, CUR_POS_COLOR);
                this.currentRandomWalkPos = this.currentPos;
                this.isRandomWalk = true;
            }
        }
    }
}


/***/ }),

/***/ "./src/Components/App.tsx":
/*!********************************!*\
  !*** ./src/Components/App.tsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "App": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Algorithms_Maze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Algorithms/Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _MazeDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MazeDisplay */ "./src/Components/MazeDisplay.tsx");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.css */ "./src/Components/App.css");
/* harmony import */ var _Algorithms_RecursiveBacktracker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Algorithms/RecursiveBacktracker */ "./src/Algorithms/RecursiveBacktracker.ts");
/* harmony import */ var _Algorithms_Kruskal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Algorithms/Kruskal */ "./src/Algorithms/Kruskal.ts");
/* harmony import */ var _Algorithms_Wilson__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Algorithms/Wilson */ "./src/Algorithms/Wilson.ts");
/* harmony import */ var _Algorithms_RecursiveDivision__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Algorithms/RecursiveDivision */ "./src/Algorithms/RecursiveDivision.ts");









let algorithm = new _Algorithms_RecursiveBacktracker__WEBPACK_IMPORTED_MODULE_4__.RecursiveBacktracker(new _Algorithms_Maze__WEBPACK_IMPORTED_MODULE_1__.Maze(8, 8));
const BACKTRACKER = "Recursive backtracker";
const KRUSKAL = "Kruskal";
const WILSONS = "Wilson's";
const DIVISION = "Recursive division";
const DEFAULT_COLS = 8;
const DEFAULT_ROWS = 8;
function App() {
    const [forceUpdateFlag, setForceUpdateFlag] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    function forceUpdate() {
        setForceUpdateFlag(!forceUpdateFlag);
    }
    const [algoName, setAlgoName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(BACKTRACKER);
    const [mazeCols, setMazeCols] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_COLS);
    const [mazeRows, setMazeRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_ROWS);
    function onSelectNRows(event) {
        const rows = parseInt(event.target.value);
        if (rows > 1) {
            setMazeRows(rows);
        }
    }
    function onSelectNCols(event) {
        const cols = parseInt(event.target.value);
        if (cols > 1) {
            setMazeCols(cols);
        }
    }
    function onStepClick() {
        algorithm.step();
        forceUpdate();
    }
    function onFinishClick() {
        while (!algorithm.isFinished()) {
            algorithm.step();
        }
        forceUpdate();
    }
    function restart() {
        const maze = new _Algorithms_Maze__WEBPACK_IMPORTED_MODULE_1__.Maze(mazeCols, mazeRows);
        if (algoName == BACKTRACKER) {
            algorithm = new _Algorithms_RecursiveBacktracker__WEBPACK_IMPORTED_MODULE_4__.RecursiveBacktracker(maze);
        }
        else if (algoName == KRUSKAL) {
            algorithm = new _Algorithms_Kruskal__WEBPACK_IMPORTED_MODULE_5__.Kruskal(maze);
        }
        else if (algoName == WILSONS) {
            algorithm = new _Algorithms_Wilson__WEBPACK_IMPORTED_MODULE_6__.Wilson(maze);
        }
        else if (algoName == DIVISION) {
            algorithm = new _Algorithms_RecursiveDivision__WEBPACK_IMPORTED_MODULE_7__.RecursiveDivision(maze);
        }
        forceUpdate();
    }
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        restart();
    }, [algoName, mazeCols, mazeRows]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "app" },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "control-panel" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "control-group" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Algorithm"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", { className: "control", onChange: (event) => {
                        setAlgoName(event.target.value);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", null, BACKTRACKER),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", null, KRUSKAL),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", null, WILSONS),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", null, DIVISION))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "control-group" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Number of columns"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: "control", type: "number", defaultValue: DEFAULT_COLS, onChange: onSelectNCols })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "control-group" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Number of rows"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { className: "control", type: "number", defaultValue: DEFAULT_ROWS, onChange: onSelectNRows })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "control-group" },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "control", disabled: algorithm.isFinished(), onClick: onStepClick }, "Step"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "control", disabled: algorithm.isFinished(), onClick: onFinishClick }, "Finish"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: "control", onClick: restart }, "Restart"))),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "maze-panel" },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MazeDisplay__WEBPACK_IMPORTED_MODULE_2__.MazeDisplay, { maze: algorithm.maze }))));
}


/***/ }),

/***/ "./src/Components/MazeDisplay.tsx":
/*!****************************************!*\
  !*** ./src/Components/MazeDisplay.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MazeDisplay": () => (/* binding */ MazeDisplay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Algorithms_Maze__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Algorithms/Maze */ "./src/Algorithms/Maze.ts");
/* harmony import */ var _MazeDisplay_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MazeDisplay.css */ "./src/Components/MazeDisplay.css");



function MazeDisplay({ maze }) {
    const width = maze.nColumns();
    const height = maze.nRows();
    let cells = [];
    for (let X = 0; X < width; X++) {
        for (let Y = 0; Y < height; Y++) {
            const pos = new _Algorithms_Maze__WEBPACK_IMPORTED_MODULE_1__.Position(X, Y);
            cells.push((react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: X + "_" + Y, className: "cell" +
                    (maze.isOpen(pos, "north") ? " north-open" : "") +
                    (maze.isOpen(pos, "west") ? " west-open" : ""), style: {
                    gridRow: height - Y,
                    gridColumn: X + 1,
                    backgroundColor: maze.getColor(pos)
                } })));
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "maze", style: {
            aspectRatio: `${width} / ${height}`,
            gridTemplateColumns: `repeat(${width}, 1fr)`,
            gridTemplateRows: `repeat(${height}, 1fr)`
        } }, cells));
}


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _Components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/App */ "./src/Components/App.tsx");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./src/index.css");




const element = document.createElement("div");
element.className = "root";
document.body.appendChild(element);
(0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(element).render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Components_App__WEBPACK_IMPORTED_MODULE_2__.App, null));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmaze_algorithms"] = self["webpackChunkmaze_algorithms"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQ29tcG9uZW50cy9BcHAuY3NzPzNjZmMiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zLy4vc3JjL0NvbXBvbmVudHMvTWF6ZURpc3BsYXkuY3NzPzRhYzYiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zLy4vc3JjL2luZGV4LmNzcz9jNDBkIiwid2VicGFjazovL21hemUtYWxnb3JpdGhtcy8uL3NyYy9BbGdvcml0aG1zL0tydXNrYWwudHMiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zLy4vc3JjL0FsZ29yaXRobXMvTWF6ZS50cyIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQWxnb3JpdGhtcy9SZWN1cnNpdmVCYWNrdHJhY2tlci50cyIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQWxnb3JpdGhtcy9SZWN1cnNpdmVEaXZpc2lvbi50cyIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQWxnb3JpdGhtcy9VdGlscy50cyIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQWxnb3JpdGhtcy9XaWxzb24udHMiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zLy4vc3JjL0NvbXBvbmVudHMvQXBwLnRzeCIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvLi9zcmMvQ29tcG9uZW50cy9NYXplRGlzcGxheS50c3giLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zLy4vc3JjL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9tYXplLWFsZ29yaXRobXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL21hemUtYWxnb3JpdGhtcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL21hemUtYWxnb3JpdGhtcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL21hemUtYWxnb3JpdGhtcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbWF6ZS1hbGdvcml0aG1zL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBNYXplLCBNYXplQWxnb3JpdGhtLCBQb3NpdGlvbiwgRWRnZSB9IGZyb20gXCIuL01hemVcIjtcbmltcG9ydCB7IEN1c3RvbU1hcCwgc2h1ZmZsZSwgVW5pb25GaW5kIH0gZnJvbSBcIi4vVXRpbHNcIlxuXG5jb25zdCBTRUxFQ1RFRF9DT0xPUiA9IFwiIzE2ODJmNFwiXG5jb25zdCBWSVNJVEVEX0NPTE9SID0gXCIjZjVjMDE2XCJcblxuZXhwb3J0IGNsYXNzIEtydXNrYWwgZXh0ZW5kcyBNYXplQWxnb3JpdGhtIHtcblxuICAgIHByaXZhdGUgdW5pb25GaW5kOiBVbmlvbkZpbmQ8UG9zaXRpb24+XG5cbiAgICBwcml2YXRlIGVkZ2VzOiBFZGdlW11cblxuICAgIHByaXZhdGUgc3RlcENvdW50OiBudW1iZXIgPSAwXG5cbiAgICBwcml2YXRlIGN1cnJlbnRFZGdlOiBFZGdlIHwgdW5kZWZpbmVkXG5cbiAgICBjb25zdHJ1Y3RvcihtYXplOiBNYXplKSB7XG4gICAgICAgIHN1cGVyKG1hemUpXG4gICAgICAgIHRoaXMuZWRnZXMgPSBtYXplLmFsbEVkZ2VzKClcbiAgICAgICAgc2h1ZmZsZSh0aGlzLmVkZ2VzKVxuICAgICAgICB0aGlzLnVuaW9uRmluZCA9IG5ldyBVbmlvbkZpbmQobWF6ZS5hbGxQb3NpdGlvbnMoKSlcbiAgICB9XG5cbiAgICBvdmVycmlkZSBzdGVwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdGVwQ291bnQgJSAyID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEVkZ2UgPSB0aGlzLmVkZ2VzLnBvcCgpXG5cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRFZGdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbcDEsIHAyXSA9IHRoaXMuY3VycmVudEVkZ2VcbiAgICAgICAgICAgICAgICB0aGlzLm1hemUuc2V0Q29sb3IocDEsIFNFTEVDVEVEX0NPTE9SKVxuICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5zZXRDb2xvcihwMiwgU0VMRUNURURfQ09MT1IpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IFtwMSwgcDJdID0gdGhpcy5jdXJyZW50RWRnZVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMudW5pb25GaW5kLmNvbm5lY3RlZChwMSwgcDIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXplLmNvbm5lY3RDZWxscyhwMSwgcDIpXG4gICAgICAgICAgICAgICAgdGhpcy51bmlvbkZpbmQudW5pb24ocDEsIHAyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHAxLCBWSVNJVEVEX0NPTE9SKVxuICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHAyLCBWSVNJVEVEX0NPTE9SKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RlcENvdW50KytcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgRU1QVFlfUE9TSVRJT05fQ09MT1IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KVwiXG5cbmV4cG9ydCB0eXBlIERpcmVjdGlvbiA9IFwibm9ydGhcIiB8IFwiZWFzdFwiIHwgXCJzb3V0aFwiIHwgXCJ3ZXN0XCJcblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uIHtcbiAgICBYOiBudW1iZXJcbiAgICBZOiBudW1iZXJcblxuICAgIGNvbnN0cnVjdG9yKFg6IG51bWJlciwgWTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuWCA9IFhcbiAgICAgICAgdGhpcy5ZID0gWVxuICAgIH1cblxuICAgIG1vdmUoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiBQb3NpdGlvbiB7XG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwibm9ydGhcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMuWCwgdGhpcy5ZICsgMSlcbiAgICAgICAgICAgIGNhc2UgXCJzb3V0aFwiOiAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMuWCwgdGhpcy5ZIC0gMSlcbiAgICAgICAgICAgIGNhc2UgXCJ3ZXN0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbih0aGlzLlggLSAxLCB0aGlzLlkpXG4gICAgICAgICAgICBjYXNlIFwiZWFzdFwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy5YICsgMSwgdGhpcy5ZKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXF1YWxzKG90aGVyOiBQb3NpdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5YID09IG90aGVyLlggJiYgdGhpcy5ZID09IG90aGVyLllcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEVkZ2UgPSBbUG9zaXRpb24sIFBvc2l0aW9uXTtcblxuaW50ZXJmYWNlIENlbGwge1xuICAgIG5vcnRoT3BlbjogYm9vbGVhblxuICAgIHdlc3RPcGVuOiBib29sZWFuXG4gICAgY29sb3I6IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgTWF6ZSB7XG4gICAgcHJpdmF0ZSBjZWxsczogQ2VsbFtdW11cblxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciwgcm93czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2VsbHMgPSBbXVxuICAgIFxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNvbHM7IHgrKykge1xuICAgICAgICAgICAgbGV0IGNvbHVtbjogQ2VsbFtdID0gW11cbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgcm93czsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBub3J0aE9wZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB3ZXN0T3BlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBFTVBUWV9QT1NJVElPTl9DT0xPUlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goY29sdW1uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbkNvbHVtbnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHMubGVuZ3RoXG4gICAgfVxuXG4gICAgblJvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHNbMF0ubGVuZ3RoXG4gICAgfVxuXG4gICAgZ2V0TmVpZ2hib3JEaXJlY3Rpb25zKHBvczogUG9zaXRpb24pOiBEaXJlY3Rpb25bXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdDogRGlyZWN0aW9uW10gPSBbXVxuICAgIFxuICAgICAgICBpZiAocG9zLlggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcIndlc3RcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zLlggPCB0aGlzLm5Db2x1bW5zKCkgLSAxKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcImVhc3RcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zLlkgPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcInNvdXRoXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvcy5ZIDwgdGhpcy5uUm93cygpIC0gMSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJub3J0aFwiKVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBnZXROZWlnaGJvcnMocG9zOiBQb3NpdGlvbik6IFBvc2l0aW9uW10ge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb25zID0gdGhpcy5nZXROZWlnaGJvckRpcmVjdGlvbnMocG9zKVxuICAgICAgICByZXR1cm4gZGlyZWN0aW9ucy5tYXAoZGlyZWN0aW9uID0+IHBvcy5tb3ZlKGRpcmVjdGlvbikpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQoe1gsIFl9OiBQb3NpdGlvbik6IENlbGwge1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1tYXVtZXVxuICAgIH1cblxuICAgIGNvbm5lY3RDZWxscyhjZWxsMTogUG9zaXRpb24sIGNlbGwyOiBQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICBpZiAoY2VsbDEuWSA8IGNlbGwyLlkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0KGNlbGwxKS5ub3J0aE9wZW4gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2VsbDEuWSA+IGNlbGwyLlkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0KGNlbGwyKS5ub3J0aE9wZW4gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2VsbDEuWCA8IGNlbGwyLlgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0KGNlbGwyKS53ZXN0T3BlbiA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjZWxsMS5YID4gY2VsbDIuWCkge1xuICAgICAgICAgICAgdGhpcy5nZXQoY2VsbDEpLndlc3RPcGVuID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T3Blbihsb2NhdGlvbjogUG9zaXRpb24sIGRpcmVjdGlvbjogRGlyZWN0aW9uLCBpc09wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJub3J0aFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0KGxvY2F0aW9uKS5ub3J0aE9wZW4gPSBpc09wZW5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNhc2UgXCJzb3V0aFwiOiAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmdldChsb2NhdGlvbi5tb3ZlKFwic291dGhcIikpLm5vcnRoT3BlbiA9IGlzT3BlblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgY2FzZSBcIndlc3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmdldChsb2NhdGlvbikud2VzdE9wZW4gPSBpc09wZW5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIGNhc2UgXCJlYXN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5nZXQobG9jYXRpb24ubW92ZShcImVhc3RcIikpLndlc3RPcGVuID0gaXNPcGVuXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc09wZW4obG9jYXRpb246IFBvc2l0aW9uLCBkaXJlY3Rpb246IERpcmVjdGlvbik6IGJvb2xlYW4ge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcIm5vcnRoXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGxvY2F0aW9uKS5ub3J0aE9wZW5cbiAgICAgICAgICAgIGNhc2UgXCJzb3V0aFwiOiAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQobG9jYXRpb24ubW92ZShcInNvdXRoXCIpKS5ub3J0aE9wZW5cbiAgICAgICAgICAgIGNhc2UgXCJ3ZXN0XCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGxvY2F0aW9uKS53ZXN0T3BlblxuICAgICAgICAgICAgY2FzZSBcImVhc3RcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXQobG9jYXRpb24ubW92ZShcImVhc3RcIikpLndlc3RPcGVuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb2xvcihsb2NhdGlvbjogUG9zaXRpb24sIGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXQobG9jYXRpb24pLmNvbG9yID0gY29sb3JcbiAgICB9XG5cbiAgICBnZXRDb2xvcihsb2NhdGlvbjogUG9zaXRpb24pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQobG9jYXRpb24pLmNvbG9yXG4gICAgfVxuXG4gICAgYWxsUG9zaXRpb25zKCk6IFBvc2l0aW9uW10ge1xuICAgICAgICBjb25zdCBjb2xzID0gdGhpcy5uQ29sdW1ucygpXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLm5Sb3dzKClcbiAgICAgICAgY29uc3QgcmVzdWx0OiBQb3NpdGlvbltdID0gW11cbiAgICBcbiAgICAgICAgZm9yIChsZXQgWCA9IDA7IFggPCBjb2xzOyBYKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IFkgPSAwOyBZIDwgcm93czsgWSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IFBvc2l0aW9uKFgsIFkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBhbGxFZGdlcygpOiBFZGdlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGxQb3NpdGlvbnMoKS5mbGF0TWFwKHAgPT5cbiAgICAgICAgICAgIHRoaXMuZ2V0TmVpZ2hib3JEaXJlY3Rpb25zKHApXG4gICAgICAgICAgICAgICAgLmZpbHRlcihkID0+IGQgPT0gXCJub3J0aFwiIHx8IGQgPT0gXCJ3ZXN0XCIpXG4gICAgICAgICAgICAgICAgLm1hcChkID0+IFtwLCBwLm1vdmUoZCldIGFzIEVkZ2UpXG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXplQWxnb3JpdGhtIHtcbiAgICBtYXplOiBNYXplXG4gICAgcHJvdGVjdGVkIGZpbmlzaGVkID0gZmFsc2VcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihtYXplOiBNYXplKSB7XG4gICAgICAgIHRoaXMubWF6ZSA9IG1hemVcbiAgICB9XG5cbiAgICBpc0ZpbmlzaGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5pc2hlZFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJ1bnMgYSBzaW5nbGUgaXRlcmF0aW9uIG9mIHRoZSBhbGdvcml0aG0uXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc3RlcCgpOiB2b2lkXG59XG4iLCJpbXBvcnQgeyBQb3NpdGlvbiwgTWF6ZSwgTWF6ZUFsZ29yaXRobSB9IGZyb20gXCIuL01hemVcIjtcbmltcG9ydCB7IEN1c3RvbVNldCwgZ2V0UmFuZG9tRWxlbWVudCB9IGZyb20gXCIuL1V0aWxzXCJcblxuY29uc3QgU1RBQ0tfQ09MT1IgPSBcIiMxNjgyZjRcIlxuY29uc3QgVklTSVRFRF9DT0xPUiA9IFwiI2Y1YzAxNlwiXG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVCYWNrdHJhY2tlciBleHRlbmRzIE1hemVBbGdvcml0aG0ge1xuICAgIHByaXZhdGUgc3RhY2s6IFBvc2l0aW9uW10gPSBbXVxuICAgIFxuICAgIHByaXZhdGUgcHVzaChwb3M6IFBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuc3RhY2sucHVzaChwb3MpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZWVrKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXVxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wKCk6IFBvc2l0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhY2sucG9wKClcbiAgICB9XG5cbiAgICBwcml2YXRlIHZpc2l0ZWQgPSBuZXcgQ3VzdG9tU2V0PFBvc2l0aW9uPigpXG4gICAgXG4gICAgY29uc3RydWN0b3IobWF6ZTogTWF6ZSkge1xuICAgICAgICBzdXBlcihtYXplKVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZmlyc3RQb3MgPSBnZXRSYW5kb21FbGVtZW50KG1hemUuYWxsUG9zaXRpb25zKCkpXG4gICAgICAgIG1hemUuc2V0Q29sb3IoZmlyc3RQb3MsIFNUQUNLX0NPTE9SKVxuICAgICAgICB0aGlzLnB1c2goZmlyc3RQb3MpXG4gICAgICAgIHRoaXMudmlzaXRlZC5hZGQoZmlyc3RQb3MpXG4gICAgfVxuXG4gICAgb3ZlcnJpZGUgc3RlcCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLnBlZWsoKVxuXG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5tYXplLmdldE5laWdoYm9ycyhjdXJyZW50KS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgbmVpZ2hib3IgPT4gIXRoaXMudmlzaXRlZC5oYXMobmVpZ2hib3IpXG4gICAgICAgICAgICApXG5cbiAgICAgICAgICAgIGlmIChuZWlnaGJvcnMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0TmVpZ2hib3IgPSBnZXRSYW5kb21FbGVtZW50KG5laWdoYm9ycylcblxuICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5jb25uZWN0Q2VsbHMoY3VycmVudCwgbmV4dE5laWdoYm9yKVxuICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5zZXRDb2xvcihuZXh0TmVpZ2hib3IsIFNUQUNLX0NPTE9SKVxuXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdGVkLmFkZChuZXh0TmVpZ2hib3IpXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKG5leHROZWlnaGJvcilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3AoKVxuICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5zZXRDb2xvcihjdXJyZW50LCBWSVNJVEVEX0NPTE9SKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWVcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFBvc2l0aW9uLCBNYXplLCBNYXplQWxnb3JpdGhtIH0gZnJvbSBcIi4vTWF6ZVwiO1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50IH0gZnJvbSBcIi4vVXRpbHNcIlxuXG5jb25zdCBDT0xPUiA9IFwiI2Y1YzAxNlwiXG5cbmNsYXNzIE1hemVSb29tIHtcbiAgICBzb3V0aFdlc3Q6IFBvc2l0aW9uXG4gICAgbm9ydGhFYXN0OiBQb3NpdGlvblxuXG4gICAgY29uc3RydWN0b3Ioc3c6IFBvc2l0aW9uLCBuZTogUG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy5zb3V0aFdlc3QgPSBzd1xuICAgICAgICB0aGlzLm5vcnRoRWFzdCA9IG5lXG4gICAgfVxuXG4gICAgblJvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ydGhFYXN0LlkgLSB0aGlzLnNvdXRoV2VzdC5ZICsgMVxuICAgIH1cblxuICAgIG5Db2xzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vcnRoRWFzdC5YIC0gdGhpcy5zb3V0aFdlc3QuWCArIDFcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWN1cnNpdmVEaXZpc2lvbiBleHRlbmRzIE1hemVBbGdvcml0aG0ge1xuICAgIHByaXZhdGUgcm9vbXM6IE1hemVSb29tW10gPSBbXVxuICAgIFxuICAgIGNvbnN0cnVjdG9yKG1hemU6IE1hemUpIHtcbiAgICAgICAgc3VwZXIobWF6ZSlcblxuICAgICAgICBtYXplLmFsbFBvc2l0aW9ucygpLmZvckVhY2gocG9zID0+IHtcbiAgICAgICAgICAgIGlmIChwb3MuWSA8IG1hemUublJvd3MoKSAtIDEpIHtcbiAgICAgICAgICAgICAgICBtYXplLnNldE9wZW4ocG9zLCBcIm5vcnRoXCIsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9zLlggPiAwKSB7XG4gICAgICAgICAgICAgICAgbWF6ZS5zZXRPcGVuKHBvcywgXCJ3ZXN0XCIsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXplLnNldENvbG9yKHBvcywgQ09MT1IpXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5yb29tcy5wdXNoKG5ldyBNYXplUm9vbShcbiAgICAgICAgICAgIG5ldyBQb3NpdGlvbigwLCAwKSxcbiAgICAgICAgICAgIG5ldyBQb3NpdGlvbihtYXplLm5Db2x1bW5zKCkgLSAxLCBtYXplLm5Sb3dzKCkgLSAxKVxuICAgICAgICApKVxuICAgIH1cblxuICAgIHByaXZhdGUgZGl2aWRlSG9yaXpvbnRhbGx5KHJvb206IE1hemVSb29tKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IFkgPSByb29tLnNvdXRoV2VzdC5ZICsgZ2V0UmFuZG9tSW50KDAsIHJvb20ublJvd3MoKSAtIDEpXG4gICAgICAgIGNvbnN0IG9wZW5YID0gcm9vbS5zb3V0aFdlc3QuWCArIGdldFJhbmRvbUludCgwLCByb29tLm5Db2xzKCkpXG5cbiAgICAgICAgZm9yIChsZXQgWCA9IHJvb20uc291dGhXZXN0Llg7IFggPD0gcm9vbS5ub3J0aEVhc3QuWDsgWCsrKSB7XG4gICAgICAgICAgICBpZiAoWCAhPSBvcGVuWCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5zZXRPcGVuKG5ldyBQb3NpdGlvbihYLCBZKSwgXCJub3J0aFwiLCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXRoUm9vbSA9IG5ldyBNYXplUm9vbShcbiAgICAgICAgICAgIHJvb20uc291dGhXZXN0LCBcbiAgICAgICAgICAgIG5ldyBQb3NpdGlvbihyb29tLm5vcnRoRWFzdC5YLCBZKVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IG5vcnRoUm9vbSA9IG5ldyBNYXplUm9vbShcbiAgICAgICAgICAgIG5ldyBQb3NpdGlvbihyb29tLnNvdXRoV2VzdC5YLCBZICsgMSksIFxuICAgICAgICAgICAgcm9vbS5ub3J0aEVhc3RcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChzb3V0aFJvb20ublJvd3MoKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMucm9vbXMucHVzaChzb3V0aFJvb20pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vcnRoUm9vbS5uUm93cygpID4gMSkge1xuICAgICAgICAgICAgdGhpcy5yb29tcy5wdXNoKG5vcnRoUm9vbSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGl2aWRlVmVydGljYWxseShyb29tOiBNYXplUm9vbSk6IHZvaWQge1xuICAgICAgICBjb25zdCBYID0gcm9vbS5zb3V0aFdlc3QuWCArIGdldFJhbmRvbUludCgwLCByb29tLm5Db2xzKCkgLSAxKVxuICAgICAgICBjb25zdCBvcGVuWSA9IHJvb20uc291dGhXZXN0LlkgKyBnZXRSYW5kb21JbnQoMCwgcm9vbS5uUm93cygpKVxuXG4gICAgICAgIGZvciAobGV0IFkgPSByb29tLnNvdXRoV2VzdC5ZIDsgWSA8PSByb29tLm5vcnRoRWFzdC5ZOyBZKyspIHtcbiAgICAgICAgICAgIGlmIChZICE9IG9wZW5ZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXplLnNldE9wZW4obmV3IFBvc2l0aW9uKFgsIFkpLCBcImVhc3RcIiwgZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB3ZXN0Um9vbSA9IG5ldyBNYXplUm9vbShcbiAgICAgICAgICAgIHJvb20uc291dGhXZXN0LCBcbiAgICAgICAgICAgIG5ldyBQb3NpdGlvbihYLCByb29tLm5vcnRoRWFzdC5ZKVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGVhc3RSb29tID0gbmV3IE1hemVSb29tKFxuICAgICAgICAgICAgbmV3IFBvc2l0aW9uKFggKyAxLCByb29tLnNvdXRoV2VzdC5ZKSwgXG4gICAgICAgICAgICByb29tLm5vcnRoRWFzdFxuICAgICAgICApXG5cbiAgICAgICAgaWYgKHdlc3RSb29tLm5Db2xzKCkgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21zLnB1c2god2VzdFJvb20pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVhc3RSb29tLm5Db2xzKCkgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21zLnB1c2goZWFzdFJvb20pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvdmVycmlkZSBzdGVwKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yb29tcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCByb29tID0gdGhpcy5yb29tcy5wb3AoKVxuXG4gICAgICAgICAgICBpZiAocm9vbS5uUm93cygpID4gcm9vbS5uQ29scygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpZGVIb3Jpem9udGFsbHkocm9vbSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocm9vbS5uQ29scygpID4gcm9vbS5uUm93cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpZGVWZXJ0aWNhbGx5KHJvb20pXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdldFJhbmRvbUludCgwLCAyKSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpZGVIb3Jpem9udGFsbHkocm9vbSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXZpZGVWZXJ0aWNhbGx5KHJvb20pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW5JbmNsdXNpdmU6IG51bWJlciwgbWF4RXhjbHVzaXZlOiBudW1iZXIpIHtcbiAgICBjb25zdCBjbWluID0gTWF0aC5jZWlsKG1pbkluY2x1c2l2ZSlcbiAgICBjb25zdCBmbWF4ID0gTWF0aC5mbG9vcihtYXhFeGNsdXNpdmUpXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChmbWF4IC0gY21pbikgKyBjbWluKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tRWxlbWVudDxUPihhcnJheTogVFtdKTogVCB7XG4gICAgcmV0dXJuIGFycmF5W2dldFJhbmRvbUludCgwLCBhcnJheS5sZW5ndGgpXVxufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDUwOTU0L2hvdy10by1yYW5kb21pemUtc2h1ZmZsZS1hLWphdmFzY3JpcHQtYXJyYXlcbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlPFQ+KGFycmF5OiBUW10pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ3VzdG9tU2V0PFQ+IHtcbiAgICBwcml2YXRlIGRhdGEgPSBuZXcgU2V0PHN0cmluZz4oKVxuXG4gICAgYWRkKGVsZW1lbnQ6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhLmFkZChKU09OLnN0cmluZ2lmeShlbGVtZW50KSlcbiAgICB9XG5cbiAgICBoYXMoZWxlbWVudDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyhKU09OLnN0cmluZ2lmeShlbGVtZW50KSlcbiAgICB9XG5cbiAgICBkZWxldGUoZWxlbWVudDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmRlbGV0ZShKU09OLnN0cmluZ2lmeShlbGVtZW50KSlcbiAgICB9XG5cbiAgICBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRhLmNsZWFyKClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21NYXA8SywgVj4ge1xuICAgIHByaXZhdGUgZGF0YSA9IG5ldyBNYXA8c3RyaW5nLCBWPigpXG5cbiAgICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGEuc2V0KEpTT04uc3RyaW5naWZ5KGtleSksIHZhbHVlKVxuICAgIH1cblxuICAgIGdldChrZXk6IEspOiBWIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoSlNPTi5zdHJpbmdpZnkoa2V5KSlcbiAgICB9XG5cbiAgICBoYXMoa2V5OiBLKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFzKEpTT04uc3RyaW5naWZ5KGtleSkpXG4gICAgfVxuXG4gICAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmRlbGV0ZShKU09OLnN0cmluZ2lmeShrZXkpKVxuICAgIH1cblxuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGEuY2xlYXIoKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVuaW9uRmluZDxUPiB7XG5cbiAgICBwcml2YXRlIHBhcmVudHMgPSBuZXcgQ3VzdG9tTWFwPFQsIFQ+KClcbiAgICBwcml2YXRlIHNpemVzID0gbmV3IEN1c3RvbU1hcDxULCBudW1iZXI+KClcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRzOiBUW10pIHtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50cy5zZXQoZSwgZSlcbiAgICAgICAgICAgIHRoaXMuc2l6ZXMuc2V0KGUsIDEpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZmluZChlbGVtZW50OiBUKTogVCB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudHMuZ2V0KGVsZW1lbnQpXG4gICAgICAgICAgICBpZiAodGhpcy5lcXVhbChlbGVtZW50LCBwYXJlbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudCA9IHBhcmVudFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5pb24oZWxlbWVudDE6IFQsIGVsZW1lbnQyOiBUKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBhcmVudDEgPSB0aGlzLmZpbmQoZWxlbWVudDEpXG4gICAgICAgIGNvbnN0IHBhcmVudDIgPSB0aGlzLmZpbmQoZWxlbWVudDIpXG5cbiAgICAgICAgaWYgKHRoaXMuZXF1YWwocGFyZW50MSwgcGFyZW50MikpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2l6ZTEgPSB0aGlzLnNpemVzLmdldChwYXJlbnQxKVxuICAgICAgICBjb25zdCBzaXplMiA9IHRoaXMuc2l6ZXMuZ2V0KHBhcmVudDIpXG5cbiAgICAgICAgY29uc3QgW3NtYWxsZXIsIGxhcmdlcl0gPSAoc2l6ZTEgPCBzaXplMikgPyBbcGFyZW50MSwgcGFyZW50Ml0gOiBbcGFyZW50MiwgcGFyZW50MV1cblxuICAgICAgICB0aGlzLnBhcmVudHMuc2V0KHNtYWxsZXIsIGxhcmdlcilcbiAgICAgICAgdGhpcy5zaXplcy5zZXQobGFyZ2VyLCBzaXplMSArIHNpemUyKVxuICAgIH1cblxuICAgIGNvbm5lY3RlZChlbGVtZW50MTogVCwgZWxlbWVudDI6IFQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcGFyZW50MSA9IHRoaXMuZmluZChlbGVtZW50MSlcbiAgICAgICAgY29uc3QgcGFyZW50MiA9IHRoaXMuZmluZChlbGVtZW50MilcblxuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbChwYXJlbnQxLCBwYXJlbnQyKVxuICAgIH1cblxuICAgIHByaXZhdGUgZXF1YWwoZTE6IFQsIGUyOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlMSkgPT0gSlNPTi5zdHJpbmdpZnkoZTIpXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTWF6ZSwgTWF6ZUFsZ29yaXRobSwgUG9zaXRpb24sIERpcmVjdGlvbiwgRU1QVFlfUE9TSVRJT05fQ09MT1IgfSBmcm9tIFwiLi9NYXplXCI7XG5pbXBvcnQgeyBDdXN0b21NYXAsIEN1c3RvbVNldCwgZ2V0UmFuZG9tRWxlbWVudCB9IGZyb20gXCIuL1V0aWxzXCJcblxuY29uc3QgUkFORE9NX1dBTEtfQ09MT1IgPSBcIiMxNjgyZjRcIlxuY29uc3QgVVNUX0NPTE9SID0gXCIjZjVjMDE2XCJcbmNvbnN0IFJBTkRPTV9XQUxLX1BPU19DT0xPUiA9IFwiZ3JlZW5cIlxuY29uc3QgQ1VSX1BPU19DT0xPUiA9IFwieWVsbG93XCJcblxuLy8gaHR0cHM6Ly93ZWJsb2cuamFtaXNidWNrLm9yZy8yMDExLzEvMjAvbWF6ZS1nZW5lcmF0aW9uLXdpbHNvbi1zLWFsZ29yaXRobS5odG1sXG5leHBvcnQgY2xhc3MgV2lsc29uIGV4dGVuZHMgTWF6ZUFsZ29yaXRobSB7XG5cbiAgICBwcml2YXRlIHVzdCA9IG5ldyBDdXN0b21TZXQ8UG9zaXRpb24+KClcblxuICAgIHByaXZhdGUgY3VycmVudFBvczogUG9zaXRpb25cblxuICAgIHByaXZhdGUgaXNSYW5kb21XYWxrOiBib29sZWFuID0gZmFsc2VcblxuICAgIHByaXZhdGUgY3VycmVudFJhbmRvbVdhbGtQb3M6IFBvc2l0aW9uXG5cbiAgICBwcml2YXRlIHJhbmRvbVdhbGtEaXJlY3Rpb25zID0gbmV3IEN1c3RvbU1hcDxQb3NpdGlvbiwgRGlyZWN0aW9uPigpXG5cbiAgICBjb25zdHJ1Y3RvcihtYXplOiBNYXplKSB7XG4gICAgICAgIHN1cGVyKG1hemUpXG4gICAgICAgIGNvbnN0IGZpcnN0UG9zID0gZ2V0UmFuZG9tRWxlbWVudChtYXplLmFsbFBvc2l0aW9ucygpKVxuICAgICAgICB0aGlzLnVzdC5hZGQoZmlyc3RQb3MpXG4gICAgICAgIG1hemUuc2V0Q29sb3IoZmlyc3RQb3MsIFVTVF9DT0xPUilcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFJhbmRvbVdhbGtEaXJlY3Rpb24oZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yYW5kb21XYWxrRGlyZWN0aW9ucy5zZXQodGhpcy5jdXJyZW50UmFuZG9tV2Fsa1BvcywgZGlyZWN0aW9uKVxuICAgIH1cblxuICAgIG92ZXJyaWRlIHN0ZXAoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzUmFuZG9tV2Fsaykge1xuICAgICAgICAgICAgaWYgKHRoaXMudXN0Lmhhcyh0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zKSkge1xuICAgICAgICAgICAgICAgIGxldCBwID0gdGhpcy5jdXJyZW50UG9zXG4gICAgICAgICAgICAgICAgd2hpbGUgKCFwLmVxdWFscyh0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzdC5hZGQocClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHAsIFVTVF9DT0xPUilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHAubW92ZSh0aGlzLnJhbmRvbVdhbGtEaXJlY3Rpb25zLmdldChwKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yYW5kb21XYWxrRGlyZWN0aW9ucy5kZWxldGUocClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXplLmNvbm5lY3RDZWxscyhwLCBuZXh0KVxuICAgICAgICAgICAgICAgICAgICBwID0gbmV4dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1hemUuc2V0Q29sb3IocCwgVVNUX0NPTE9SKVxuICAgICAgICAgICAgICAgIHRoaXMuaXNSYW5kb21XYWxrID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yYW5kb21XYWxrRGlyZWN0aW9ucy5oYXModGhpcy5jdXJyZW50UmFuZG9tV2Fsa1BvcykpIHtcbiAgICAgICAgICAgICAgICBsZXQgcCA9IHRoaXMuY3VycmVudFJhbmRvbVdhbGtQb3NcbiAgICAgICAgICAgICAgICBsZXQgaXNTdGFydCA9IHRydWVcbiAgICAgICAgICAgICAgICB3aGlsZSAoaXNTdGFydCB8fCAhcC5lcXVhbHModGhpcy5jdXJyZW50UmFuZG9tV2Fsa1BvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHAsIEVNUFRZX1BPU0lUSU9OX0NPTE9SKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcC5tb3ZlKHRoaXMucmFuZG9tV2Fsa0RpcmVjdGlvbnMuZ2V0KHApKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmRvbVdhbGtEaXJlY3Rpb25zLmRlbGV0ZShwKVxuICAgICAgICAgICAgICAgICAgICBwID0gbmV4dFxuICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHRoaXMuY3VycmVudFJhbmRvbVdhbGtQb3MsIFJBTkRPTV9XQUxLX1BPU19DT0xPUilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zLmVxdWFscyh0aGlzLmN1cnJlbnRQb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF6ZS5zZXRDb2xvcih0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zLCBSQU5ET01fV0FMS19DT0xPUilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hemUuc2V0Q29sb3IodGhpcy5jdXJyZW50UG9zLCBDVVJfUE9TX0NPTE9SKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBnZXRSYW5kb21FbGVtZW50KHRoaXMubWF6ZS5nZXROZWlnaGJvckRpcmVjdGlvbnModGhpcy5jdXJyZW50UmFuZG9tV2Fsa1BvcykpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSYW5kb21XYWxrRGlyZWN0aW9uKGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zID0gdGhpcy5jdXJyZW50UmFuZG9tV2Fsa1Bvcy5tb3ZlKGRpcmVjdGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLm1hemUuc2V0Q29sb3IodGhpcy5jdXJyZW50UmFuZG9tV2Fsa1BvcywgUkFORE9NX1dBTEtfUE9TX0NPTE9SKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgbm9uVXN0UG9zaXRpb25zID0gdGhpcy5tYXplLmFsbFBvc2l0aW9ucygpLmZpbHRlcihwID0+ICF0aGlzLnVzdC5oYXMocCkpXG4gICAgICAgICAgICBpZiAobm9uVXN0UG9zaXRpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2hlZCA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UG9zID0gZ2V0UmFuZG9tRWxlbWVudChub25Vc3RQb3NpdGlvbnMpXG4gICAgICAgICAgICAgICAgdGhpcy5tYXplLnNldENvbG9yKHRoaXMuY3VycmVudFBvcywgQ1VSX1BPU19DT0xPUilcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSYW5kb21XYWxrUG9zID0gdGhpcy5jdXJyZW50UG9zXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JhbmRvbVdhbGsgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7IE1hemUsIE1hemVBbGdvcml0aG0gfSBmcm9tIFwiLi4vQWxnb3JpdGhtcy9NYXplXCJcbmltcG9ydCB7IE1hemVEaXNwbGF5IH0gZnJvbSBcIi4vTWF6ZURpc3BsYXlcIlxuXG5pbXBvcnQgXCIuL0FwcC5jc3NcIlxuaW1wb3J0IHsgUmVjdXJzaXZlQmFja3RyYWNrZXIgfSBmcm9tIFwiLi4vQWxnb3JpdGhtcy9SZWN1cnNpdmVCYWNrdHJhY2tlclwiXG5pbXBvcnQgeyBLcnVza2FsIH0gZnJvbSBcIi4uL0FsZ29yaXRobXMvS3J1c2thbFwiXG5pbXBvcnQgeyBXaWxzb24gfSBmcm9tIFwiLi4vQWxnb3JpdGhtcy9XaWxzb25cIlxuaW1wb3J0IHsgUmVjdXJzaXZlRGl2aXNpb24gfSBmcm9tIFwiLi4vQWxnb3JpdGhtcy9SZWN1cnNpdmVEaXZpc2lvblwiXG5cbmxldCBhbGdvcml0aG06IE1hemVBbGdvcml0aG0gPSBuZXcgUmVjdXJzaXZlQmFja3RyYWNrZXIobmV3IE1hemUoOCwgOCkpXG5jb25zdCBCQUNLVFJBQ0tFUiA9IFwiUmVjdXJzaXZlIGJhY2t0cmFja2VyXCJcbmNvbnN0IEtSVVNLQUwgPSBcIktydXNrYWxcIlxuY29uc3QgV0lMU09OUyA9IFwiV2lsc29uJ3NcIlxuY29uc3QgRElWSVNJT04gPSBcIlJlY3Vyc2l2ZSBkaXZpc2lvblwiXG5jb25zdCBERUZBVUxUX0NPTFMgPSA4XG5jb25zdCBERUZBVUxUX1JPV1MgPSA4XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHAoKSB7XG4gICAgY29uc3QgW2ZvcmNlVXBkYXRlRmxhZywgc2V0Rm9yY2VVcGRhdGVGbGFnXSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gICAgZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIHNldEZvcmNlVXBkYXRlRmxhZyghZm9yY2VVcGRhdGVGbGFnKVxuICAgIH1cblxuICAgIGNvbnN0IFthbGdvTmFtZSwgc2V0QWxnb05hbWVdID0gdXNlU3RhdGUoQkFDS1RSQUNLRVIpXG4gICAgY29uc3QgW21hemVDb2xzLCBzZXRNYXplQ29sc10gPSB1c2VTdGF0ZShERUZBVUxUX0NPTFMpXG4gICAgY29uc3QgW21hemVSb3dzLCBzZXRNYXplUm93c10gPSB1c2VTdGF0ZShERUZBVUxUX1JPV1MpXG5cbiAgICBmdW5jdGlvbiBvblNlbGVjdE5Sb3dzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgIGlmIChyb3dzID4gMSkge1xuICAgICAgICAgICAgc2V0TWF6ZVJvd3Mocm93cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2VsZWN0TkNvbHMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY29scyA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgaWYgKGNvbHMgPiAxKSB7XG4gICAgICAgICAgICBzZXRNYXplQ29scyhjb2xzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdGVwQ2xpY2soKSB7XG4gICAgICAgIGFsZ29yaXRobS5zdGVwKClcbiAgICAgICAgZm9yY2VVcGRhdGUoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoQ2xpY2soKSB7XG4gICAgICAgIHdoaWxlICghYWxnb3JpdGhtLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgYWxnb3JpdGhtLnN0ZXAoKVxuICAgICAgICB9XG4gICAgICAgIGZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgICAgICBjb25zdCBtYXplID0gbmV3IE1hemUobWF6ZUNvbHMsIG1hemVSb3dzKVxuICAgICAgICBpZiAoYWxnb05hbWUgPT0gQkFDS1RSQUNLRVIpIHtcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IG5ldyBSZWN1cnNpdmVCYWNrdHJhY2tlcihtYXplKVxuICAgICAgICB9IGVsc2UgaWYgKGFsZ29OYW1lID09IEtSVVNLQUwpIHtcbiAgICAgICAgICAgIGFsZ29yaXRobSA9IG5ldyBLcnVza2FsKG1hemUpXG4gICAgICAgIH0gZWxzZSBpZiAoYWxnb05hbWUgPT0gV0lMU09OUykge1xuICAgICAgICAgICAgYWxnb3JpdGhtID0gbmV3IFdpbHNvbihtYXplKVxuICAgICAgICB9IGVsc2UgaWYgKGFsZ29OYW1lID09IERJVklTSU9OKSB7XG4gICAgICAgICAgICBhbGdvcml0aG0gPSBuZXcgUmVjdXJzaXZlRGl2aXNpb24obWF6ZSlcbiAgICAgICAgfVxuICAgICAgICBmb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmVzdGFydCgpXG4gICAgfSwgW2FsZ29OYW1lLCBtYXplQ29scywgbWF6ZVJvd3NdKVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbC1wYW5lbFwiPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250cm9sLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5BbGdvcml0aG08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udHJvbFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFsZ29OYW1lKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+e0JBQ0tUUkFDS0VSfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbj57S1JVU0tBTH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24+e1dJTFNPTlN9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uPntESVZJU0lPTn08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2wtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk51bWJlciBvZiBjb2x1bW5zPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udHJvbFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX0NPTFN9IFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0TkNvbHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2wtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk51bWJlciBvZiByb3dzPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udHJvbFwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXtERUZBVUxUX1JPV1N9IFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0TlJvd3N9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250cm9sLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXthbGdvcml0aG0uaXNGaW5pc2hlZCgpfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uU3RlcENsaWNrfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBTdGVwXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb250cm9sXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXthbGdvcml0aG0uaXNGaW5pc2hlZCgpfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uRmluaXNoQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbmlzaFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZXN0YXJ0fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBSZXN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hemUtcGFuZWxcIj5cbiAgICAgICAgICAgICAgICA8TWF6ZURpc3BsYXkgbWF6ZSA9IHthbGdvcml0aG0ubWF6ZX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn1cbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7IFBvc2l0aW9uLCBNYXplIH0gZnJvbSBcIi4uL0FsZ29yaXRobXMvTWF6ZVwiO1xuXG5pbXBvcnQgXCIuL01hemVEaXNwbGF5LmNzc1wiXG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgbWF6ZTogTWF6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTWF6ZURpc3BsYXkoe21hemV9OiBQcm9wcykge1xuICAgIGNvbnN0IHdpZHRoID0gbWF6ZS5uQ29sdW1ucygpXG4gICAgY29uc3QgaGVpZ2h0ID0gbWF6ZS5uUm93cygpXG5cbiAgICBsZXQgY2VsbHMgPSBbXVxuXG4gICAgZm9yIChsZXQgWCA9IDA7IFggPCB3aWR0aDsgWCsrKSB7XG4gICAgICAgIGZvciAobGV0IFkgPSAwOyBZIDwgaGVpZ2h0OyBZKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IG5ldyBQb3NpdGlvbihYLCBZKVxuICAgICAgICAgICAgY2VsbHMucHVzaCgoXG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ge1ggKyBcIl9cIiArIFl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2VsbFwiICsgXG4gICAgICAgICAgICAgICAgICAgICAgICAobWF6ZS5pc09wZW4ocG9zLCBcIm5vcnRoXCIpID8gXCIgbm9ydGgtb3BlblwiIDogXCJcIikgKyBcbiAgICAgICAgICAgICAgICAgICAgICAgIChtYXplLmlzT3Blbihwb3MsIFwid2VzdFwiKSA/IFwiIHdlc3Qtb3BlblwiIDogXCJcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IHt7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkUm93OiBoZWlnaHQgLSBZLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZENvbHVtbjogWCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG1hemUuZ2V0Q29sb3IocG9zKVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IFwibWF6ZVwiXG4gICAgICAgICAgICBzdHlsZSA9IHt7XG4gICAgICAgICAgICAgICAgYXNwZWN0UmF0aW86IGAke3dpZHRofSAvICR7aGVpZ2h0fWAsXG4gICAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogYHJlcGVhdCgke3dpZHRofSwgMWZyKWAsXG4gICAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlUm93czogYHJlcGVhdCgke2hlaWdodH0sIDFmcilgXG4gICAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgICB7Y2VsbHN9XG4gICAgICAgIDwvZGl2PlxuICAgIClcbn0iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCJcblxuaW1wb3J0IHsgQXBwIH0gZnJvbSBcIi4vQ29tcG9uZW50cy9BcHBcIlxuaW1wb3J0IFwiLi9pbmRleC5jc3NcIlxuXG5jb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuZWxlbWVudC5jbGFzc05hbWUgPSBcInJvb3RcIlxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KVxuY3JlYXRlUm9vdChlbGVtZW50KS5yZW5kZXIoPEFwcC8+KVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua21hemVfYWxnb3JpdGhtc1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmttYXplX2FsZ29yaXRobXNcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c3hcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==