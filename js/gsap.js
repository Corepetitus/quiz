/**
 * GSAP animations for Corepetitus Quiz
 */

const slideIn = (el) => {
  gsap.fromTo(
    el,
    { x: 80, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
  );
};

const slideOut = (el, callback) => {
  gsap.to(el, {
    x: -80,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: callback
  });
};

const pulseOption = (el) => {
  gsap.fromTo(
    el,
    { scale: 1 },
    { scale: 0.97, duration: 0.12, yoyo: true, repeat: 1 }
  );
};

/**
 * Loading spinner animation
 */
const spinLoader = () => {
  gsap.to('.spinner', {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear'
  });
};
