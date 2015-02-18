(function(scope, undefined){
	var Table, Results, Rows, Columns, aStart, bCollect,
		Player = function(){
			if(Array.isArray(arguments[0])){
				Table = arguments[0];
				Rows = Table.length;
				Columns = Table[0].length;
			}else{
				if(arguments.length===1) arguments[1] = arguments[0];
				Rows = arguments[0] || 10;
				Columns = arguments[1] || 10;
				Table = genTable(Rows, Columns, arguments[2] || 10);
			}
			
			return Rows*Columns;
		};
	
	Player.play = function(aS, bC){
		var i = 0,
			j = 0,
			attack = aS!==undefined ? aS : true,
			sum = Table[0][0],
			moves = [];
		aStart = attack,
		bCollect = bC!==undefined ? bC : false;
		Results = [];
		
		while(i<Rows-1 || j<Columns-1){
			if(i===Rows-1 || ( j!==Columns-1 && attack===(getBest(i+1,j)<getBest(i,j+1)) ))
				moves[i + (j++)] = true;
			else moves[(i++) + j] = false;
			
			if(attack || bCollect) sum += Table[i][j];
			attack = !attack;
		}
		
		console.log("Sum: " + sum);
		console.log("Best: " + getBest(0,0));
		console.log("Moves: " + moves.map(function(b){return b?'j':'l';}).join(""));
		return sum;
	};
	
	function genTable(r, c, max){
		var T = [];
		for(var i=0; i<r; i++){
			T[i] = [];
			for(var j=0; j<c; j++){
				T[i][j] = Math.floor(Math.random()*(max+1));
			}
		}
		return T;
	}
	
	function getBest(r, c){
		if(r>=Rows || c>=Columns) return 0;
		var max = Math.max(getBest(r,c+1), getBest(r+1,c));
		if(aStart===((r+c)%2===0) && !bCollect) return max;
		if(!Results[r*Columns+c]) Results[r*Columns+c] = max + Table[r][c];
		return Results[r*Columns+c];
	}
	
	scope["Player"] = Player;
})(window);