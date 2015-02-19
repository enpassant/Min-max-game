// NEW ONE
// Test: new Game().start(1,1,[ [1, 2, 3], [4, 5, 6], [3, 1, 3]]);
(function(scope, undefined){
	var Game = function(){
		this.MODE = [];

		this.start = function(m1, m2, arr, width){
			var TABLE = this.formatArray(arr, width),
				w = TABLE.length,
				h = TABLE[0].length,
				total = TABLE[0][0];

			this.getModes(TABLE);

			for(var i=0,j=0,atck=true; i+j<w+h-2; atck=!atck){
				if(i===w-1) j++;
				else if(j===h-1) i++;
				else if(this.Step(atck, atck?m1:m2, i, j)) i++;
				else j++;

				if(atck) total += TABLE[i][j];
			}

			return total;
		};

		this.getModes = function(TABLE){
			// JUST CHOOSE MAX/MIN
			this.MODE[0] = TABLE;
			// CHOOSE BEST PATH
			this.MODE[1] = this.createArray(TABLE, function(arr,r,c){
				return Math.max(arr[r][c+1], arr[r+1][c]);
			}.bind(this));
			// CALCULATE ENEMY TOO
			this.MODE[2] = this.createArray(TABLE, function(arr,r,c){
				if((r+c)%2===0) return Math.max(arr[r][c+1], arr[r+1][c]);
				else return Math.min(this.MODE[1][r][c+1], this.MODE[1][r+1][c]);
			}.bind(this));
		};

		this.Step = function(atck, m, r, c){
			return atck === (this.MODE[m][r][c+1] < this.MODE[m][r+1][c]);
		}

		this.createArray = function(TABLE, method){
			var A = [],
				w = TABLE.length,
				h = TABLE[0].length;

			for(var i=w-1; i>=0; i--){
				A[i] = [];

				for(var j=h-1; j>=0; j--){
					A[i][j] = TABLE[i][j];

					if(i===w-1 && j===h-1) continue;
					if(i===w-1 && j<h-1) A[i][j] += A[i][j+1];
					else if(j===h-1) A[i][j] += A[i+1][j];
					else A[i][j] += method(A,i,j);
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

	scope["Game"] = Game;
})(this);

// vim: set ts=4 sw=4 sts=4 noexpandtab :
