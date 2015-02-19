var assert = require("assert")
    , game = require('../modes')

var arr = [ [1, 2, 3],
            [4, 5, 6],
            [3, 1, 3]];

var arr1 = [[11, 8, 6],
            [10, 6, 6],
            [1, 1, 0]];

var arr2 = [[9, 8, 6],
            [5, 6, 6],
            [1, 1, 0]];

var Game = new game.Game();
Game.start(1, 1, arr);

describe("Game's", function(){
    describe('getModes function', function() {
        it('must be exists', function() {
            assert.equal(typeof Game.getModes, "function");
        })
    })

    describe('MODE[0]', function() {
        it('should contains the arr values', function() {
            assert.deepEqual(arr, game.MODE[0]);
        })
    })

    describe('MODE[1]', function() {
        it('should contains the arr1 values', function() {
            assert.deepEqual(arr1, game.MODE[1]);
        })
    })

    describe('MODE[2]', function() {
        it('should contains the arr2 values', function() {
            assert.deepEqual(arr2, game.MODE[2]);
        })
    })
})
