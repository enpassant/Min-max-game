// NEW ONE
// Test: new Game().start(1,1,[ [1, 2, 3], [4, 5, 6], [3, 1, 3]]);
(function(scope, undefined){
	scope["Game"] = function(){
		this.start = function(m1, m2, arr, width){
			var TABLE = this.formatArray(arr, width);
			console.log(TABLE);

			var MODE = this.getModes(TABLE);
			return this.play(m1, m2, TABLE, MODE);
		};

		this.tournament = function(scores) {
			var width = this.random(5, 6);
			var height = this.random(5, 6);
			var arr = [];

			for(var i=width-1; i>=0; i--){
				arr[i] = [];

				for(var j=height-1; j>=0; j--){
					arr[i][j] = this.random(1, 20);
				}
			}
			var TABLE = this.formatArray(arr, width);

			var MODE = this.getModes(TABLE);
			if (scores === undefined) {
				var scores = [];
				for(var i=0; i<MODE.length; i++) {
					scores[i] = 0;
				}
			}

			for(var i=0; i<MODE.length - 1; i++) {
				for(var j=i+1; j<MODE.length; j++) {
					var match1 = this.play(i, j, TABLE, MODE);
					var match2 = this.play(j, i, TABLE, MODE);
					if (match1 > match2) {
						scores[i] += 2;
					} else if (match1 < match2) {
						scores[j] += 2;
					} else {
						scores[i] += 1;
						scores[j] += 1;
					}
				}
			}
			return scores;
		};

		this.play = function(m1, m2, TABLE, MODE){
			var	w = TABLE.length,
				h = TABLE[0].length,
				total = TABLE[0][0];

			for(var i=0,j=0,atck=true; i+j<w+h-2; atck=!atck){
				if(i===w-1) j++;
				else if(j===h-1) i++;
				else if(this.Step(MODE, atck, atck?m1:m2, i, j)) i++;
				else j++;

				if(atck) total += TABLE[i][j];
			}

			return total;
		};

		this.applyFnOnCells = function(arr, i, j, fn, def) {
			var cell1 = this.getCell(arr, i, j+1, undefined);
			var cell2 = this.getCell(arr, i+1, j, undefined);
			if (cell1 !== undefined && cell2 !== undefined) return fn(cell1, cell2);
			else if (cell1 !== undefined) return fn(cell1)
			else if (cell2 !== undefined) return fn(cell2)
			else return fn(def);
		};

		this.getCell = function(arr, i, j, def) {
			if (arr[i] && arr[i][j]) return arr[i][j];
			else return def;
		};

		this.getModes = function(TABLE) {
			// CHOOSE BEST PATH
			MODE_1 = this.createArray(TABLE, function(arr,r,c){
				return TABLE[r][c] + this.applyFnOnCells(arr, r, c, Math.max, 0);
			}.bind(this));
			// CALCULATE ENEMY TOO
			MODE_2 = this.createArray(TABLE, function(arr,r,c){
				if((r+c)%2===0) return TABLE[r][c] + this.applyFnOnCells(arr, r, c, Math.max, 0);
				else return TABLE[r][c] + this.applyFnOnCells(MODE_1, r, c, Math.min, 0);
			}.bind(this));
			// BEST ALGORITHM
			MODE_3 = this.createArray(TABLE, function(arr,r,c) {
				var player1 = function(x, y) {
					var value = this.getCell(TABLE, r, c,0);
					if (y === undefined) return value + x;
					return Math.min(value+y,value+x);
				}.bind(this)
				var player2 = function(x, y) {
					if (y === undefined) return x;
					return Math.max(x, y);
				}
				if((r+c)%2===0) return this.applyFnOnCells(arr, r, c, player2, TABLE[r][c]);
				else return this.applyFnOnCells(arr, r, c, player1, 0);
			}.bind(this));
			return [ TABLE, MODE_1, MODE_2, MODE_3 ];
		};

		this.Step = function(MODE, atck, m, r, c){
			return atck === (this.getCell(MODE[m], r, c+1, 0) <
				   this.getCell(MODE[m], r+1, c, 0));
		}

		this.createArray = function(TABLE, method){
			var A = [];

			for(var i=TABLE.length-1; i>=0; i--){
				A[i] = [];

				for(var j=TABLE[i].length-1; j>=0; j--){
					A[i][j] = method(A, i, j);
				}
			}

			return A;
		}

		this.formatArray = function(arr, w){
			var A = [];

			if(!Array.isArray(arr[0])){
				if(w){
					for(var i=0; i<arr.length; i++){
						if(i%w===0) A[i/w] = [arr[i]];
						else A[Math.floor(i/w)].push(arr[i]);
					}
				}else A = [arr];
			}else A = arr;

			for(var i=0; i<A.length; i++){
				for(var j=0; j<A[0].length; j++){
					if((i+j)%2===0 && (i>0 || j>0)) A[i][j] = 0;
				}
			}

			return A;
		}

		this.random = function(min, max) {
			return Math.floor((Math.random() * (max - min + 1)) + min);
		};
	};
})(this);
// vim: set ts=4 sw=4 sts=4 noexpandtab :
