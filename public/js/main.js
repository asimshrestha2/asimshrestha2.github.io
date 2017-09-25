document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash)
        openPage(window.location.hash)();
    var pageLinks = document.querySelectorAll("a.page");
    function openPage(link) {
        return function () {
            var linkHtml = (link.indexOf('#') != -1) ? `${link.replace("#", "")}.html` : null;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "/views/" + linkHtml, true);
            xhr.onprogress = function (e) {
                if (e.lengthComputable) {
                    console.log((e.loaded / e.total) * 100);
                }
            };
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    document.querySelector(link).innerHTML = xhr.responseText;
                    var current = document.querySelector(".content.current");
                    if (current.getAttribute('id') !== link) {
                        document.querySelector(".content.current").classList.remove('current');
                        document.querySelector(link).classList.add('current');
                    }
                }
            };
            xhr.send();
        };
    }
    var element;
    for (var i = 0; i < pageLinks.length; i++) {
        element = pageLinks[i];
        element.addEventListener('click', openPage(element.getAttribute('href')), false);
    }
});
