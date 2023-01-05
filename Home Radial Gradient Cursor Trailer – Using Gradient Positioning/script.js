const gradient = document.querySelector(".gradient");

function onMouseMove(event) {
  gradient.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, rgba(159,0,191,.9) 0, #4D4FA7 70%)';
}
document.addEventListener("mousemove", onMouseMove);