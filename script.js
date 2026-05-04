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
    const buttonWidth = nodiv.offsetWidth || 120;
    const buttonHeight = nodiv.offsetHeight || 50;
    
    // Add larger padding to keep button well within safe area
    const padding = 40;
    
    // Generate random position within safe bounds with better constraints
    const maxX = Math.max(padding, viewportWidth - buttonWidth - padding);
    const maxY = Math.max(padding, viewportHeight - buttonHeight - padding);
    
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    
    return {
        x: Math.min(randomX, viewportWidth - buttonWidth - padding),
        y: Math.min(randomY, viewportHeight - buttonHeight - padding)
    };
}

// ===== HELPER FUNCTION: Move Button to Random Position =====
function moveButtonRandomly() {
    const pos = getRandomPosition();
    
    // Switch to fixed positioning when escaping
    nodiv.style.position = "fixed";
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
            nodiv.style.position = "relative";
            nodiv.style.left = "auto";
            nodiv.style.right = "auto";
            nodiv.style.top = "auto";
            nodiv.style.bottom = "auto";
        }, 300);
    } else {
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;
        // Trigger confetti animation when popup opens
        setTimeout(() => {
            triggerConfetti();
        }, 100);
    }
}

// ===== ENHANCED ESCAPE FUNCTION: Random Movement =====
function f() {
    // Move button to completely random position on each hover
    moveButtonRandomly();
}

// ===== PROXIMITY DETECTION: Escape on Mouse Approach =====
// Track mouse position and escape if getting too close
const proximityDistance = 120; // Distance in pixels to trigger escape
let lastEscapeTime = 0;
const escapeDebounce = 150; // Minimum time between escapes (ms)

document.addEventListener("mousemove", function(e) {
    if (!nodiv) return;
    
    const rect = nodiv.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to button center
    const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + 
        Math.pow(e.clientY - buttonCenterY, 2)
    );
    
    // Escape if mouse is within proximity distance
    const now = Date.now();
    if (distance < proximityDistance && now - lastEscapeTime > escapeDebounce) {
        moveButtonRandomly();
        lastEscapeTime = now;
    }
});

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