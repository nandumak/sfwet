/**
 * AVANI & MANI — BIRTHDAY UNIVERSE & FINAL SECRET PROPOSAL 💍
 * Features:
 * 1. Web Audio API Romantic Synthesizer & Sound Effects
 * 2. Interactive 3D Birthday Cake & Wish
 * 3. React Bits AccordionGallery Component (GSAP-powered) with 5 Cropped Couple Photos
 * 4. "Avani Runs to Mani ❤️" 3D Chibi Sprites Interactive Animation
 * 5. Final Secret Proposal Scene with Paced Narrative, Velvet Ring Box, Celebrations & Forever Screen
 */

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. ROMANTIC WEB AUDIO SYNTHESIZER
  // =========================================================================
  let audioCtx = null;
  let audioEnabled = false;
  let ambientInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 1.2, gainLevel = 0.15) {
    if (!audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(gainLevel, audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playChimeSequence(notes, speed = 180) {
    if (!audioEnabled) return;
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 'sine', 1.6, 0.12);
      }, idx * speed);
    });
  }

  function playCelebrationFanfare() {
    // Joyous harp-like arpeggio in Eb Major: Eb4, G4, Bb4, C5, Eb5, G5, Bb5, C6
    const fanfare = [311.13, 392.00, 466.16, 523.25, 622.25, 783.99, 932.33, 1046.50];
    playChimeSequence(fanfare, 140);
  }

  function playRingRevealChime() {
    const notes = [440.00, 554.37, 659.25, 880.00];
    playChimeSequence(notes, 220);
  }

  function startAmbientRomanticArpeggio() {
    if (ambientInterval) clearInterval(ambientInterval);
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00]  // G
    ];
    let chordIdx = 0;
    ambientInterval = setInterval(() => {
      if (!audioEnabled) return;
      const chord = chords[chordIdx % chords.length];
      chord.forEach((freq, i) => {
        setTimeout(() => playTone(freq * 1.5, 'triangle', 2.5, 0.04), i * 350);
      });
      chordIdx++;
    }, 4500);
  }

  // Audio Toggle UI
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioStatusText = document.getElementById('audio-status');

  audioToggleBtn.addEventListener('click', () => {
    initAudio();
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
      audioStatusText.textContent = 'ON';
      audioToggleBtn.classList.add('is-active');
      playTone(523.25, 'sine', 0.8, 0.15);
      startAmbientRomanticArpeggio();
    } else {
      audioStatusText.textContent = 'OFF';
      audioToggleBtn.classList.remove('is-active');
      if (ambientInterval) clearInterval(ambientInterval);
    }
  });

  // =========================================================================
  // 2. INTERACTIVE BIRTHDAY CAKE & WISH
  // =========================================================================
  const btnWish = document.getElementById('btn-make-wish');
  const candleFlame = document.getElementById('flame');
  const wishStatus = document.getElementById('wish-status');

  btnWish.addEventListener('click', () => {
    candleFlame.classList.add('blown-out');
    playTone(392.00, 'sine', 1.0, 0.1);
    wishStatus.textContent = '✨ Your wish is sealed in the stars with Mani forever... ✨';
    btnWish.textContent = 'Wish Made with Love ❤️';
    btnWish.style.background = 'rgba(255, 215, 0, 0.35)';

    // Spawn sparkles around cake
    const cakeContainer = document.getElementById('cake-interactive');
    for (let i = 0; i < 20; i++) {
      spawnSparkle(cakeContainer);
    }
  });

  function spawnSparkle(container) {
    const s = document.createElement('span');
    s.textContent = '✦';
    s.style.position = 'absolute';
    s.style.left = `${30 + Math.random() * 40}%`;
    s.style.top = `${20 + Math.random() * 30}%`;
    s.style.color = '#ffd700';
    s.style.fontSize = `${10 + Math.random() * 14}px`;
    s.style.pointerEvents = 'none';
    s.style.transition = 'all 1.4s ease-out';
    s.style.opacity = '1';
    container.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translate(${-40 + Math.random() * 80}px, ${-60 - Math.random() * 50}px) scale(0)`;
      s.style.opacity = '0';
    });
    setTimeout(() => s.remove(), 1500);
  }

  // =========================================================================
  // 3. REACT BITS ACCORDION GALLERY (GSAP-POWERED)
  // =========================================================================
  const galleryItems = [
    { image: 'assets/couple_1_cherish.jpg', label: 'Forever in Your Eyes', alt: 'Avani and Mani sweet portrait' },
    { image: 'assets/couple_2_vintage.jpg', label: 'Just You & Me', alt: 'Vintage film memory' },
    { image: 'assets/couple_3_beach.jpg', label: 'Walking by the Shore', alt: 'Beach memories together' },
    { image: 'assets/couple_4_foliage.jpg', label: 'Every Smile Leads to You', alt: 'Golden smiles together' },
    { image: 'assets/couple_5_lounge.jpg', label: 'In Each Other\'s Arms', alt: 'Cozy moments together' }
  ];

  function initAccordionGallery() {
    const root = document.getElementById('accordion-gallery-root');
    if (!root) return;

    const count = galleryItems.length;
    let active = 2; // Default index 2 as requested
    const expandRatio = 0.52;
    const duration = 0.6;
    const ease = 'power3.out';
    const parallax = 0.5;
    const tilt = 8;
    const stagger = 0.06;
    const gap = 12;
    const radius = 18;

    root.innerHTML = '';
    const panelEls = [];
    const mediaEls = [];
    const barEls = [];
    const textEls = [];

    galleryItems.forEach((item, i) => {
      const panel = document.createElement('div');
      panel.className = `ag-panel${i === active ? ' ag-panel--active' : ''}`;
      panel.setAttribute('role', 'listitem');
      panel.setAttribute('tabindex', '0');
      panel.setAttribute('aria-label', item.label);
      panel.style.borderRadius = `${radius}px`;

      panel.innerHTML = `
        <span class="ag-panel__frame">
          <span class="ag-panel__media">
            <img src="${item.image}" alt="${item.alt || item.label}" draggable="false" loading="lazy">
          </span>
          <span class="ag-panel__overlay" aria-hidden="true"></span>
        </span>
        <span class="ag-panel__label" aria-hidden="true">
          <span class="ag-panel__bar"></span>
          <span class="ag-panel__text">${item.label}</span>
        </span>
      `;

      root.appendChild(panel);
      panelEls.push(panel);
      mediaEls.push(panel.querySelector('.ag-panel__media'));
      barEls.push(panel.querySelector('.ag-panel__bar'));
      textEls.push(panel.querySelector('.ag-panel__text'));

      panel.addEventListener('mouseenter', () => setActive(i));
      panel.addEventListener('click', () => setActive(i));
      panel.addEventListener('focus', () => setActive(i));
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          setActive((i + 1) % count);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setActive((i - 1 + count) % count);
        }
      });
    });

    let currentTl = null;
    let mediaSize = 340;

    function applyLayout(animate = true) {
      if (!window.gsap) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const dur = animate && !reduceMotion ? duration : 0;

      if (currentTl) currentTl.kill();
      const tl = window.gsap.timeline();

      panelEls.forEach((panel, i) => {
        const isActive = i === active;
        const media = mediaEls[i];
        const bar = barEls[i];
        const text = textEls[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;

        panel.classList.toggle('ag-panel--active', isActive);
        tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          tl.to(media, {
            xPercent: -50,
            yPercent: -50,
            x: isActive ? 0 : shift,
            '--ag-dim': isActive ? 0 : 0.35,
            duration: dur,
            ease
          }, 0);
        }

        if (bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: reduceMotion ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      currentTl = tl;
    }

    function setActive(index) {
      if (active === index) return;
      active = index;
      applyLayout(true);
      playTone(440 + index * 60, 'sine', 0.4, 0.04);
    }

    function measure() {
      const rect = root.getBoundingClientRect();
      const usable = Math.max(rect.width - gap * (count - 1), 120);
      mediaSize = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      root.style.setProperty('--ag-media-size', `${mediaSize}px`);
      applyLayout(false);
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
  }

  initAccordionGallery();

  // =========================================================================
  // 4. "AVANI RUNS TO MANI ❤️" — MINI 3D CHIBI COUPLE ANIMATION
  // =========================================================================
  const reunionSection = document.getElementById('reunion');
  const captionEl = document.getElementById('stage-caption');
  const btnTriggerRun = document.getElementById('btn-trigger-run');
  const heartPetalsContainer = document.getElementById('heart-petals');

  // Chibi sprite elements
  const imgAvaniStand = document.getElementById('img-avani-stand');
  const imgAvaniRun = document.getElementById('img-avani-run');
  const imgManiStand = document.getElementById('img-mani-stand');
  const imgManiOpen = document.getElementById('img-mani-open');
  const imgHugReach = document.getElementById('img-hug-reach');
  const imgHugTight = document.getElementById('img-hug-tight');

  let isAnimationRunning = false;
  let hasTriggeredOnScroll = false;

  function spawnHeartsAndPetals(amount = 16) {
    for (let i = 0; i < amount; i++) {
      const el = document.createElement('span');
      el.className = 'float-heart';
      el.textContent = Math.random() > 0.4 ? '♥' : (Math.random() > 0.5 ? '🌸' : '✨');
      el.style.left = `${15 + Math.random() * 70}%`;
      el.style.setProperty('--heart-color', ['#f4a7bb', '#ffd700', '#fff0df', '#fe9a8b'][i % 4]);
      el.style.setProperty('--heart-size', `${14 + Math.random() * 16}px`);
      el.style.setProperty('--heart-time', `${3 + Math.random() * 2}s`);
      el.style.setProperty('--drift', `${-50 + Math.random() * 100}px`);
      heartPetalsContainer.appendChild(el);
      setTimeout(() => el.remove(), 5200);
    }
  }

  function playChibiReunion() {
    if (isAnimationRunning) return;
    isAnimationRunning = true;

    // Reset initial state
    reunionSection.classList.remove('is-running', 'is-hugging');
    imgAvaniStand.classList.add('active');
    imgAvaniRun.classList.remove('active');
    imgManiStand.classList.add('active');
    imgManiOpen.classList.remove('active');
    imgHugReach.classList.add('active');
    imgHugTight.classList.remove('active');

    captionEl.textContent = 'Avani notices Mani... smiling warmly.';
    playTone(523.25, 'sine', 0.8, 0.08);

    // Step 2: Avani begins running toward Mani
    setTimeout(() => {
      captionEl.textContent = 'A little run, full of joy and love...';
      imgAvaniStand.classList.remove('active');
      imgAvaniRun.classList.add('active');
      imgManiStand.classList.remove('active');
      imgManiOpen.classList.add('active');
      reunionSection.classList.add('is-running');
      playTone(659.25, 'sine', 0.8, 0.08);
    }, 900);

    // Step 3: Reaches Mani and leaps into his embrace
    setTimeout(() => {
      reunionSection.classList.remove('is-running');
      reunionSection.classList.add('is-hugging');
      captionEl.textContent = 'Right here, in each other’s arms. ♥';
      spawnHeartsAndPetals(18);
      playChimeSequence([523.25, 659.25, 783.99, 1046.50], 120);
    }, 2400);

    // Step 4: Tight hug and peaceful smile
    setTimeout(() => {
      imgHugReach.classList.remove('active');
      imgHugTight.classList.add('active');
      captionEl.textContent = 'No matter how far apart we are, my favourite place will always be with you. ❤️';
      spawnHeartsAndPetals(12);
    }, 3800);

    // End lock
    setTimeout(() => {
      isAnimationRunning = false;
    }, 5500);
  }

  btnTriggerRun.addEventListener('click', playChibiReunion);

  // Scroll detection to trigger reunion when visible
  function checkReunionScroll() {
    if (hasTriggeredOnScroll) return;
    const rect = reunionSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3) {
      hasTriggeredOnScroll = true;
      playChibiReunion();
    }
  }

  window.addEventListener('scroll', checkReunionScroll, { passive: true });

  // =========================================================================
  // 5. PROPOSAL CANVASES (STARS, PETALS, FIREWORKS)
  // =========================================================================
  const starsCanvas = document.getElementById('stars-canvas');
  const petalsCanvas = document.getElementById('petals-canvas');
  const fireworksCanvas = document.getElementById('fireworks-canvas');

  let starsCtx = starsCanvas ? starsCanvas.getContext('2d') : null;
  let petalsCtx = petalsCanvas ? petalsCanvas.getContext('2d') : null;
  let fireworksCtx = fireworksCanvas ? fireworksCanvas.getContext('2d') : null;

  let width = window.innerWidth;
  let height = window.innerHeight;

  function resizeCanvases() {
    width = window.innerWidth;
    height = window.innerHeight;
    [starsCanvas, petalsCanvas, fireworksCanvas].forEach(c => {
      if (c) {
        c.width = width;
        c.height = height;
      }
    });
  }
  window.addEventListener('resize', resizeCanvases);
  resizeCanvases();

  // Fairy Lights Generator
  const fairyGarland = document.getElementById('fairy-lights');
  if (fairyGarland) {
    const bulbCount = Math.floor(window.innerWidth / 35);
    for (let i = 0; i < bulbCount; i++) {
      const bulb = document.createElement('span');
      bulb.className = 'light-bulb';
      bulb.style.setProperty('--twinkle-dur', `${2 + Math.random() * 2}s`);
      bulb.style.setProperty('--twinkle-delay', `${Math.random() * 2.5}s`);
      fairyGarland.appendChild(bulb);
    }
  }

  // Sparkling Stars
  const stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    });
  }

  function drawStars() {
    if (!starsCtx) return;
    starsCtx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.alpha += s.speed;
      const currentAlpha = 0.3 + Math.abs(Math.sin(s.alpha)) * 0.7;
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      starsCtx.fillStyle = `rgba(255, 230, 180, ${currentAlpha})`;
      starsCtx.shadowBlur = 6;
      starsCtx.shadowColor = '#ffd700';
      starsCtx.fill();
    });
  }

  // Floating Rose Petals
  const petals = [];
  const petalCount = 45;
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 10,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.45 + 0.45
    });
  }

  function drawPetals() {
    if (!petalsCtx) return;
    petalsCtx.clearRect(0, 0, width, height);
    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      petalsCtx.save();
      petalsCtx.translate(p.x, p.y);
      petalsCtx.rotate((p.rotation * Math.PI) / 180);
      petalsCtx.beginPath();
      petalsCtx.moveTo(0, 0);
      petalsCtx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
      petalsCtx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);

      const grad = petalsCtx.createRadialGradient(0, 0, 2, 0, 0, p.size);
      grad.addColorStop(0, `rgba(255, 110, 150, ${p.opacity})`);
      grad.addColorStop(0.7, `rgba(180, 20, 50, ${p.opacity * 0.9})`);
      grad.addColorStop(1, `rgba(100, 0, 25, ${p.opacity * 0.6})`);

      petalsCtx.fillStyle = grad;
      petalsCtx.fill();
      petalsCtx.restore();
    });
  }

  // Fireworks Animation Engine
  const fireworks = [];
  const particles = [];

  class Firework {
    constructor(targetX, targetY, color) {
      this.x = targetX;
      this.y = height;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      this.speed = 10;
      this.angle = Math.atan2(targetY - height, targetX - targetX);
      this.exploded = false;
    }
    update() {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.explode();
      }
    }
    draw() {
      if (!fireworksCtx) return;
      fireworksCtx.beginPath();
      fireworksCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      fireworksCtx.fillStyle = this.color;
      fireworksCtx.fill();
    }
    explode() {
      const count = 60;
      for (let i = 0; i < count; i++) {
        particles.push(new FireworkParticle(this.targetX, this.targetY, this.color));
      }
      playTone(300 + Math.random() * 300, 'sine', 0.6, 0.05);
    }
  }

  class FireworkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.012;
      this.gravity = 0.08;
    }
    update() {
      this.vx *= 0.97;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      if (!fireworksCtx) return;
      fireworksCtx.save();
      fireworksCtx.globalAlpha = Math.max(0, this.alpha);
      fireworksCtx.beginPath();
      fireworksCtx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      fireworksCtx.fillStyle = this.color;
      fireworksCtx.shadowBlur = 8;
      fireworksCtx.shadowColor = this.color;
      fireworksCtx.fill();
      fireworksCtx.restore();
    }
  }

  let fireworksActive = false;
  let fireworkTimer = null;

  function triggerFireworks(durationMs = 6000) {
    fireworksActive = true;
    const colors = ['#ffd700', '#ff69b4', '#fff0df', '#ff1493', '#ffa07a'];
    if (fireworkTimer) clearInterval(fireworkTimer);
    fireworkTimer = setInterval(() => {
      if (!fireworksActive) return;
      const x = width * 0.2 + Math.random() * (width * 0.6);
      const y = height * 0.15 + Math.random() * (height * 0.4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworks.push(new Firework(x, y, color));
    }, 450);

    setTimeout(() => {
      fireworksActive = false;
      clearInterval(fireworkTimer);
    }, durationMs);
  }

  function loopAnimation() {
    drawStars();
    drawPetals();

    if (fireworksCtx) {
      fireworksCtx.clearRect(0, 0, width, height);
      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (fireworks[i].exploded) fireworks.splice(i, 1);
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
      }
    }

    requestAnimationFrame(loopAnimation);
  }
  loopAnimation();

  // =========================================================================
  // 6. FINAL SECRET SCENE — "AVANI, WILL YOU MARRY ME?" 💍
  // =========================================================================
  const proposalScene = document.getElementById('proposal-scene');
  const btnOpenProposal = document.getElementById('open-proposal');
  const ringPedestal = document.getElementById('ring-pedestal');
  const questionBlock = document.getElementById('main-question-block');
  const buttonsWrap = document.getElementById('proposal-buttons-wrap');
  const celebrationYes = document.getElementById('celebration-yes');
  const celebrationAbsolutely = document.getElementById('celebration-absolutely');
  const finalScreen = document.getElementById('final-screen');
  const answerDisplay = document.getElementById('answer-display');

  // Narrative Lines
  const line1 = document.getElementById('prop-line-1');
  const line2 = document.getElementById('prop-line-2');
  const line3 = document.getElementById('prop-line-3');
  const line4 = document.getElementById('prop-line-4');

  function openProposalExperience(instant = false) {
    proposalScene.hidden = false;
    proposalScene.classList.remove('hidden');

    // Reset visibility
    [line1, line2, line3, line4].forEach(l => l.classList.remove('is-revealed'));
    questionBlock.classList.remove('is-revealed');
    buttonsWrap.classList.remove('is-revealed');
    celebrationYes.classList.add('hidden');
    celebrationAbsolutely.classList.add('hidden');
    finalScreen.classList.add('hidden');
    ringPedestal.classList.remove('is-open');

    proposalScene.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

    if (instant) {
      [line1, line2, line3, line4].forEach(l => l.classList.add('is-revealed'));
      ringPedestal.classList.add('is-open');
      questionBlock.classList.add('is-revealed');
      buttonsWrap.classList.add('is-revealed');
      return;
    }

    // Paced cinematic sequence
    setTimeout(() => {
      line1.classList.add('is-revealed');
      playTone(440, 'sine', 1.0, 0.08);
    }, 800);

    setTimeout(() => {
      line2.classList.add('is-revealed');
      playTone(493.88, 'sine', 1.0, 0.08);
    }, 3200);

    setTimeout(() => {
      line3.classList.add('is-revealed');
      playTone(554.37, 'sine', 1.0, 0.08);
    }, 6600);

    setTimeout(() => {
      line4.classList.add('is-revealed');
      playTone(659.25, 'sine', 1.0, 0.08);
    }, 10000);

    // Ring box opens gradually
    setTimeout(() => {
      ringPedestal.classList.add('is-open');
      playRingRevealChime();
    }, 12800);

    // Main Question & Answer Buttons reveal
    setTimeout(() => {
      questionBlock.classList.add('is-revealed');
      buttonsWrap.classList.add('is-revealed');
    }, 14200);
  }

  if (btnOpenProposal) {
    btnOpenProposal.addEventListener('click', () => openProposalExperience(false));
  }

  // Answer Buttons Handlers
  const btnYes = document.getElementById('btn-answer-yes');
  const btnAbsolutely = document.getElementById('btn-answer-absolutely');

  function handleAnswer(choice) {
    try {
      localStorage.setItem('avaniProposalSelection', choice);
    } catch (e) {
      // LocalStorage access safe
    }

    // Hide question & answer buttons
    questionBlock.classList.remove('is-revealed');
    buttonsWrap.classList.remove('is-revealed');

    // Trigger celebrations
    triggerFireworks(7000);
    playCelebrationFanfare();

    if (choice === 'yes') {
      celebrationYes.classList.remove('hidden');
      answerDisplay.textContent = 'YES! 💖';
      celebrationYes.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    } else {
      celebrationAbsolutely.classList.remove('hidden');
      answerDisplay.textContent = 'ABSOLUTELY YES!! 💍❤️';
      celebrationAbsolutely.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  }

  if (btnYes) btnYes.addEventListener('click', () => handleAnswer('yes'));
  if (btnAbsolutely) btnAbsolutely.addEventListener('click', () => handleAnswer('absolutely'));

  // Transition to Final Forever Screen
  function showFinalForeverScreen() {
    celebrationYes.classList.add('hidden');
    celebrationAbsolutely.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    finalScreen.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }

  const btnCont1 = document.getElementById('btn-continue-forever-1');
  const btnCont2 = document.getElementById('btn-continue-forever-2');
  if (btnCont1) btnCont1.addEventListener('click', showFinalForeverScreen);
  if (btnCont2) btnCont2.addEventListener('click', showFinalForeverScreen);

  // Final Action Buttons
  const btnRevisitMemories = document.getElementById('btn-revisit-memories');
  const btnReplayProposal = document.getElementById('btn-replay-proposal');
  const btnReplayBirthday = document.getElementById('btn-replay-birthday');
  const btnChangeAnswer = document.getElementById('btn-change-answer');

  if (btnRevisitMemories) {
    btnRevisitMemories.addEventListener('click', () => {
      document.getElementById('memories-album').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  if (btnReplayProposal) {
    btnReplayProposal.addEventListener('click', () => {
      openProposalExperience(false);
    });
  }

  if (btnReplayBirthday) {
    btnReplayBirthday.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  if (btnChangeAnswer) {
    btnChangeAnswer.addEventListener('click', () => {
      finalScreen.classList.add('hidden');
      celebrationYes.classList.add('hidden');
      celebrationAbsolutely.classList.add('hidden');
      questionBlock.classList.add('is-revealed');
      buttonsWrap.classList.add('is-revealed');
      questionBlock.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  // Check saved answer on load
  try {
    const saved = localStorage.getItem('avaniProposalSelection');
    if (saved) {
      answerDisplay.textContent = saved === 'yes' ? 'YES! 💖' : 'ABSOLUTELY YES!! 💍❤️';
    }
  } catch (e) {
    // LocalStorage fallback
  }
});
