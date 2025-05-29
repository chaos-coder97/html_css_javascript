document.addEventListener("DOMContentLoaded", () => {
  const shapes = document.querySelectorAll(".triangle, .circle, .square");

  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 1.5}s`;
  });
});
