function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function smoothScrollTo(target, duration) {
  const start = window.pageYOffset;
  const end = target.getBoundingClientRect().top + start;
  const startTime = performance.now();

  function scroll() {
    const currentTime = performance.now();
    const time = Math.min(1, (currentTime - startTime) / duration);
    const easedTime = easeInOutQuad(time);

    window.scrollTo(0, Math.ceil((easedTime * (end - start)) + start));

    if (time < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

document.querySelectorAll('[data-scrollto]').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scrollto');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      smoothScrollTo(targetElement, 1500);
    }
  });
});
