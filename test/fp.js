var Error = function(str) { this._value = str; };
Error.prototype = new String;
Error.prototype.toString = function() { return this._value; };

Error.map = function(f) {
    return function(x) {
        if (x instanceof Error) return x;
        else return f(x);
    }
}

function curry2(f) {
    return function(x) {
        return function(y) {
            return f(x, y);
        }
    }
}

var andThen = function() {
    var funcs = arguments;
    return function() {
        var args = arguments;
        for (var i = 0; i < funcs.length; i++) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
};

function add(x, y) { return x + y; }
var add1 = add;

var res = 0;
res = add1(res, 6);
res = add1(res, 7);
res = add1(res, 9);
res = add1(res, -3);
console.log("res1: " + res);

var addc = curry2(add);
var add2 = addc;

var res = andThen(add2(6), add2(7), add2(9), add2(-3))(0);
console.log("res2: " + res.toString());

var res = 0;
res = add(res, 6);
if (!isNaN(res) && res >= 0 && res <= 20) {
    res = add(res, 7);
    if (!isNaN(res) && res >= 0 && res <= 20) {
        res = add(res, 9);
        if (!isNaN(res) && res >= 0 && res <= 20) {
            res = add(res, -3);
			if (!isNaN(res) && res >= 0 && res <= 20) {
			} else res = new Error("Wrong number: " + res);
        } else res = new Error("Wrong number: " + res);
    } else res = new Error("Wrong number: " + res);
} else res = new Error("Wrong number: " + res);
console.log("res3: " + res.toString());

function ek20(x) {
    if (!isNaN(x) && x >= 0 && x <= 20) return x;
    else return new Error("Wrong number: " + x);
}

var ek20m = Error.map(ek20);
var addm = function(x) { return Error.map(addc(x)); };
var add1 = function(res, x) { return ek20m(addm(x)(res)); };

var res = 0;
res = add1(res, 6);
res = add1(res, 7);
res = add1(res, 9);
res = add1(res, -3);
console.log("res4: " + res.toString());

var add2 = function(x) { return function(res) { return ek20m(addm(x)(res)); } };

var res = andThen(add2(6), add2(7), add2(9), add2(-3))(0);
console.log("res5: " + res.toString());
// vim: set ts=4 sw=4 sts=4 noexpandtab :
