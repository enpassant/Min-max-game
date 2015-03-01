// NEW ONE
// Test: new Game().start(1,1,[ [1, 2, 3], [4, 5, 6], [3, 1, 3]]);
(function(scope, undefined){
	scope["Game"] = function(){
		this.start = function(m1, m2, arr, width){
			var TABLE = this.formatArray(arr, width);

			var MODE = this.getModes(TABLE);
			return this.play(m1, m2, TABLE, MODE);
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
			else return cell1 || cell2 || def;
		};

		this.getCell = function(arr, i, j, def) {
			if (arr[i] && arr[i][j]) return arr[i][j];
			else return def;
		};

		this.getModes = function(TABLE) {
			// CHOOSE BEST PATH
			MODE_1 = this.createArray(TABLE, function(arr,r,c){
				return this.applyFnOnCells(arr, r, c, Math.max, 0);
			}.bind(this));
			// CALCULATE ENEMY TOO
			MODE_2 = this.createArray(TABLE, function(arr,r,c){
				if((r+c)%2===0) return this.applyFnOnCells(arr, r, c, Math.max, 0);
				else return this.applyFnOnCells(MODE_1, r, c, Math.min, 0);
			}.bind(this));
			return [ TABLE, MODE_1, MODE_2 ];
		};

		this.Step = function(MODE, atck, m, r, c){
			return atck === (this.getCell(MODE[m], r, c+1, 0) <
				   this.getCell(MODE[m], r+1, c, 0));
		}

		this.createArray = function(TABLE, method){
			var A = [],
				w = TABLE.length,
				h = TABLE[0].length;

			for(var i=w-1; i>=0; i--){
				A[i] = [];

				for(var j=h-1; j>=0; j--){
					A[i][j] = TABLE[i][j] + method(A, i, j);
				}
			}

			console.log("Max: " + A[0][0]);
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
	};
})(this);
// vim: set ts=4 sw=4 sts=4 noexpandtab :
