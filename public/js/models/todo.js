define(['backbone'],function(Backbone){
   var TodoModel = Backbone.Model.extend({
       default:{
           content:"Empty Todo"
       },
       initialize:function(){
           console.log("initialized TodoModel");
       }
   });

    return TodoModel;

});