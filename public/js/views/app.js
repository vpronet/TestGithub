define(['jquery','backbone','views/todo','models/todo','collections/todo','views/header'],
    function($,Backbone,TodoView, TodoModel,TodoCollection,HeaderView){

    var AppView = Backbone.View.extend({

        routes:{
            "":"home",
            "about":"about",
            "money":"money",
            "room":"room",
            "friend":"friend",
            "login":"login",
            "test":"test"
        },


        el:$("#placeholder"),

        initialize:function(){
            console.log('here');
            var headerView = new HeaderView();
            //var elem1 = this.el;
            //elem1.append(headerView.el);

            //alert(JSON.stringify(headerView));
            //alert(headerView.toSource());
              console.log(headerView);

            //$('.header').html(this.headerView.el);
            //this.render();

            console.log("initialized AppView")
            this.todos = new TodoCollection();
            this.todos.bind('all',this.render,this);
            this.todos.fetch();

        },
        render:function(){

            console.log("fetched content");
            console.log("rendered AppView");
            var elem = this.el;
            elem.html("");
            this.todos.each(function(model){
                console.log(model.get("content"));
                var todoView = new TodoView({model:model});
                elem.append(todoView.el);
            });
//            var todoModel = new TodoModel({content:"New Content"});
//            console.dir(todoModel);
//            var todoView = new TodoView({model:todoModel});
//
//            this.el.html(todoView.el);


        }

    });

    return AppView
});