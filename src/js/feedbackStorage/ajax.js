/**
 * this file demonstrate an storage implementation against an own build backend based on ajax get and post
 * @type {string}
 */

var FEEDBACK_GET_URL = 'feedbackDataSample/sample.json';
var FEEDBACK_SET_URL = '';


/**
 * adding coordinates
 * @param x
 * @param y
 * @returns {Promsie}
 */
function add(x, y) {
    return new Promise(function (resolve, reject) {
        if (FEEDBACK_SET_URL) {
            jQuery.post(FEEDBACK_SET_URL, {x: x, y: y})
                .done(function () {
                    resolve()
                })
                .fail(function (error) {
                    reject(error);
                });
        }
    });
}


/**
 * getting the current feedback
 * @returns {Promsie}
 */
function get() {
    return new Promise(function (resolve, reject) {
        jQuery.get(FEEDBACK_GET_URL)
            .done(function (data) {
                resolve(data);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}


module.exports = {
    get: get,
    add: add
};