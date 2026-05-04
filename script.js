flag = 1

var md = new MobileDetect(window.navigator.userAgent);
console.log(md.mobile());          // 'Sony'
console.log(md.phone());           // 'Sony'
console.log(md.tablet());          // null

if (md.mobile() || md.phone() || md.tablet()) {
    body_content.style.display = "none"
    body_hideen_text.style.display = "block"
}

// ===== SMOOTH ANIMATION INITIALIZATION =====
// Initialize transition styles for smooth animations with easing
nodiv.style.transition = "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

// Add smooth transitions to overlay
overlay.style.transition = "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out";

// Track hover state to prevent animation during active hover
let isHovering = false;

// ===== HELPER FUNCTION: Generate Random Position =====
function getRandomPosition() {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const buttonWidth = nodiv.offsetWidth || 100;
    const buttonHeight = nodiv.offsetHeight || 40;
    
    // Add padding to keep button within safe area
    const padding = 20;
    
    // Generate random position within safe bounds
    const randomX = Math.random() * (viewportWidth - buttonWidth - padding * 2) + padding;
    const randomY = Math.random() * (viewportHeight - buttonHeight - padding * 2) + padding;
    
    return {
        x: randomX,
        y: randomY
    };
}

// ===== HELPER FUNCTION: Move Button to Random Position =====
function moveButtonRandomly() {
    const pos = getRandomPosition();
    
    // Use transform for better performance
    nodiv.style.left = pos.x + "px";
    nodiv.style.top = pos.y + "px";
    nodiv.style.right = "auto";
    nodiv.style.bottom = "auto";
    
    console.log("Button moved to:", pos.x, pos.y);
}

function pop() {
    if (overlay.style.visibility == "visible") {
        overlay.style.opacity = 0;
        overlay.style.visibility = "hidden";
        // Reset button position and flag when closing popup
        setTimeout(() => {
            flag = 1;
            nodiv.style.left = "auto";
            nodiv.style.right = "20px";
            nodiv.style.top = "auto";
            nodiv.style.bottom = "20px";
        }, 300);
    } else {
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;
    }
}

// ===== ENHANCED ESCAPE FUNCTION: Random Movement =====
function f() {
    // Move button to completely random position on each hover
    moveButtonRandomly();
}

// ===== ENHANCED HOVER EVENT HANDLERS =====
// Add mouse enter handler for better UX
document.getElementById("nodiv").addEventListener("mouseenter", function() {
    isHovering = true;
    this.style.transition = "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
});

// Add mouse leave handler
document.getElementById("nodiv").addEventListener("mouseleave", function() {
    isHovering = false;
});

// ===== PREVENT CLICK ON NO BUTTON =====
// Prevent clicking the No button by moving it away
const noButton = document.querySelector(".btn_no");
noButton.addEventListener("mousedown", function(e) {
    e.preventDefault();
    moveButtonRandomly();
    return false;
});

noButton.addEventListener("click", function(e) {
    e.preventDefault();
    moveButtonRandomly();
    return false;
});