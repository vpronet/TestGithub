/**
 * Created with JetBrains WebStorm.
 * User: CuongNv
 * Date: 1/31/13
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */

// Xu ly cac thao tac redis

var redis = require('redis');

function newRedisClient(redisOpts) {
    return redisOpts ?
        redis.createClient(redisOpts.port, redisOpts.host, redisOpts):
        redis.createClient();
}

exports.newRedisClient = newRedisClient;
