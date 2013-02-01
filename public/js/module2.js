/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 12:56 AM
 * To change this template use File | Settings | File Templates.
 */
define(['module1'], function(Module1){
    console.log("Module 2 load in module2 class...");
    var Module2 = {
        Name:"module2"
    }
    return Module2;
})