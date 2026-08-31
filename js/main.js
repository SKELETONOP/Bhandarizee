/* ===================================================================
   Bhandarizee Motivation — site interactions
   =================================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initRevealAnimations();
    initCounters();
    initFaqAccordion();
    initGalleryLightbox();
    initVideoModal();
    initContactForm();
    initBackToTop();
    document.getElementById("year").textContent = new Date().getFullYear();
  });

  /* ---------- sticky header ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    var backdrop = document.getElementById("navBackdrop");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("open");
      backdrop.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openNav() {
      nav.classList.add("open");
      backdrop.classList.add("show");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      isOpen ? closeNav() : openNav();
    });
    backdrop.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- active nav link on scroll ---------- */
  function initScrollSpy() {
    var links = document.querySelectorAll(".nav-link");
    var sections = Array.prototype.slice.call(links)
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);

    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = "#" + entry.target.id;
        var link = document.querySelector('.nav-link[href="' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- scroll reveal ---------- */
  function initRevealAnimations() {
    var items = document.querySelectorAll(".reveal-up");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- animated stat counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll(".stat-number");
    if (!counters.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (reduced) { el.textContent = target; return; }

      var duration = 1500;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (i) {
          i.classList.remove("open");
          i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          question.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------- gallery lightbox ---------- */
  function initGalleryLightbox() {
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");
    if (!lightbox) return;

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var full = item.getAttribute("data-full");
        var alt = item.querySelector("img").getAttribute("alt");
        lightboxImg.setAttribute("src", full);
        lightboxImg.setAttribute("alt", alt);
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function close() {
      lightbox.classList.remove("open");
      lightboxImg.setAttribute("src", "");
      document.body.style.overflow = "";
    }
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- video modal (play button on video/gallery cards) ---------- */
  function initVideoModal() {
    var modal = document.getElementById("videoModal");
    var backdrop = document.getElementById("videoModalBackdrop");
    var closeBtn = document.getElementById("videoModalClose");
    var frame = document.getElementById("videoModalFrame");
    if (!modal) return;

    document.querySelectorAll(".video-card").forEach(function (card) {
      card.querySelector(".play-btn").addEventListener("click", function () {
        var id = card.getAttribute("data-youtube-id");
        frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + encodeURIComponent(id) +
          '?autoplay=1&rel=0" title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    function close() {
      modal.classList.remove("open");
      frame.innerHTML = "";
      document.body.style.overflow = "";
    }
    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- contact form (frontend-only simulated submit) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var requiredFields = ["name", "email", "message"];

    function isValidEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validate() {
      var valid = true;
      requiredFields.forEach(function (name) {
        var field = form.elements[name];
        var group = field.closest(".form-group");
        var fieldValid = field.value.trim().length > 0;
        if (name === "email" && fieldValid) fieldValid = isValidEmail(field.value.trim());
        group.classList.toggle("invalid", !fieldValid);
        if (!fieldValid) valid = false;
      });
      return valid;
    }

    requiredFields.forEach(function (name) {
      form.elements[name].addEventListener("input", function () {
        form.elements[name].closest(".form-group").classList.remove("invalid");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.remove("submitted");

      if (!validate()) return;

      // Frontend-only demo: simulate a network request, then show the
      // success message. Replace this block with a real request (e.g.
      // fetch() to Formspree/EmailJS/your API) to actually send the data.
      var submitBtn = form.querySelector(".form-submit .btn-label");
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending...";

      setTimeout(function () {
        submitBtn.textContent = originalLabel;
        form.classList.add("submitted");
        form.reset();
      }, 700);
    });
  }

  /* ---------- back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
