/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 12:34 AM
 * To change this template use File | Settings | File Templates.
 */
require.config({
    paths:{
        jquery:'libs/jquery/jquery-min',
        underscore:'libs/underscore/underscore-min',
        backbone:'libs/backbone/backbone-min',
        bootstrap:'libs/bootstrap/bootstrap.min',
        text:'libs/require/text',
        sockets: '/socket.io/socket.io',
        models: 'models',
        templates: 'templates'
    }
})

require(['models/photo'],function(PhotoModel){
    var photoModel = new PhotoModel();

 });

/*require(['views/app'],function(AppView){
    var appView = new AppView;
});*/

/*
require (['module2'],function(){
      console.log("Load module 2");
})
*/
