/**
 * ===== LOVE ME APP - Main Script =====
 * A fun interactive "Do you love me?" app for desktop with mouse support
 * Mobile/touch devices show an alternate message
 */

// ===== DEVICE DETECTION =====
/**
 * Detect if device supports mouse/pointer input
 * Returns: true for desktop with mouse, false for touch-only
 */
function environmentSupportsMouse() {
    const supportsMatchMedia = typeof window.matchMedia === "function";
    const hasTouch = "ontouchstart" in window ||
        (navigator && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0));

    if (supportsMatchMedia) {
        const finePointer = window.matchMedia("(any-pointer: fine)").matches ||
            window.matchMedia("(pointer: fine)").matches;
        const hover = window.matchMedia("(any-hover: hover)").matches ||
            window.matchMedia("(hover: hover)").matches;

        if (finePointer && hover) return true;

        const coarsePointer = window.matchMedia("(any-pointer: coarse)").matches ||
            window.matchMedia("(pointer: coarse)").matches;
        if (coarsePointer && !finePointer) return false;
    }

    return !hasTouch;
}

// ===== MODE SETTER =====
/**
 * Show appropriate UI based on device capabilities
 */
function setMode({ mouseSupported }) {
    const appContainer = document.getElementById("app_container");
    const noMouseMessage = document.getElementById("no_mouse_message");

    if (!appContainer || !noMouseMessage) return;

    if (mouseSupported) {
        appContainer.style.display = "flex";
        noMouseMessage.style.display = "none";
        if (!window.__loveMeInitialized) initializeApp();
    } else {
        appContainer.style.display = "none";
        noMouseMessage.style.display = "flex";
        // Disable handlers
        window.pop = () => {};
        window.f = () => {};
        window.acceptYes = () => {};
    }
}

// ===== MAIN APP INITIALIZATION =====
function initializeApp() {
    window.__loveMeInitialized = true;

    // Get elements
    const nodiv = document.getElementById("nodiv");
    const overlay = document.getElementById("overlay");
    const noButton = document.querySelector(".btn_no");
    const yesButton = document.querySelector(".btn_yes");
    const buttonsWrapper = document.querySelector(".buttons-wrapper");

    if (!nodiv || !overlay || !noButton || !yesButton || !buttonsWrapper) return;

    // State
    let accepted = false;
    const proximityDistance = 120;
    let lastEscapeTime = 0;
    const escapeDebounce = 150;

    // Styles
    nodiv.style.transition = "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    overlay.style.transition = "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out";

    // ===== HELPER FUNCTIONS =====
    
    function resetNoButtonPosition() {
        nodiv.style.position = "relative";
        nodiv.style.left = "auto";
        nodiv.style.right = "auto";
        nodiv.style.top = "auto";
        nodiv.style.bottom = "auto";
    }

    function getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = nodiv.offsetWidth || 120;
        const buttonHeight = nodiv.offsetHeight || 50;
        const padding = 40;

        const maxX = Math.max(padding, viewportWidth - buttonWidth - padding);
        const maxY = Math.max(padding, viewportHeight - buttonHeight - padding);

        const randomX = Math.random() * (maxX - padding) + padding;
        const randomY = Math.random() * (maxY - padding) + padding;

        return {
            x: Math.min(randomX, viewportWidth - buttonWidth - padding),
            y: Math.min(randomY, viewportHeight - buttonHeight - padding),
        };
    }

    function moveButtonRandomly() {
        const pos = getRandomPosition();
        nodiv.style.position = "fixed";
        nodiv.style.left = `${pos.x}px`;
        nodiv.style.top = `${pos.y}px`;
        nodiv.style.right = "auto";
        nodiv.style.bottom = "auto";
    }

    

    window.pop = function () {
        if (accepted) return;
        const isOpen = overlay.style.visibility === "visible";
        if (isOpen) {
            overlay.style.opacity = 0;
            overlay.style.visibility = "hidden";
            setTimeout(() => resetNoButtonPosition(), 300);
        } else {
            overlay.style.visibility = "visible";
            overlay.style.opacity = 1;
        }
    };

    window.f = function () {
        if (accepted) return;
        moveButtonRandomly();
    };

    window.acceptYes = function () {
        if (accepted) return;
        accepted = true;
        nodiv.style.display = "none";
        yesButton.style.display = "none";
        buttonsWrapper.style.pointerEvents = "none";
        overlay.style.visibility = "visible";
        overlay.style.opacity = 1;
    };

    // ===== EVENT LISTENERS =====

    // Proximity detection
    document.addEventListener("mousemove", function (e) {
        if (accepted) return;
        const rect = nodiv.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);
        const now = Date.now();

        if (distance < proximityDistance && now - lastEscapeTime > escapeDebounce) {
            moveButtonRandomly();
            lastEscapeTime = now;
        }
    });

    // Prevent clicking No button
    noButton.addEventListener("mousedown", function (e) {
        if (accepted) return;
        e.preventDefault();
        moveButtonRandomly();
        return false;
    });

    noButton.addEventListener("click", function (e) {
        if (accepted) return;
        e.preventDefault();
        moveButtonRandomly();
        return false;
    });

    console.log("✨ Love Me app initialized!");
}

// ===== INITIALIZATION ON PAGE LOAD =====
window.addEventListener("DOMContentLoaded", function () {
    setMode({ mouseSupported: environmentSupportsMouse() });

    if (typeof window.matchMedia === "function") {
        const query = window.matchMedia("(any-pointer: fine), (any-hover: hover)");
        if (typeof query.addEventListener === "function") {
            query.addEventListener("change", () => 
                setMode({ mouseSupported: environmentSupportsMouse() })
            );
        } else if (typeof query.addListener === "function") {
            query.addListener(() => 
                setMode({ mouseSupported: environmentSupportsMouse() })
            );
        }
    }
});
