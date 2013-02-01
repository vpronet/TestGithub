// Dùng mocha cho unit test
var assert = require("assert")
/*
describe('Array', function(){
    describe( '#indexOf()' , function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})*/

function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite('Array');

test( '#length' , function(){
    var arr = [1,2,3];
    ok(arr.length == 3);
});

test( '#indexOf()' , function(){
    var arr = [1,2,3];
    ok(arr.indexOf(1) == 0);
    ok(arr.indexOf(2) == 1);
    ok(arr.indexOf(3) == 2);
});

suite('String');

test( '#length' , function(){
    ok('foo'.length == 3);
});