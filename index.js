var timeout;
var currentlyHoveredElem = null;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .to(".boundingelem2", {
        y: 0,
        delay: -1,
        ease: Expo.easeInOut,
        duration: 1.5,
        stagger: 0.1,
      })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  var isMouseOver = false;

  elem.addEventListener("mouseenter", function () {
    if (currentlyHoveredElem !== null && currentlyHoveredElem !== elem) {
      gsap.to(currentlyHoveredElem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    }
    currentlyHoveredElem = elem;
    isMouseOver = true;
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  elem.addEventListener("mouseleave", function () {
    if (!isMouseOver) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    }
    isMouseOver = false;
  });
});
window.addEventListener("mousemove", function (event) {
  // Check if an element is currently being hovered
  if (!currentlyHoveredElem) {
    return; // Exit the function if not
  }

  // Get the position and size of the hovered element
  const boundingRect = currentlyHoveredElem.getBoundingClientRect();
  // Check if the cursor is outside the hovered element's area
  if (
    event.clientY < boundingRect.top ||
    event.clientY > boundingRect.bottom ||
    event.clientX < boundingRect.left ||
    event.clientX > boundingRect.right
  ) {
    // Fade out the image within the hovered element
    animateImageFadeOut();

    // Reset the currently hovered element
    currentlyHoveredElem = null;
  }
});


function animateImageFadeOut() {
 
  gsap.to(currentlyHoveredElem.querySelector("img"), {
    opacity: 0,
    ease: "power3",
    duration: 0.5,
  });
}


//--------------scroll trigger---------------

