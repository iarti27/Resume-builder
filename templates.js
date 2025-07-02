document.addEventListener("DOMContentLoaded", function() {
    const templates = document.querySelectorAll(".template");
    let delay = 0.1; // Initial delay
    templates.forEach(template => {
        setTimeout(() => {
            template.style.opacity = "1"; // Fade in
            template.style.transform = "translateY(0)"; // Move to original position
        }, delay * 1000); // Delay in milliseconds
        delay += 0.1; // Increase delay for the next template
    });
});