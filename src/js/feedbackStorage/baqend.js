/**
 * this file implenetes a BaaS hosted at hamburg company Baqend
 */

// some basic config
var baqendApp ='recherchekompetenz';
var maxElements = 250;


/**
 * connect to Baqend
 * @returns {*|{server}}
 */
function connect() {
    if (connect.connection) {
        return connect.connection;
    }

    // Baqend has full SSL support. If you want the Baqend connection to be SSL-encrypted by default, add true as the second parameter of the DB.connect call.
    return connect.connection = DB.connect(baqendApp, true);
}


/**
 * adding coordinates
 * @param x
 * @param y
 * @returns {Promsie}
 */
function add(x, y) {
    return connect().then(function () {

        var msg = new DB.Coordinates();
        //Set the properties
        msg.x = x;
        msg.y = y;

        //Insert it to the database
        return msg.insert();
    });
}


/**
 * getting the current feedback
 * @returns {Promsie}
 */
function get() {
    return connect().then(function () {
        return DB.Coordinates
            .find()
            .descending('createdAt')
            .limit(maxElements)
            .resultList();
    });
}


module.exports = {
    get: get,
    add: add
};