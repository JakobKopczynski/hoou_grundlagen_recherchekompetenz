/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// More info https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
	    controls: false,
	    progress: true,
	    history: true,
	    center: false,
	    width: function width(size) {
	        return parseInt('100%', 10) / 100 * size.presentationWidth - 380;
	    },
	    height: "100%",
	    margin: 0,
	    minScale: 0.2,
	    maxScale: 2,
	    slideNumber: 'c/t',
	    overview: false,
	    transitionSpeed: 'fast',
	    correctWidth: -380, // @todo: this is a hack into reveal

	    transition: 'none', // none/fade/slide/convex/concave/zoom
	    keyboard: {
	        37: 'prev',
	        38: 'prev',
	        39: 'next',
	        40: 'next'
	    },
	    menu: {
	        // Specifies which side of the presentation the menu will
	        // be shown. Use 'left' or 'right'.
	        side: 'left',

	        // Add slide numbers to the titles in the slide list.
	        // Use 'true' or format string (same as reveal.js slide numbers)
	        numbers: false,

	        // Specifies which slide elements will be used for generating
	        // the slide titles in the menu. The default selects the first
	        // heading element found in the slide, but you can specify any
	        // valid css selector and the text from the first matching
	        // element will be used.
	        // Note: that a section data-menu-title attribute or an element
	        // with a menu-title class will take precedence over this option
	        titleSelector: 'h1, h2, h3, h4, h5, h6',

	        // Hide slides from the menu that do not have a title.
	        // Set to 'true' to only list slides with titles.
	        hideMissingTitles: false,

	        // Add markers to the slide titles to indicate the
	        // progress through the presentation
	        markers: true,
	        showAlways: true,
	        catchMainAreaClick: false,

	        // Specify custom panels to be included in the menu, by
	        // providing an array of objects with 'title', 'icon'
	        // properties, and either a 'src' or 'content' property.
	        custom: [{ title: 'DE', icon: '<img class="nav-flag" src="img/de.png">', link: 'de.html' }, { title: 'EN', icon: '<img class="nav-flag" src="img/gb.png">', link: 'en.html' }],

	        // Specifies the themes that will be available in the themes
	        // menu panel. Set to 'false' to hide themes panel.
	        themes: false,

	        // Specifies if the transitions menu panel will be shown.
	        transitions: false,

	        // Adds a menu button to the slides to open the menu panel.
	        // Set to 'false' to hide the button.
	        openButton: false,

	        // If 'true' allows the slide number in the presentation to
	        // open the menu panel. The reveal.js slideNumber option must
	        // be displayed for this to take effect
	        openSlideNumber: false,

	        // If true allows the user to open and navigate the menu using
	        // the keyboard. Standard keyboard interaction with reveal
	        // will be disabled while the menu is open.
	        keyboard: false,

	        navigation: true
	    },

	    // More info https://github.com/hakimel/reveal.js#dependencies
	    dependencies: [{ src: 'dependencies/reveal.js-menu/menu.js' }
	    //            {
	    //                src: 'lib/js/classList.js', condition: function () {
	    //                return !document.body.classList;
	    //            }
	    //            },
	    //            {
	    //                src: 'plugin/markdown/marked.js', condition: function () {
	    //                return !!document.querySelector('[data-markdown]');
	    //            }
	    //            },
	    //            {
	    //                src: 'plugin/markdown/markdown.js', condition: function () {
	    //                return !!document.querySelector('[data-markdown]');
	    //            }
	    //            },
	    //            {
	    //                src: 'plugin/highlight/highlight.js', async: true, callback: function () {
	    //                hljs.initHighlightingOnLoad();
	    //            }
	    //            },
	    //            {src: 'plugin/zoom-js/zoom.js', async: true},
	    //            {src: 'plugin/notes/notes.js', async: true}
	    ]
	});
	__webpack_require__(2)('body > div.reveal section form.exercise');

	function resetSlideScrolling(slide) {
	    $(slide).removeClass('scrollable-slide');
	}

	function handleSlideScrolling(slide) {
	    // if ($(slide).height() >= 800) {
	    $(slide).addClass('scrollable-slide');
	    // }
	}

	Reveal.addEventListener('ready', function (event) {
	    handleSlideScrolling(event.currentSlide);
	});

	Reveal.addEventListener('slidechanged', function (event) {
	    resetSlideScrolling(event.previousSlide);
	    handleSlideScrolling(event.currentSlide);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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

	    var $elements = $container.find('div.table > div.elem');

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
	        var correctState = $input.prop('disabled') || $input.data('correctState') === true || $input.data('correctState') === currentExercise;
	        visualizeState($elem, currentState === correctState);
	    }

	    function getInputsOfElemForGroup($elem, groupId) {
	        return jQuery($elem.find('div.check').get(groupId)).children('input');
	    }

	    function visualizeState($elem, correct) {
	        $elem.toggleClass('wrong', !correct);
	    }

	    function checkTotalResult() {
	        var errors = $elements.filter('.wrong').length;

	        //solved correctly
	        if (!errors) {
	            showGoodResult();
	        }
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
	        var length = $container.find('.tableHead > span.exercise').length;
	        $container.find('.exerciseProgress').html(Math.min(currentExercise + 1, length) + '  / ' + length);
	    }

	    function nextExercise() {
	        var exercises = $container.find('.tableHead > span.exercise');

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
	        $container.find('a.send').hide();
	        $container.find('input').attr('disabled', true);
	    }

	    function showGoodResult() {

	        var $table = $container.find('div.table');
	        var $goodOverlay = jQuery('<div class="goodOverlay">' + '<div class="waiter"></div>' + '<div class="cup"></div>' + '<div class="smoke"></div>' + '</div>').on('click', function () {
	            var anotherExercise;
	            if (incrementalExercise || multiExercise) {
	                currentExercise++;
	                anotherExercise = nextExercise();
	            }

	            if (!anotherExercise) {
	                finishedExercise();
	            }
	            $goodOverlay.remove();
	        }).css({
	            height: $table.height() + 'px'
	        }).appendTo($container);
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);