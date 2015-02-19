// NEW ONE
(function(scope, undefined){
	var Game = function(){
		var TABLE = [],
			MODE = [];

		this.start = function(m1, m2, arr, width){
			TABLE = this.formatArray(arr, width);
			var w = TABLE.length,
				h = TABLE[0].length,
				total = TABLE[0][0];

			this.getModes();
			scope["MODE"] = MODE;

			for(var i=0,j=0,atck=true; i+j<w+h-2; atck=!atck){
				if(i===w-1) j++;
				else if(j===h-1) i++;
				else if(this.Step(atck, atck?m1:m2, i, j)) i++;
				else j++;

				if(atck) total += TABLE[i][j];
			}

			return total;
		};

		this.getModes = function(){
			// JUST CHOOSE MAX/MIN
			MODE[0] = TABLE;
			// CHOOSE BEST PATH
			MODE[1] = this.createArray(function(arr,r,c){
				return Math.max(arr[r][c+1], arr[r+1][c]);
			});
			// CALCULATE ENEMY TOO
			MODE[2] = this.createArray(function(arr,r,c){
				if((r+c)%2===0) return Math.max(arr[r][c+1], arr[r+1][c]);
				else return Math.min(MODE[1][r][c+1], MODE[1][r+1][c]);
			});
		};

		this.Step = function(atck, m, r, c){
			return atck === (MODE[m][r][c+1] < MODE[m][r+1][c]);
		}

		this.createArray = function(method){
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
