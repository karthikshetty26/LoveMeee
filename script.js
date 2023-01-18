flag = 1

var md = new MobileDetect(window.navigator.userAgent);
console.log(md.mobile());          // 'Sony'
console.log(md.phone());           // 'Sony'
console.log(md.tablet());          // null

if (md.mobile() || md.phone() || md.tablet()) {
    body_content.style.display = "none"
    body_hideen_text.style.display = "block"
}

function pop() {
    if (overlay.style.visibility == "visible") {
        overlay.style.visibility = "hidden";
        overlay.style.opacity = 0;
    } else {
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;
    }

}

function f() {
    if (flag == 1) {
        nodiv.style.left = "20px"
        nodiv.style.right = "auto"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "20px"
        flag = 2
    } else if (flag == 2) {
        nodiv.style.left = "20px"
        nodiv.style.right = "auto"
        nodiv.style.top = "20px"
        nodiv.style.bottom = "auto"
        flag = 3
    } else if (flag == 3) {
        nodiv.style.left = "20%"
        nodiv.style.right = "auto"
        nodiv.style.top = "30%"
        nodiv.style.bottom = "auto"
        flag = 4
    } else if (flag == 4) {
        nodiv.style.left = "20%"
        nodiv.style.right = "auto"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "30%"
        flag = 5
    } else if (flag == 5) {
        nodiv.style.left = "20px"
        nodiv.style.right = "auto"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "20px"
        flag = 6
    } else if (flag == 6) {
        nodiv.style.left = "auto"
        nodiv.style.right = "30%"
        nodiv.style.top = "20px"
        nodiv.style.bottom = "auto"
        flag = 7
    } else if (flag == 7) {
        nodiv.style.left = "auto"
        nodiv.style.right = "30%"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "20px"
        flag = 8
    } else if (flag == 8) {
        nodiv.style.left = "auto"
        nodiv.style.right = "30%"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "50%"
        flag = 9
    } else if (flag == 9) {
        nodiv.style.left = "auto"
        nodiv.style.right = "20px"
        nodiv.style.top = "20px"
        nodiv.style.bottom = "auto"
        flag = 10
    } else if (flag == 10) {
        nodiv.style.left = "auto"
        nodiv.style.right = "30%"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "50%"
        flag = 11
    } else if (flag == 11) {
        nodiv.style.left = "auto"
        nodiv.style.right = "20px"
        nodiv.style.top = "auto"
        nodiv.style.bottom = "20px"
        flag = 1
    }

    console.log("Move Hover", flag)
}