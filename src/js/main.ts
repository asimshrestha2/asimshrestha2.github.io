const profileImage = document.getElementById("profile-image");
const svgEl = document.querySelector("svg.lines") as SVGElement;
(function(){
    setSVGElement();
    profileImage.onload = () => {
        setBoxesPosition(false);
    }
})()

window.addEventListener('resize', () =>{
    setSVGElement();
    setBoxesPosition(true);
}, false);

function setSVGElement() {
    const svgArg = { viewbox: "0 0 " + window.innerWidth + " " + window.innerHeight, width: window.innerWidth, height: window.innerHeight };
    for (var k in svgArg)
        svgEl.setAttribute(k, svgArg[k]);
}

function setBoxesPosition(update: boolean) {
    const boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i] as HTMLElement;
        const pos = JSON.parse(box.getAttribute("data-json"));
        setBoxPosition(box, pos, 100);
        if(update)
            updateLine(pos, box);
        else
            createLine(pos, box);
    }
}

function createLine(pos: any, box: HTMLElement) {
    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    let svgLine = makeSVG("line", {
    id: box.id + "-line", class: "line", x1: leftPosition, y1: profileImage.clientHeight * (pos.y / 100),
        x2: ((pos.x <= 50) ? box.offsetLeft + box.clientWidth : box.offsetLeft), y2: box.offsetTop + box.clientHeight / 2, "stroke-width": "2", stroke: "#FFFFFF"
    });
    svgEl.appendChild(svgLine);
}

function updateLine(pos: any, box: HTMLElement) {
    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    const arg = {
        id: box.id + "-line", class: "line", x1: leftPosition, y1: profileImage.clientHeight * (pos.y / 100),
            x2: ((pos.x <= 50) ? box.offsetLeft + box.clientWidth : box.offsetLeft), y2: box.offsetTop + box.clientHeight / 2, "stroke-width": "2", stroke: "#FFFFFF"
        }

    let svgLine = document.getElementById(box.id + "-line");
    for (var k in arg)
        svgLine.setAttribute(k, arg[k]);
    
}

function setBoxPosition(box: HTMLElement, pos: any, offset: number) {
    box.style.top = (profileImage.clientHeight * (pos.y / 100)) - offset + "px";

    const leftPosition = (profileImage.clientWidth * (pos.x / 100)) + profileImage.offsetLeft;
    if(pos.x <= 50)
        box.style.left = ((leftPosition - box.clientWidth - offset <= 0) ? 0 : leftPosition - box.clientWidth - offset) + "px";
    else
        box.style.left = ((leftPosition + box.clientWidth + offset >= window.innerWidth) ? window.innerWidth - box.clientWidth - offset : leftPosition) + offset + "px";
}

var makeSVG = (tag: string, attrs: {}) => {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

