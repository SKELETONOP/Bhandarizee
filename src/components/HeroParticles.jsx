import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Hero particle background — a soft field of drifting gold particles.
   Ported from js/three-bg.js. Reduces particle count on small screens
   and is disabled (static frame) when the user prefers reduced motion. */
export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = document.getElementById("home");
    if (!canvas || !hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer, scene, camera, particles, rafId;
    let mouseX = 0,
      mouseY = 0;
    let running = false;

    function particleCount() {
      const w = window.innerWidth;
      if (w < 600) return 350;
      if (w < 1100) return 700;
      return 1300;
    }

    function init() {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(hero.clientWidth, hero.clientHeight);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        hero.clientWidth / hero.clientHeight,
        1,
        2000
      );
      camera.position.z = 420;

      const count = particleCount();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1400;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 700;
        sizes[i] = Math.random() * 2.4 + 0.6;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color: 0xe0a638,
        size: 2.2,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
    }

    function onResize() {
      if (!renderer || !camera) return;
      const w = hero.clientWidth,
        h = hero.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    function onMouseMove(e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function isHeroVisible() {
      const rect = hero.getBoundingClientRect();
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

    function onVisibilityChange() {
      if (document.hidden) stop();
      else if (isHeroVisible()) start();
    }

    init();
    window.addEventListener("resize", onResize);
    hero.addEventListener("mousemove", onMouseMove);
    document.addEventListener("visibilitychange", onVisibilityChange);

    let sectionObserver;
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0 }
      );
      sectionObserver.observe(hero);
    }

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (sectionObserver) sectionObserver.disconnect();
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="heroCanvas"
      className="hero-canvas"
      aria-hidden="true"
    />
  );
}
