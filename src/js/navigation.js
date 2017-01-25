module.exports = function setupFeedbackChart($container) {
    jQuery($container).each(createNavigation);
};

function createNavigation() {
    var $panel = jQuery(this);
    jQuery('<a href="#"><span>&lt;</span> zurück</a>').appendTo($panel).click(navigationPrev);
    jQuery('<a href="#">weiter <span>&gt;</span></a>').appendTo($panel).click(navigationNext);
};

function navigationPrev(event) {
    if (event) event.preventDefault();
    Reveal.navigatePrev();
}

function navigationNext(event) {
    if (event) event.preventDefault();
    Reveal.navigateNext();
}