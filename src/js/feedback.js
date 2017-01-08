var FEEDBACK_GET_URL = 'feedbackDataSample/sample.json';
var FEEDBACK_SET_URL = '';

function setupFeedbackChart($container) {

    var $container = jQuery($container);
    var $coordinates = $container.children('.coordinates');
    var width = $coordinates.width();
    var height = $coordinates.height();
    var widthRatio = width / 100;
    var heightRatio = height / 100;

    function addCoordinateOnGraph(x, y, additionalClass) {
        console.log(x, y);
        var $elem = jQuery('<div class="coordinate"/>')
            .css({
                left: x * widthRatio - 4,
                top: y * heightRatio - 4
            })
            .appendTo($coordinates);

        if (additionalClass) {
            debugger;
            $elem.addClass(additionalClass);
        }
    }

    jQuery.get(FEEDBACK_GET_URL)
        .done(function (data) {
            data.forEach(function (data) {
                addCoordinateOnGraph(data.x, data.y);
            })
        });

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
        sendFeedback(x, y);

        $this.removeClass('active');

    })

}

function sendFeedback(x, y) {
    if (FEEDBACK_SET_URL) {
        jQuery.post(FEEDBACK_SET_URL, {x: x, y: y})
            .done(function (data) {

            })
    }
}

module.exports = setupFeedbackChart;