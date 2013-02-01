/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/31/13
 * Time: 2:31 PM
 * To change this template use File | Settings | File Templates.
 */
define(['backbone'],function(Backbone){
    var RoomModel = Backbone.Model.extend({

        /*default:{
            id : "1",
            name:"",
            minBet: 100,
            maxBet: 1000,
            passwordProtected : "vtc",
            isOnline : true,
            listPlayer: []
        },*/

        default:{
            content:"thisisRoomModel"
        },

        initialize:function(){
            console.log("initialized RoomModel");
        }
    });
    return RoomModel;
});



