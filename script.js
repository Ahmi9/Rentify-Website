const menuBtn = document.getElementById("menuBtn");
const menuClzBtn = document.getElementById("menuClzBtn");
const hiddenLinks = document.getElementById("hiddenLinks");

menuBtn.addEventListener('click', () => {
    hiddenLinks.classList.toggle('active');
});

menuClzBtn.addEventListener('click', () => {
    hiddenLinks.classList.toggle('active');
});

// Reveal elements on scroll
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Trigger once on page load
reveal();

// Auto pause video when out of view
const video = document.getElementById("howVideo");

if (video) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(video);
}


// Drag-to-scroll for .testimonialsContainer (mobile + desktop drag)
(function () {
  const scroller = document.querySelector('.testimonialsContainer');
  if (!scroller) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  // Pointer events for best cross-browser behavior
  scroller.addEventListener('pointerdown', (e) => {
    // only allow horizontal drag on narrow view
    if (window.innerWidth > 900) return; // optional: keep desktop default
    isDown = true;
    scroller.setPointerCapture(e.pointerId);
    scroller.classList.add('dragging');
    startX = e.clientX;
    scrollLeft = scroller.scrollLeft;
  });

  scroller.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const x = e.clientX;
    const walk = (startX - x); // distance moved
    scroller.scrollLeft = scrollLeft + walk;
  });

  function endDrag(e) {
    if (!isDown) return;
    isDown = false;
    try { scroller.releasePointerCapture(e.pointerId); } catch (err) {}
    scroller.classList.remove('dragging');
  }

  scroller.addEventListener('pointerup', endDrag);
  scroller.addEventListener('pointercancel', endDrag);
  scroller.addEventListener('pointerleave', endDrag);

  // Optional: keyboard arrows on focus for accessibility
  scroller.setAttribute('tabindex', '0');
  scroller.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scroller.scrollBy({ left: 300, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') scroller.scrollBy({ left: -300, behavior: 'smooth' });
  });
})();
