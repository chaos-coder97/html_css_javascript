const spans = document.querySelectorAll("h1 span");
spans.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.1}s`;
});