/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 5:01 PM
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','underscore','backbone','text!templates/HeaderView.html'],function($,_,Backbone,HeaderTemplate){

    var HeaderView = Backbone.View.extend({
     el: $('.header'),

    template:_.template(HeaderTemplate),

    initialize: function () {
        console.log("initialized HeaderView");
        this.render();
    },

    render: function () {

        $(this.el).html(this.template());
        return this;
    }

});
    return HeaderView;
});


