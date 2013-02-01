/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 2:24 PM
 * To change this template use File | Settings | File Templates.
 */
module.exports = function (app, models) {
    app.get('/rooms/:id', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;

        // Check Login

        //

        /*models.Account.findById(accountId, function(account) {
            if ( accountId == 'me' || models.Account.hasContact(account, req.session.accountId) ) {
                account.isFriend = true;
            }
            res.send(account);
        });*/
    });

    // Khi user navigate to URL : /rooms -->
    app.get('/rooms', function(req, res) {
          console.log('Tham gia sanh cho');
          var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
          //Check Login
          //Lay tat ca phong choi tu mongo, or redis

          //Lay danh sach ban be
          //res.send(roomInfo,friendList);
    });

    app.post('/rooms/create/:id', function(req, res) {
        console.log('Tao phong choi moi');
    });

    app.delete('/rooms/delete/:id', function(req, res) {
        console.log('Xoa phong choi');
    });


}