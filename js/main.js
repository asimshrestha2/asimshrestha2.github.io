const profileImage = document.getElementById("profile-image");
const svgEl = document.querySelector("svg.lines");
const pages = document.querySelector(".pages");
var setup = false;
(function () {
    setSVGElement();
    profileImage.onload = () => {
        setBoxesPosition(false);
    };
    setBoxesPosition(false);
    setCloseBtns();
})();
window.addEventListener('resize', () => {
    setSVGElement();
    setBoxesPosition(true);
}, false);
function setCloseBtns() {
    const close_btns = document.getElementsByClassName("close-btn");
    for (let i = 0; i < close_btns.length; i++) {
        const element = close_btns[i];
        element.addEventListener("click", () => {
            const currentPage = document.querySelector(".page.current");
            if (currentPage) {
                pages.classList.remove("front");
                currentPage.classList.remove("current");
            }
        }, false);
    }
}
function setSVGElement() {
    const svgArg = { viewbox: "0 0 " + window.innerWidth + " " + window.innerHeight, width: window.innerWidth, height: window.innerHeight };
    for (var k in svgArg)
        svgEl.setAttribute(k, svgArg[k]);
}
function setBoxesPosition(update) {
    const boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const pos = JSON.parse(box.getAttribute("data-json"));
        setBoxPosition(box, pos, 100);
        if (update && setup)
            updateLine(pos, box);
        else {
            createLine(pos, box);
            box.addEventListener("click", () => {
                pages.classList.add("front");
                const page = document.getElementById(box.id + "-page");
                const currentPage = document.querySelector(".page.current");
                if (currentPage && page != currentPage) {
                    currentPage.classList.remove("current");
                    page.classList.add("current");
                }
                else if (page) {
                    page.classList.add("current");
                }
            }, false);
            setup = true;
        }
    }
}
function createLine(pos, box) {
    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    let svgLine = makeSVG("line", {
        id: box.id + "-line", class: "line", x1: leftPosition, y1: profileImage.clientHeight * (pos.y / 100),
        x2: ((pos.x <= 50) ? box.offsetLeft + box.clientWidth : box.offsetLeft), y2: box.offsetTop + box.clientHeight / 2,
        "stroke-width": "1", stroke: "#FFFFFF"
    });
    svgEl.appendChild(svgLine);
}
function updateLine(pos, box) {
    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    const arg = {
        x1: leftPosition, y1: profileImage.clientHeight * (pos.y / 100),
        x2: ((pos.x <= 50) ? box.offsetLeft + box.clientWidth : box.offsetLeft), y2: box.offsetTop + box.clientHeight / 2
    };
    let svgLine = document.getElementById(box.id + "-line");
    for (var k in arg)
        svgLine.setAttribute(k, arg[k]);
}
function setBoxPosition(box, pos, offset) {
    box.style.top = (profileImage.clientHeight * (pos.y / 100)) - offset + "px";
    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    if (pos.x <= 50)
        box.style.left = ((leftPosition - box.clientWidth - offset <= 0) ? 0 : leftPosition - box.clientWidth - offset) + "px";
    else
        box.style.left = ((leftPosition + box.clientWidth + offset >= window.innerWidth) ? window.innerWidth - box.clientWidth - offset : leftPosition) + offset + "px";
}
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}
