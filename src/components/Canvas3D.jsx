import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Canvas3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const pinkLight = new THREE.PointLight(0xff477e, 3.5, 20);
    pinkLight.position.set(-4, 3, 3);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xc8963e, 2.8, 20);
    goldLight.position.set(4, -3, 2);
    scene.add(goldLight);

    const mintLight = new THREE.PointLight(0x95d5b2, 2.5, 18);
    mintLight.position.set(0, 5, -2);
    scene.add(mintLight);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Hero 3D Centerpiece: Glossy Iridescent Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.3, 0.42, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff8ba7,
      emissive: 0x3a1020,
      roughness: 0.12,
      metalness: 0.25,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.35,
      ior: 1.4,
      reflectivity: 0.8,
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    torusKnot.position.set(2.8, 0.2, 0);
    group.add(torusKnot);

    // 2. Floating 3D Pastel Spheres & Crystals
    const floatingObjects = [];
    const sphereColors = [0xffc5d3, 0xc8963e, 0x95d5b2, 0xb5a4d4, 0xffd166, 0xff477e];
    
    // Create cute floating 3D spheres
    for (let i = 0; i < 9; i++) {
      const radius = 0.25 + Math.random() * 0.45;
      const sphereGeom = new THREE.SphereGeometry(radius, 32, 32);
      const sphereMat = new THREE.MeshPhysicalMaterial({
        color: sphereColors[i % sphereColors.length],
        roughness: 0.15,
        metalness: 0.3,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      
      const angle = (i / 9) * Math.PI * 2;
      const distance = 3.2 + Math.random() * 2.5;
      sphere.position.set(
        Math.cos(angle) * distance,
        Math.sin(angle) * 2.2 + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4
      );

      sphere.userData = {
        speedX: 0.003 + Math.random() * 0.005,
        speedY: 0.004 + Math.random() * 0.006,
        rotSpeed: 0.01 + Math.random() * 0.02,
        baseY: sphere.position.y,
        timeOffset: Math.random() * Math.PI * 2,
      };

      floatingObjects.push(sphere);
      group.add(sphere);
    }

    // 3. Floating 3D Star Crystals (Icosahedrons)
    for (let i = 0; i < 6; i++) {
      const icoGeom = new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.25, 0);
      const icoMat = new THREE.MeshStandardMaterial({
        color: 0xffd166,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ico = new THREE.Mesh(icoGeom, icoMat);
      ico.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      ico.userData = {
        rotX: 0.015,
        rotY: 0.02,
        timeOffset: Math.random() * 10,
      };
      floatingObjects.push(ico);
      group.add(ico);
    }

    // 4. Sparkle Particle Field
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i + 2] = (Math.random() - 0.5) * 15;

      const c = new THREE.Color(sphereColors[Math.floor(Math.random() * sphereColors.length)]);
      particleColors[i] = c.r;
      particleColors[i + 1] = c.g;
      particleColors[i + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax & Scroll Scrubbing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Scroll effect on 3D scene (rotates and translates as user scrolls)
      const scrollFactor = scrollY * 0.0015;

      // Rotate centerpiece
      torusKnot.rotation.x = elapsedTime * 0.35 + scrollFactor * 1.5;
      torusKnot.rotation.y = elapsedTime * 0.5 + targetX * 0.8;
      torusKnot.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;

      // Responsive positioning for torusKnot based on screen width
      if (window.innerWidth < 1024) {
        torusKnot.position.x = 0;
        torusKnot.position.y = -0.5 - Math.sin(scrollFactor) * 0.5;
        torusKnot.scale.setScalar(0.85);
      } else {
        torusKnot.position.x = 2.6 + targetX * 0.3;
        torusKnot.position.y = 0.2 - targetY * 0.3 - scrollFactor * 0.4;
        torusKnot.scale.setScalar(1.15);
      }

      // Animate floating spheres & crystals
      floatingObjects.forEach((obj) => {
        if (obj.userData.baseY !== undefined) {
          obj.position.y =
            obj.userData.baseY +
            Math.sin(elapsedTime * 1.5 + obj.userData.timeOffset) * 0.35;
          obj.position.x += Math.cos(elapsedTime * 0.8 + obj.userData.timeOffset) * 0.002;
          obj.rotation.x += 0.01;
          obj.rotation.y += 0.01;
        } else {
          obj.rotation.x += obj.userData.rotX || 0.01;
          obj.rotation.y += obj.userData.rotY || 0.01;
        }
      });

      // Animate particle system
      particleSystem.rotation.y = elapsedTime * 0.04 + scrollFactor * 0.2;
      particleSystem.rotation.x = targetY * 0.1;

      // Parallax scene camera
      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.88 }}
      aria-hidden="true"
    />
  );
}
