/**
 * Setup
 */
var degaNotDeepLinkHandler = function (e) {
    e.preventDefault();

    Dega('.main-container').off('click', '.link', degaNotDeepLinkHandler);
};

var jqNotDeepLinkHandler = function (e) {
    e.preventDefault();

    $('.main-container').off('click', '.link', jqNotDeepLinkHandler);
};

/**
 * Deep Link
 */
var degaDeepLinkHandler = function (e) {
    e.preventDefault();

    Dega('.main-container').off('click', '.link-deep', degaDeepLinkHandler);
};

var jqDeepLinkHandler = function (e) {
    e.preventDefault();

    $('.main-container').off('click', '.link-deep', jqDeepLinkHandler);
};

/**
 * Tests
 */

Dega('.main-container').on('click', '.link', degaNotDeepLinkHandler);
document.querySelector('.link').click();

$('.main-container').on('click', '.link', jqNotDeepLinkHandler);
document.querySelector('.link').click();

Dega('.main-container').on('click', '.link-deep', degaDeepLinkHandler);
document.querySelector('.link-deep').click();

$('.main-container').on('click', '.link-deep', jqDeepLinkHandler);
document.querySelector('.link-deep').click();
