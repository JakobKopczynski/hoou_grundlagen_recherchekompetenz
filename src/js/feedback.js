//the storage connector. Can easily be replaced with something else, like ajax
var storage = require('./feedbackStorage/baqend');

//templating
var Handlebars = require('handlebars/runtime');
var templates = {
    confirmBox: require('../handlebars/compiled/confirmBox.js')(Handlebars)
};

var templateData = require('../../content/' + $('html').attr('lang') + '.js').feedbackConfirmBox;

/**
 * extend a container into a feedback box
 * @param $container
 */
module.exports = function setupFeedbackChart($container) {

    var $container = jQuery($container);
    var $coordinates = $container.children('.coordinates');
    var width = $coordinates.width();
    var height = $coordinates.height();
    var widthRatio = width / 100;
    var heightRatio = height / 100;


    /**
     * draw a coordinate pair on the graph
     * @param x
     * @param y
     * @param additionalClass (optional)
     */
    function addCoordinateOnGraph(x, y, additionalClass) {

        var $elem = jQuery('<div class="coordinate"/>')
            .css({
                left: x * widthRatio - 4,
                top: y * heightRatio - 4
            })
            .appendTo($coordinates);

        if (additionalClass) {
            $elem.addClass(additionalClass);
        }
    }


    /**
     * activate the feedback box
     */
    function activeFeedbackBox() {

        $coordinates.addClass('active');
        $coordinates.one('click', function (e) {
            var $this = jQuery(this); // or use $(e.target) in some cases;
            var offset = $this.offset();

            var posX = offset.left;
            var posY = offset.top;

            var x = e.pageX - posX;
            x = parseInt(x / width * 100, 10);
            x = x < 0 ? 0 : x;
            x = x > 100 ? 100 : x;

            var y = e.pageY - posY;
            y = parseInt(y / height * 100, 10);
            y = y < 0 ? 0 : y;
            y = y > 100 ? 100 : y;

            addCoordinateOnGraph(x, y, 'my');
            confirmFeedback(x, y);

            $this.removeClass('active');

        });
    }


    /**
     * show feedback dialog and handle click on yes and no
     * @param x
     * @param y
     */
    function confirmFeedback(x, y) {

        // get the "my" box
        var $myCoordinates = $coordinates.find('.my');
        var $confirmBox = jQuery(templates.confirmBox(templateData));
        $confirmBox.find('.yes').on('click', function () {
            storage.add(x, y);
            $myCoordinates.removeClass('my');
            $confirmBox.remove();
            return false;
        });
        $confirmBox.find('.no').on('click', function () {
            removeMyCoordinates();
            activeFeedbackBox();
            $confirmBox.remove();
            return false;
        });
        $confirmBox.appendTo($myCoordinates);
    }


    /**
     * removing the user coordinate, if it doesn't get confirmed
     */
    function removeMyCoordinates() {
        $coordinates.find('.my').remove();
    }


    // get initial data
    storage.get().then(function (data) {
        data.forEach(function (data) {
            addCoordinateOnGraph(data.x, data.y);
        });
    });

    //and activate it
    activeFeedbackBox();

};