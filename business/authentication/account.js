/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/30/13
 * Time: 1:59 PM
 * To change this template use File | Settings | File Templates.
 */
/*
 The account model is the main point of contact between Node.js and the MongoDB
 database.
 */

// Xử lý business của game liên quan đến account người dùng.

module.exports = function (app, config, mongoose, Status, nodemailer) {
    var crypto = require('crypto');

    // Schema trong database
    var Status = new mongoose.Schema({
        name: {
            first:   { type: String },
            last:    { type: String }
        },
        status:    { type: String }
    });

    // Set up options
    var schemaOptions = {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    };

// Schema contact object
    var Contact = new mongoose.Schema({
        name: {
            first:   { type: String },
            last:    { type: String }
        },
        accountId: { type: mongoose.Schema.ObjectId },
        added:     { type: Date },     // When the contact was added
        updated:   { type: Date }      // When the contact last updated
    }, schemaOptions);

    Contact.virtual('online').get(function(){
        return app.isAccountOnline(this.get('accountId'));
    });

    // Schema account
    var AccountSchema = new mongoose.Schema({
        email:     { type: String, unique: true },
        password:  { type: String },
        name: {
            first:   { type: String },
            last:    { type: String },
            full:    { type: String }
        },
        birthday: {
            day:     { type: Number, min: 1, max: 31, required: false },
            month:   { type: Number, min: 1, max: 12, required: false },
            year:    { type: Number }
        },
        photoUrl:  { type: String },
        biography: { type: String },
        contacts:  [Contact],  // List
        status:    [Status], // My own status updates only
        activity:  [Status]  //  All status updates including friends
    });

    // Create Instance
    var Account = mongoose.model('Account', AccountSchema);

    var registerCallback = function(err) {
        if (err) {
            return console.log(err);
        };
        return console.log('Account was created');
    };

    // đổi mật khẩu : cập nhật lại DB
    var changePassword = function(accountId, newpassword) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(newpassword);
        var hashedPassword = shaSum.digest('hex');
        Account.update({_id:accountId}, {$set: {password:hashedPassword}},{upsert:false},
            function changePasswordCallback(err) {
                console.log('Change password done for account ' + accountId);
            });
    };

// chức năng quên mật khẩu : gửi mail reset pasword
    var forgotPassword = function(email, resetPasswordUrl, callback) {
        var user = Account.findOne({email: email}, function findAccount(err, doc){
            if (err) {
                // Email address is not a valid user
                callback(false);
            } else {
                var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
                resetPasswordUrl += '?account=' + doc._id;
                smtpTransport.sendMail({
                    from: 'thisapp@example.com',
                    to: doc.email,
                    subject: 'SocialNet Password Request',
                    text: 'Click here to reset your password: ' + resetPasswordUrl
                }, function forgotPasswordResult(err) {
                    if (err) {
                        callback(false);
                    } else {
                        callback(true);
                    }
                });
            }
        });
    };

    // login : truyền vào accountname; password, callback
    // Nếu dùng webservice chọc vào DB ở đây.
    var login = function(email, password, callback) {
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        Account.findOne({ email: email, password: shaSum.digest('hex') }, function (err, doc) {
            //console.log(doc);
            callback(doc);
        });

        //var sql = require("node-sqlserver");
        //var connectionString = "Driver={SQL Server Native Client 11.0};Server={CUONGNV-T420};Database={testdb};Trusted_Connection={Yes};";


        //sql.open(connectionString, function (err, conn) {
        //    if (err) {
        //        console.log(err);
        //        console.log("Cannot open connection.");
        //    }
        //    else {
        //        //var key = req.params.key;
        //        //var culture = req.params.culture;
        //        var res = 0;
        //        var command = "EXEC SP_Authen '" + 100000 + "', '" + email + "', '" + password + "', '"  + [res] + "'";
        //        console.log(command);
        //        //conn.queryRaw("SELECT * FROM [Resource]", function (err, results) {
        //        conn.queryRaw(command, function (err, results) {
        //            if (err) {
        //                console.log(err);
        //                console.log("Cannot retrieve records.");
        //            }
        //            else {
        //                if (results.rows[0] == '100')
        //                    console.log('login success');
        //                else
        //                    console.log('login failure');
        //                //res.json(results);
        //                //console.log(results.rows[0]);
        //                //console.log(res);
        //                var user = new Account({
        //                    email: email,
        //                    password: shaSum.digest('hex')
        //                });

        //                callback(true); // callback dữ liệu
        //            }
        //        });
        //    }
        //});



    };

// search bởi string
    var findByString = function (searchStr, callback) {
        var searchRegex = new RegExp(searchStr, 'i');
        Account.find({
            $or: [
                { 'name.full': { $regex: searchRegex } },
                { email:       { $regex: searchRegex } }
            ]
        }, callback);
    };

// Tìm một account từ database
    var findById = function(accountId, callback) {
        Account.findOne({_id:accountId}, function(err,doc) {
            callback(doc);
        });
    };

    // Thêm một bạn vào danh sách
    var addContact = function(account, addcontact) {
        contact = {
            name: addcontact.name,
            accountId: addcontact._id,
            added: new Date(),
            updated: new Date()
        };
        account.contacts.push(contact);

        account.save(function (err) {
            if (err) {
                console.log('Error saving account: ' + err);
            }
        });
    };

    // Xóa một bạn bè từ list
    var removeContact = function(account, contactId) {
        if ( null == account.contacts ) return;

        account.contacts.forEach(function(contact) {
            if ( contact.accountId == contactId ) {
                account.contacts.remove(contact);
            }
        });
        account.save();
    };

    // Kiểm tra xem account này có danh sách bạn bè không ?
    var hasContact = function(account, contactId) {
        if ( null == account.contacts ) return false;

        account.contacts.forEach(function(contact) {
            if ( contact.accountId == contactId ) {
                return true;
            }
        });
        return false;
    };

// Đăng ký user mới
    var register = function (email, password, firstName, lastName) {
        // mã hóa password
        var shaSum = crypto.createHash('sha256');
        shaSum.update(password);

        console.log('Registering ' + email);

        // Account là schema ở mongoDb
        var user = new Account({
            email: email,
            name: {
                first: firstName,
                last: lastName,
                full: firstName + ' ' + lastName
            },
            password: shaSum.digest('hex')
        });
        // lưu vào mongoDB
        user.save(registerCallback);
        console.log('Save command was sent');
    };

// return object:
    return {
        findById: findById,
        register: register,
        hasContact: hasContact,
        forgotPassword: forgotPassword,
        changePassword: changePassword,
        findByString: findByString,
        addContact: addContact,
        removeContact: removeContact,
        login: login,
        Account: Account
    }
}
