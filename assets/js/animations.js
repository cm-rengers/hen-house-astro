(function () {
  var EASE_SOFT = "power3.out";
  var EASE_SUBTLE = "power2.out";
  var DURATION_SHORT = 0.55;
  var DURATION_BASE = 0.8;
  var STAGGER_FAST = 0.06;
  var STAGGER_BASE = 0.08;

  function ensureVisibleBaseState() {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
      el.style.opacity = "";
      el.style.transform = "";
    });
  }

  function registerScrollTriggers(options) {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      ensureVisibleBaseState();
      return;
    }

    if (options && options.reducedMotion) {
      ensureVisibleBaseState();
      // Also disable any existing ScrollTriggers if they were created
      if (ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(function (st) {
          st.disable(false);
        });
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    animationRegistry.sectionReveal();
    animationRegistry.gridStagger();
    animationRegistry.mediaScaleIn();
    animationRegistry.heroParallax();
  }

  var animationRegistry = {
    sectionReveal: function () {
      var sections = document.querySelectorAll("[data-reveal='section']");
      sections.forEach(function (el) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            duration: DURATION_BASE,
            autoAlpha: 1,
            y: 0,
            ease: EASE_SOFT,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 65%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },

    gridStagger: function () {
      var grids = document.querySelectorAll("[data-reveal='grid']");
      grids.forEach(function (grid) {
        var items = grid.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 26 },
          {
            duration: DURATION_SHORT,
            autoAlpha: 1,
            y: 0,
            ease: EASE_SUBTLE,
            stagger: STAGGER_FAST,
            overwrite: "auto",
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
              end: "bottom 70%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },

    mediaScaleIn: function () {
      var mediaBlocks = document.querySelectorAll("[data-scale-media]");
      mediaBlocks.forEach(function (el) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.96, y: 18 },
          {
            duration: DURATION_BASE,
            autoAlpha: 1,
            scale: 1,
            y: 0,
            ease: EASE_SOFT,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              end: "bottom 62%",
              scrub: false,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },

    heroEntrance: function (options) {
      if (typeof gsap === "undefined") return;
      if (options && options.reducedMotion) return;

      var hero = document.querySelector("#hero");
      var copy = hero && hero.querySelector(".hero-copy");
      var headline = copy && copy.querySelector(".hero-title");
      var subcopy = copy && copy.querySelector(".hero-subtitle");
      var ctas = copy && copy.querySelector(".hero-ctas");
      var layers = hero ? hero.querySelectorAll(".hero-image-layer") : [];

      if (!hero || !copy || !layers.length) return;

      var tl = gsap.timeline({
        defaults: { ease: EASE_SOFT },
      });

      // Copy stack: headline → subcopy → CTAs
      if (headline) {
        tl.fromTo(
          headline,
          { autoAlpha: 0, y: 24 },
          { duration: DURATION_BASE, autoAlpha: 1, y: 0 }
        );
      }

      if (subcopy) {
        tl.fromTo(
          subcopy,
          { autoAlpha: 0, y: 18 },
          { duration: DURATION_SHORT, autoAlpha: 1, y: 0 },
          "-=0.35"
        );
      }

      if (ctas) {
        tl.fromTo(
          ctas,
          { autoAlpha: 0, y: 20 },
          { duration: DURATION_SHORT, autoAlpha: 1, y: 0 },
          "-=0.25"
        );
      }

      tl.fromTo(
        layers,
        { autoAlpha: 0, y: 40, scale: 1.02 },
        {
          duration: DURATION_BASE,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: STAGGER_BASE,
        },
        "-=0.35"
      );
    },

    heroParallax: function () {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

      var layers = document.querySelectorAll("[data-parallax]");
      if (!layers.length) return;

      layers.forEach(function (layer, index) {
        var yTarget = index === 0 ? -4 : -9;

        gsap.to(layer, {
          yPercent: yTarget,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      });
    },
  };

  function tagRevealElements() {
    // Hero copy
    var heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) {
      heroCopy.setAttribute("data-reveal", "section");
      heroCopy.classList.add("reveal");
    }

    // Story, amenities, gallery, location, testimonial, cta
    var sections = [
      ".section-story .story-grid",
      ".section-amenities .section-heading",
      ".section-location .location-grid",
      ".section-testimonial .testimonial-inner",
      ".section-cta .cta-grid",
    ];

    sections.forEach(function (selector) {
      var el = document.querySelector(selector);
      if (el) {
        el.setAttribute("data-reveal", "section");
        el.classList.add("reveal");
      }
    });

    // Grids
    var amenityGrid = document.querySelector(".amenities-grid");
    if (amenityGrid) {
      amenityGrid.setAttribute("data-reveal", "grid");
      amenityGrid.querySelectorAll(".amenity-card").forEach(function (card) {
        card.setAttribute("data-reveal-item", "");
        card.classList.add("reveal");
      });
    }

    var galleryGrid = document.querySelector(".gallery-grid");
    if (galleryGrid) {
      galleryGrid.setAttribute("data-reveal", "grid");
      galleryGrid.querySelectorAll(".gallery-item").forEach(function (item) {
        item.setAttribute("data-reveal-item", "");
        item.classList.add("reveal");
      });
    }
  }

  function init(options) {
    var safeOptions = options || {};

    tagRevealElements();

    if (safeOptions.reducedMotion) {
      ensureVisibleBaseState();
      return;
    }

    animationRegistry.heroEntrance(safeOptions);
    registerScrollTriggers(safeOptions);
  }

  window.HenHouseAnimations = {
    init: init,
  };
})();

