/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 1:37 AM
 * To change this template use File | Settings | File Templates.
 */
define(['backbone'],function(Backbone){
    var CardsModel = Backbone.Model.extend({
        default:{
            content:"Empty Todo"
        },
        initialize:function(){
            // khoi tao bo bai

        }
    });

    return CardsModel;

});