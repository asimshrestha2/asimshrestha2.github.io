document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash)
        openPage(window.location.hash)();
    else
        openPage('#home')();
    var pageLinks = document.querySelectorAll("a.page");
    function openPage(link) {
        return function () {
            var linkHtml = (link.indexOf('#') != -1) ? `${link.replace("#", "")}.html` : null;
            var linkedElement = document.querySelector(".content" + link);
            var current = document.querySelector(".content.current");
            if (current) {
                if (current.getAttribute('id') !== link.replace('#', '') && linkedElement.innerHTML === "") {
                    getRequest("/views/" + linkHtml, (res) => {
                        linkedElement.innerHTML = res;
                    });
                }
                current.classList.remove('current');
            }
            else if (linkedElement.innerHTML === "") {
                getRequest("/views/" + linkHtml, (res) => {
                    linkedElement.innerHTML = res;
                });
            }
            if (linkedElement.hasAttribute('set-bg-color')) {
                document.body.style.background = linkedElement.getAttribute('set-bg-color');
            }
            else {
                document.body.style.background = '#46538b';
            }
            linkedElement.classList.add('current');
        };
    }
    var element;
    for (var i = 0; i < pageLinks.length; i++) {
        element = pageLinks[i];
        element.addEventListener('click', openPage(element.getAttribute('href')), false);
    }
});
function getRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onprogress = function (e) {
        if (e.lengthComputable) {
            console.log((e.loaded / e.total) * 100);
        }
    };
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}
