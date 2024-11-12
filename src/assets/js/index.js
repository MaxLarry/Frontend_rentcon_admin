import gsap from "gsap";
import { Expo } from "gsap";

function initLoader() {
  var tl = gsap.timeline();

  // Disable cursor and stop scroll
  tl.set("html", { cursor: "wait" }).call(() => {
    console.log("Stopping scroll...");
    // Check if scroll is initialized, stop if needed
    if (window.scroll && window.scroll.stop) {
      window.scroll.stop();
    }
    console.log("Scroll stopped.");
  });

  // Add video fade-in and other shutter animations
  tl.set(".loading-screen .icon-box video", { display: "flex" });
  
  tl.to(
    ".loading-screen .icon-box video",
    { display: "none", duration: 4.5, ease: Expo.easeInOut }
  );

  tl.to(
    ".loading-screen .shutter",
    {
      yPercent: -100,
      duration: 2.6,
      stagger: 0.05,
      ease: Expo.easeOut,
      delay: 4,
    },
    "<0.7"
  );

  // Restore cursor and restart scroll after animation completes
  tl.set("html", { cursor: "auto" }, "-=1.2").call(() => {
    console.log("Starting scroll...");
    // Check if scroll is initialized, start if needed
    if (window.scroll && window.scroll.start) {
      window.scroll.start();
    }
    console.log("Scroll started.");
  });
}

export default initLoader;
