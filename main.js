// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Listen for the 'scroll' event and log the event data to the console
lenis.on("scroll", (e) => {
  console.log(e);
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

let tl = gsap.timeline();

// Preloader animation
tl.to(".preloader", {
  y: "-100%", // Moves the preloader up and out of view
  borderRadius: "10% 10% 36% 39% / 10% 10% 55% 56%", // Curve on the bottom left
  duration: 1, // Duration of the animation
  ease: "power2.out", // Optional easing for smooth effect
})
  .add(() => {
    document.querySelector(".preloader").style.display = "none"; // Hide the preloader after the animation
  })
  .from(".navbar", {
    duration: 1,
    y: "-100%",
  })
  // Animate SVG paths after the preloader animation
  .add(() => {
    let paths = document.querySelectorAll("svg path"); // Select all <path> elements within the SVG
    paths.forEach((path) => (path.style.transform = "translateY(100%)")); // Start paths from below view

    // Animate SVG paths
    gsap.to(paths, {
      y: 0, // Move the path to its original position
      opacity: 1, // Optional: fade in the paths
      stagger: 0.2, // Delay each path by 0.2 seconds
      duration: 1, // Duration of each animation
      ease: "power2.out", // Smooth easing
    });
  })
  // Animate SVG icon, h4, paragraph, and button in order
  .from(".left svg", {
    y: 30, // Start 30px below
    opacity: 0, // Start invisible
    duration: 0.6, // Animation duration
    ease: "power2.out", // Easing function
  })
  .from(
    ".left h4",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.4" // Start 0.4 seconds before the previous animation ends
  )
  .from(
    ".left p",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.4" // Start 0.4 seconds before the previous animation ends
  )
  .from(
    ".left .leftBtn", // Button animation
    {
      y: 30, // Move 30px down (from above)
      opacity: 0, // Start invisible
      duration: 0.6, // Same duration as others
      ease: "power2.out",
    },
    "-=0.4" // Start 0.4 seconds before the previous animation ends
  )
  .from(
    ".middle",
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.4" // Same overlap as previous animations
  )
  .from(
    ".right p",
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.4" // Same overlap as previous animations
  )
  .from(
    ".right h2",
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=0.4" // Same overlap as previous animations
  );
gsap.registerPlugin(ScrollTrigger);

// Initial setup for #page
gsap.set("#page", {
  opacity: 0.873618, // Initial opacity
  transform: "translateY(5.05529px) scale(0.993681) translateZ(0px)", // Initial transform
});

// Animate the text spans inside #page2
const texts = document.querySelectorAll("#page2 h2 span");

texts.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 }); // Set initial state for each span
});

// Animate the text spans when #page2 appears
gsap.to(texts, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#page2",
    start: "top 100%",
    toggleActions: "play none none none",
  },
});

gsap.to(".ek", {
  duration: 3,
  scrollTrigger: {
    trigger: ".ek",
    start: "top 10%",
    end: "bottom -27%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

gsap.to(".do", {
  duration: 3,
  scrollTrigger: {
    trigger: ".do",
    start: "top 27%",
    end: "bottom 40%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

gsap.to(".tin", {
  duration: 3,
  scrollTrigger: {
    trigger: ".tin",
    start: "top 45%",
    end: "bottom 100%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

// Page 3

const text3 = document.querySelectorAll("#page3 h2 span");

text3.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 }); // Set initial state for each span
});

// Animate the text spans when #page3 appears
gsap.to(text3, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#page3",
    start: "top 100%",
    toggleActions: "play none none none",
  },
});

// Project showcase scroll animation
const panels = gsap.utils.toArray(".project-panel");
const numbers = gsap.utils.toArray(".topleft .num");

if (panels.length > 1) {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    const projectTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".topMain",
        start: "top top",
        end: () => "+=" + (panels.length * 100) + "%",
        pin: true,
        scrub: 1,
      }
    });

    panels.forEach((panel, i) => {
      if (i === 0) return; // First panel is already visible
      
      // Fade out previous panel, fade in current
      projectTL.to(panels[i - 1], { opacity: 0, duration: 0.5 }, i - 1);
      projectTL.to(panel, { opacity: 1, duration: 0.5 }, i - 1);
      
      // Scroll the numbers up
      projectTL.to(numbers, { 
        y: () => -i * numbers[0].offsetHeight, 
        duration: 0.5 
      }, i - 1);
    });
  });

  mm.add("(max-width: 768px)", () => {
    // On mobile, just make all panels visible, CSS will stack them naturally
    panels.forEach(p => gsap.set(p, { opacity: 1 }));
  });
}

// Experience section animations
const exTexts = document.querySelectorAll("#experience h2 span");
exTexts.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});
gsap.to(exTexts, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#experience",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});

gsap.to(".ex1", {
  duration: 3,
  scrollTrigger: {
    trigger: ".ex1",
    start: "top 10%",
    end: "bottom -27%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

gsap.to(".ex2", {
  duration: 3,
  scrollTrigger: {
    trigger: ".ex2",
    start: "top 27%",
    end: "bottom 40%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

// Skills section animations
const skillTexts = document.querySelectorAll("#skills h2 span");
skillTexts.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});
gsap.to(skillTexts, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#skills",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});

// Education section animations
const edTexts = document.querySelectorAll("#education h2 span");
edTexts.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});
gsap.to(edTexts, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#education",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});

let mmEd = gsap.matchMedia();

mmEd.add("(min-width: 769px)", () => {
  gsap.to(".ed1", {
    duration: 3,
    scrollTrigger: {
      trigger: ".ed1",
      start: "top 10%",
      end: "bottom -27%",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });

  gsap.to(".ed2", {
    duration: 3,
    scrollTrigger: {
      trigger: ".ed2",
      start: "top 27%",
      end: "bottom 40%",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  });
});

// About section animations
const aboutTexts = document.querySelectorAll("#about h2 span");
aboutTexts.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});
gsap.to(aboutTexts, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});

// Lightbox Preview Functions
function openLightbox(src, title) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  
  img.src = src;
  titleEl.textContent = title;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Mobile menu toggle logic
const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("header .menu");
const navLinks = document.querySelectorAll("header .menu a");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    menu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      menu.classList.remove("active");
    });
  });
}