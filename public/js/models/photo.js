/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/31/13
 * Time: 4:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(['backbone'],function(Backbone){
    var Photo = Backbone.Model.extend({
        defaults: {
            src: 'placeholder.jpg',
            title: 'an image placeholder',
            coordinates: [0,0]
        },
        initialize: function(){
            this.on("change:Src", function(){
                var src = this.get("src");
                console.log('Image source updated to ' + src);
            });
        },
        changeSrc: function( source ){
            this.set({ src: source });
        }
    });

    var somePhoto = new Photo({ src: "test.jpg", title:"testing"});
    somePhoto.changeSrc("magic.jpg"); // which triggers "change:src" and logs an update message to the console

});
