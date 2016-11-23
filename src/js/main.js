// More info https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: false,
    progress: true,
    history: true,
    center: false,
    width: "100%",
    height: "100%",
    margin: 0,
    minScale: 0.2,
    maxScale: 2,
    slideNumber: 'c/t',

    transition: 'slide', // none/fade/slide/convex/concave/zoom
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
        custom: [
            {title: 'DE', icon: '<img class="nav-flag" src="img/de.png">', link: 'DE.html'},
            {title: 'EN', icon: '<img class="nav-flag" src="img/gb.png">', link: 'EN.html'}
        ],

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
    dependencies: [
        {src: 'bower_components/reveal.js-menu/menu.js'}
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