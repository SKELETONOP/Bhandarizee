/* ===================================================================
   Hero particle background — Three.js
   Renders a soft field of drifting gold particles behind the hero
   section. Automatically reduces particle count on small screens and
   is disabled entirely when the user prefers reduced motion.
   =================================================================== */

(function () {
  "use strict";

  var canvas = document.getElementById("heroCanvas");
  if (!canvas || typeof THREE === "undefined") return;

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hero = document.getElementById("home");
  var renderer, scene, camera, particles, rafId;
  var mouseX = 0, mouseY = 0;
  var running = false;

  function particleCount() {
    var w = window.innerWidth;
    if (w < 600) return 350;
    if (w < 1100) return 700;
    return 1300;
  }

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(hero.clientWidth, hero.clientHeight);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, hero.clientWidth / hero.clientHeight, 1, 2000);
    camera.position.z = 420;

    var count = particleCount();
    var positions = new Float32Array(count * 3);
    var sizes = new Float32Array(count);

    for (var i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 700;
      sizes[i] = Math.random() * 2.4 + 0.6;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    var material = new THREE.PointsMaterial({
      color: 0xe0a638,
      size: 2.2,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener("resize", onResize);
    hero.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  function onResize() {
    if (!renderer || !camera) return;
    var w = hero.clientWidth, h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function onVisibilityChange() {
    if (document.hidden) {
      stop();
    } else if (isHeroVisible()) {
      start();
    }
  }

  function isHeroVisible() {
    var rect = hero.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function animate() {
    if (!running) return;
    rafId = requestAnimationFrame(animate);

    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0001;
    camera.position.x += (mouseX * 40 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 30 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  function start() {
    if (running || !renderer) return;
    running = true;
    animate();
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function renderStaticFrame() {
    if (!renderer) return;
    renderer.render(scene, camera);
  }

  function boot() {
    if (!hero) return;
    init();

    if (prefersReducedMotion) {
      renderStaticFrame();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) start();
        else stop();
      });
    }, { threshold: 0 });
    observer.observe(hero);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
