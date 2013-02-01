/*
   File này chứa tất cả config của game:
   - Môi trường
   - Connection String
   - Key Mã hóa
   - Các giá trị là hằng số (URL khác.)

*/

module.exports = {
    service: "SendGrid",
    host: "smtp.sendgrid.net",
    port: 587,
    secureConnection: false,
    auth: {
        user: "cuongnv",
        pass: "123456"
    },
    ignoreTLS: false,
    debug: false,
    maxConnections: 5, // Default is 5

// version
    version: '0.0.1',
// connection string

//

    server: {
        production: {
            real_time_server: { port: 3001, host: '127.0.0.1' }
        },

        development: {
            development_server: { port: 3001, host: '127.0.0.1' }
        }
    },

    // cac gia tri kho tao cho server
    game: {

        show_hall_of_fame: 20,
        show_history_games: 20,
        duration: 15 //seconds
    },

    room: {
        minimumBet: 10,
        maximumBet: 1000,
        maximumPlayer: 8,
        maximumTimeout: 20,
        redisTimeout: 20,
        sqlTimeout: 20
    },

    player: {
        defaultAvatar: "avatar.jpg",
        defaultMoney: 100
    }

}




