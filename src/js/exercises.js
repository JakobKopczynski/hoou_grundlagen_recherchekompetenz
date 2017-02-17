var deepmerge = require('deepmerge');
var Handlebars = require('handlebars/runtime');
var templates = {
    resultCorrect: require('../handlebars/compiled/resultCorrect.js')(Handlebars),
    resultWrong: require('../handlebars/compiled/resultWrong.js')(Handlebars)
};


var genericTemplateData = require('../../content/' + $('html').attr('lang') + '.js');

/**
 * loader method
 * @param $container
 */
module.exports = function ($container) {
    jQuery($container).each(exerciseLoader);
};

function exerciseLoader(id, $container) {

    var currentExercise = 0;

    $container = jQuery($container);
    var multiExercise = !!$container.data('multiExercise');
    var incrementalExercise = $container.data('incrementalExercise');

    if (incrementalExercise) {
        incrementalExercise = incrementalExercise.split(';').map(function (groups) {
            return parseInt(groups, 10);
        });

        for (var i = 1; i < incrementalExercise.length; i++) {
            jQuery($container).find('.elem').each(function (index, elem) {
                getInputsOfElemForGroup(jQuery(elem), i).hide();
            });
        }
    }

    var $send = $container.find('.send');
    $send.on('click', onSend);
    var reset = $container.find('.reset');
    reset.on('click', onReset);

    var $elements = $container.find('table .elem');

    var exerciseTemplateData = {
        exercise: {
            feedbackWrong: $container.data('feedbackWrong'),
            feedbackCorrect: $container.data('feedbackCorrect')
        }
    };

    var templateDataExerciseGroup = deepmerge(genericTemplateData, exerciseTemplateData);

    $elements.on('click', onLineClick);

    //prevent double click
    $elements.find('input').on('change', function () {
        jQuery(this).prop('checked', !jQuery(this).prop('checked'));
    });

    if (incrementalExercise || multiExercise) {
        nextExercise();
    }

    function onSend(event) {
        event.preventDefault();
        $elements.each(checkElem);
        checkTotalResult();
    }

    function onReset(event) {
        debugger;
        event.preventDefault();
        var $input = $elements.find('input');
        $elements.filter('.correctChecked, .wrongChecked').removeClass('correctChecked wrongChecked');
        $input.prop('disabled', false);
        $input.prop('checked', false);
        $send.show();
        reset.hide();
        currentExercise = 0;
    }

    function onLineClick(event) {
        var $this = jQuery(this);
        var $input = $this.find('input:enabled').first();
        var checked = $input.prop('checked');
        $input.prop('checked', !checked);
    }

    function checkElem(id, $elem) {
        $elem = jQuery($elem);
        var $input = getInputsOfElemForGroup($elem, getCurrentGroup(currentExercise));
        var currentState = !!$input.prop('checked');
        var correctState =
            $input.prop('disabled') ||
            $input.data('correctState') === true ||
            $input.data('correctState') === currentExercise;

        setState($elem, currentState === correctState);
        $elem.removeClass('correctChecked wrongChecked');

        if (currentState) {

            // Angekreuzt richtig grüner Haken dahinter und Sperren
            if (currentState === correctState) {
                $input.attr('disabled', true);
                $elem.addClass('correctChecked');
            } else {
                $input.prop('checked', false);
                $elem.addClass('wrongChecked');
            }
        }
    }

    function getInputsOfElemForGroup($elem, groupId) {
        return jQuery($elem.find('.check').get(groupId)).children('input');
    }

    function setState($elem, correct) {
        $elem.toggleClass('wrong', !correct);
    }


    function checkTotalResult() {

        var errors = $elements.filter('.wrong').length;

        //solved correctly
        if (errors) {
            showBadResult();
            return;
        }
        showCorrectResult();
    }

    function getCurrentGroup(currentExercise) {
        if (!incrementalExercise) {
            return 0;
        }
        return incrementalExercise.findIndex(function (value) {
            return currentExercise < value;
        });
    }

    function updateProgress() {
        var length = $container.find('thead span.exercise').length;
        $container.find('.exerciseProgress').html(Math.min(currentExercise + 1, length) + '  / ' + length);
    }

    function nextExercise() {
        var exercises = $container.find('thead span.exercise');

        //update progress
        updateProgress(currentExercise);

        if (currentExercise < exercises.length) {
            exercises.hide();

            if (incrementalExercise) {
                $container.find('.elem').each(function (index, elem) {
                    getInputsOfElemForGroup(jQuery(elem), getCurrentGroup(currentExercise)).show();
                    getInputsOfElemForGroup(jQuery(elem), getCurrentGroup(currentExercise)).attr('disabled', false);
                    getInputsOfElemForGroup(jQuery(elem), getCurrentGroup(currentExercise)).filter(':checked').attr('disabled', true);
                    for (var i = 0; i < getCurrentGroup(currentExercise); i++) {
                        getInputsOfElemForGroup(jQuery(elem), i).attr('disabled', true);
                    }
                });


            } else if (multiExercise) {
                $container.find('input').attr('checked', false);
            }

            $(exercises.get(currentExercise)).show();
            return true;
        }
        return false;
    }

    function finishedExercise() {
        $send.hide();
        reset.show();
        $container.find('input').attr('disabled', true);

        if (incrementalExercise) {

            $container.find('tr.elem').filter(function (idx, elem) {
                var $elem = jQuery(elem);
                return !$elem.find('input:not(:checked)').length;

            }).addClass('incrementalFinalResult');

            $container.find('.beforeAllDone').hide();
            $container.find('.afterAllDone').show();

            return;
        }

        //also go to next page
        if (Reveal) {
            Reveal.navigateNext();
        }
    }

    function getFeedbackTemplateData() {

        var exerciseTemplateData = {exercise: {}};
        var exercises = $container.find('thead span.exercise');

        if (!exercises.length) {
            return templateDataExerciseGroup;
        }

        var exercise = $(exercises.get(currentExercise));
        var feedbackCorrect = exercise.data('feedbackCorrect');
        var feedbackWrong = exercise.data('feedbackWrong');

        if (feedbackCorrect) {
            exerciseTemplateData.exercise.feedbackCorrect = feedbackCorrect;
        }
        if (feedbackWrong) {
            exerciseTemplateData.exercise.feedbackWrong = feedbackWrong;
        }

        return deepmerge(templateDataExerciseGroup, exerciseTemplateData);
    }

    function showCorrectResult() {

        var $table = $container.find('table');
        var $goodOverlay = jQuery(templates.resultCorrect(getFeedbackTemplateData()))
            .on('click', function () {
                var anotherExercise;
                if (incrementalExercise || multiExercise) {
                    currentExercise++;
                    anotherExercise = nextExercise();
                }

                if (!anotherExercise) {
                    finishedExercise();
                }
                $table.show();
                $goodOverlay.remove();
            })
            .css({
                height: ($table.height()) + 'px'
            })
            .appendTo($container);
        $table.hide();
    }

    function showBadResult() {

        var $table = $container.find('table');
        var $badOverlay = jQuery(templates.resultWrong(getFeedbackTemplateData()))
            .on('click', function () {
                $table.show();
                $badOverlay.remove();
            })
            .css({
                height: ($table.height()) + 'px'
            })
            .appendTo($container);
        $table.hide();
    }
}