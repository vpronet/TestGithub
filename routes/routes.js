/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 1:59 PM
 * To change this template use File | Settings | File Templates.
 */
/*
 Routing của express
 */

module.exports = function (app, models,dir) {

          app.get('/', function (req, res) {
        res.sendfile(dir + '/index.html');
    });


    // lấy list contacts của 1 user
    app.get('/accounts/:id/contacts', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        models.Account.findById(accountId, function(account) {
            res.send(account.contacts);
        });
    });
    // lấy list hoạt động của 1 user
    app.get('/accounts/:id/activity', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        models.Account.findById(accountId, function(account) {
            res.send(account.activity);
        });
    });
    // lấy list status của 1 user
    app.get('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        models.Account.findById(accountId, function(account) {
            res.send(account.status);
        });
    });

    app.post('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        models.Account.findById(accountId, function(account) {
            status = {
                name: account.name,
                status: req.param('status', '')
            };
            account.status.push(status);

            // Push the status to all friends
            account.activity.push(status);
            account.save(function (err) {
                if (err) {
                    console.log('Error saving account: ' + err);
                } else {
                    app.triggerEvent('event:' + accountId, {
                        from: accountId,
                        data: status,
                        action: 'status'
                    });
                }
            });
        });
        res.send(200);
    });

    app.delete('/accounts/:id/contact', function(req,res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        var contactId = req.param('contactId', null);

        // Missing contactId, don't bother going any further
        if ( null == contactId ) {
            res.send(400);
            return;
        }

        models.Account.findById(accountId, function(account) {
            if ( !account ) return;
            models.Account.findById(contactId, function(contact,err) {
                if ( !contact ) return;

                models.Account.removeContact(account, contactId);
                // Kill the reverse link
                models.Account.removeContact(contact, accountId);
            });
        });

        // Note: Not in callback - this endpoint returns immediately and
        // processes in the background
        res.send(200);
    });

    app.post('/accounts/:id/contact', function(req,res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        var contactId = req.param('contactId', null);

        // Missing contactId, don't bother going any further
        if ( null == contactId ) {
            res.send(400);
            return;
        }

        models.Account.findById(accountId, function(account) {
            if ( account ) {
                models.Account.findById(contactId, function(contact) {
                    models.Account.addContact(account, contact);

                    // Make the reverse link
                    models.Account.addContact(contact, account);
                    account.save();
                });
            }
        });

        // Note: Not in callback - this endpoint returns immediately and
        // processes in the background
        res.send(200);
    });

    app.get('/accounts/:id', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        models.Account.findById(accountId, function(account) {
            if ( accountId == 'me' || models.Account.hasContact(account, req.session.accountId) ) {
                account.isFriend = true;
            }
            res.send(account);
        });
    });
}