Some basic min/max game js test.

#About the game:

######The concept of the game is simple:
* You start in the top left corner of a table and 2 players move in turn.
* Every round one can move 1 right or 1 down.
* When *player 1* moves, he gets the points at the place he moved to.
* Game is over when you reach the bottom right corner.
* *Player 1*'s goal is to get the maximum points possible.
* *Player 2*'s goal is to make *player 1* reach minimum points.


#Usage:

###Basic:

```js
Start(mode1, mode2, array [,columns]);
```

###Parameters:
**mode1:** 1st player's mode

**mode2:** 2nd player's mode

**array:** (array of arrays -or- array of values) the values of each place on the table

**columns:** required when *"array"* isn't nested (containes values, not arrays)

####Modes:
**0:** most simple: choose bigger/smaller from the one below and the one on the right

**1:** basic: calculate wich way you can get the max and decide based on *"mode 0"*

**2:** improved: use *"mode 1"*, but also consider that other player uses *"mode 1"*, so improve the method based on that

#Examples:

```js
// 3x2 array
Start(1, 1, [[0,1,2],[3,4,5]]);

// or the exact same in other way:
Start(1, 1, [0,1,2,3,4,5], 3);


/* Array:
0 1 2
3 4 5
*/
```
