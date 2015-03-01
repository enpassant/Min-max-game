var assert = require("assert")
    , game = require('../game')

var arr = [ [1, 2, 3],
            [4, 5, 6],
            [3, 1, 3]];

var arr1 = [[11, 8, 6],
            [10, 6, 6],
            [1, 1, 0]];

var arr2 = [[9, 8, 6],
            [5, 6, 6],
            [1, 1, 0]];

var arr3 = [[8, 8, 6],
            [5, 6, 6],
            [1, 1, 0]];

var bigArr = [ [ 3, 8, 0, 13, 0 ],
  [ 13, 0, 18, 0, 1 ],
  [ 0, 17, 0, 14, 0 ],
  [ 14, 0, 1, 0, 12 ],
  [ 0, 9, 0, 18, 0 ],
  [ 7, 0, 14, 0, 8 ] ];

var bigArr3 = [ [61,60,52,34,21],
    [61,52,52,34,21],
    [48,48,34,34,20],
    [45,31,27,26,20],
    [31,31,26,26,8],
    [29,22,22,8,8]];

var Game = new game.Game();

describe("Game's function", function(){
    describe('getCell', function() {
        it('must be return 0 outside', function() {
            assert.equal(Game.getCell(arr, 0, -1, 0), 0);
            assert.equal(Game.getCell(arr, -1, 0, 0), 0);
            assert.equal(Game.getCell(arr, -1, -1, 0), 0);
            assert.equal(Game.getCell(arr, 3, 0, 0), 0);
            assert.equal(Game.getCell(arr, 0, 3, 0), 0);
            assert.equal(Game.getCell(arr, 3, 3, 0), 0);
        })
        it('must be return non 0 inside', function() {
            assert.equal(Game.getCell(arr, 0, 0), 1);
            assert.equal(Game.getCell(arr, 0, 1), 2);
            assert.equal(Game.getCell(arr, 1, 0), 4);
            assert.equal(Game.getCell(arr, 1, 1), 5);
            assert.equal(Game.getCell(arr, 2, 0), 3);
            assert.equal(Game.getCell(arr, 2, 2), 3);
        })
    })
    describe('applyFnOnCells', function() {
        it('must be return good values', function() {
            assert.equal(Game.applyFnOnCells(arr, 0, 0, Math.max, 0), 4);
            assert.equal(Game.applyFnOnCells(arr, 0, 2, Math.max, 0), 6);
            assert.equal(Game.applyFnOnCells(arr, 2, 0, Math.max, 0), 1);
            assert.equal(Game.applyFnOnCells(arr, 2, 1, Math.max, 0), 3);
            assert.equal(Game.applyFnOnCells(arr, 2, 2, Math.max, 0), 0);
        })
    })
    describe('getModes', function() {
        it('must be exists', function() {
            assert.equal(typeof Game.getModes, "function");
        })
    })
})

describe("Game's", function(){
    var result;
    var MODE;

    before(function() {
        result = Game.start(1, 1, arr);
        MODE = Game.getModes(arr);
    })

    describe('result', function() {
        it('must be 6', function() {
            assert.equal(result, 6);
        })
    })

    describe('MODE[0]', function() {
        it('should contains the arr values', function() {
            assert.deepEqual(arr, MODE[0]);
        })
    })

    describe('MODE[1]', function() {
        it('should contains the arr1 values', function() {
            assert.deepEqual(arr1, MODE[1]);
        })
    })

    describe('MODE[2]', function() {
        it('should contains the arr2 values', function() {
            assert.deepEqual(arr2, MODE[2]);
        })
    })

    describe('MODE[3]', function() {
        it('should contains the arr3 values', function() {
            assert.deepEqual(arr3, MODE[3]);
        })
    })
})

describe("Game's at bigArr", function(){
    var result1;
    var result2;
    var MODE;

    before(function() {
        result1 = Game.start(2, 3, bigArr);
        result2 = Game.start(3, 2, bigArr);
        MODE = Game.getModes(bigArr);
    })

    describe('result', function() {
        it('must be 64', function() {
            assert.equal(result1, 64);
            assert.equal(result2, 64);
        })
    })

    describe('MODE[3]', function() {
        it('should contains the arr3 values', function() {
            assert.deepEqual(bigArr3, MODE[3]);
        })
    })
})

describe("Tournament's", function(){
    describe('length', function() {
        it('must be 4', function() {
            var scores = Game.tournament();
            for (var i = 0, len = 20; i < len; i++) {
                scores = Game.tournament(scores);
                console.log(scores);
                assert.equal(scores.length, 4);
            }
        })
    })
})
