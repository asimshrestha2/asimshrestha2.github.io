document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash)
        openPage(window.location.hash)();
    var pageLinks = document.querySelectorAll("a.page");
    function openPage(link) {
        return function () {
            var current = document.querySelector(".content.current");
            if (current.getAttribute('id') !== link) {
                document.querySelector(".content.current").classList.remove('current');
                document.querySelector(link).classList.add('current');
            }
        };
    }
    var element;
    for (var i = 0; i < pageLinks.length; i++) {
        element = pageLinks[i];
        element.addEventListener('click', openPage(element.getAttribute('href')), false);
    }
});
