// Handle view transitions
document.addEventListener("astro:page-load", () => {
    console.log("Reloading Axeptio after navigation");
    if (window.showAxeptioButton) {
        console.log("Window method detected, reloading Axeptio button");
        window.showAxeptioButton();
    }
});