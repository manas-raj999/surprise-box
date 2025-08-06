// --- main.js ---

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // ---- TYPEWRITER EFFECT ----
  const message = "Happy Birthday";
  const output = document.getElementById('typewriter-output');
  let i = 0;
  function typeNext() {
    if (output && i <= message.length) {
      output.textContent = message.slice(0, i);
      i++;
      setTimeout(typeNext, 110);
    }
  }
  typeNext();

  // ---- FALLING HEARTS ANIMATION ----
  const heartsContainer = document.querySelector('.falling-hearts');
  function createHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    const colorArr = ["#ffb6c1","#ff7eb9","#ffb6d1","#ffbad3","#fbb1cf"];
    const left = Math.random() * 100;
    heart.style.left = left + "vw";
    heart.style.top = (Math.random() * -10) + "vh";
    // SVG heart
    heart.innerHTML = `<svg viewBox="0 0 32 32" fill="none"><path d="M16 29.2c-7.2-5.1-12-8.5-12-13.3A6.7 6.7 0 0 1 16 6.5a6.7 6.7 0 0 1 12 9.4c0 4.8-4.8 8.2-12 13.3z" fill="${colorArr[Math.floor(Math.random()*colorArr.length)]}"/></svg>`;
    heart.style.animationDuration = (2.6 + Math.random() * 0.7) + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
  // Launch hearts every ~140ms, 2-3 at a time
  if (heartsContainer) {
    setInterval(()=>{
      for(let j=0;j<Math.random()*1.7+1;j++) createHeart();
    },140);
  }

  // ----------- Floating Hearts/Stars -----------
  const decorCont = document.querySelector('.floating-decor');
  function spawnDecor() {
    if (!decorCont) return;
    const deco = document.createElement('div');
    const isHeart = Math.random() < 0.65, isStar = !isHeart && Math.random() < 0.9;
    let style = "position:absolute;width:29px;height:29px;left:"+(Math.random()*100)+"vw;top:"+(Math.random()*-18)+"vh;pointer-events:none;opacity:.87;";
    deco.style = style + "animation:floatDecor 2.7s linear forwards;z-index:20;";
    if(isHeart) {
      deco.innerHTML = `<svg width="29" height="29" fill="none"><path d="M14.5 27C-5 10 29-1 14.5 13 0-1 24 10 14.5 27z" fill="#ffb6d1"/></svg>`;
    } else if(isStar) {
      deco.innerHTML = `<svg width="23" height="23"><polygon points="11,1 14,8 22,8.9 16,14 18,22 11,18.5 4,22 6,14 0,8.9 8,8" fill="#eee1fc" opacity=".82"/></svg>`;
    } else {
      deco.innerHTML = `<svg width="14" height="14"><circle cx="7" cy="7" r="4" fill="#fcebeb" opacity=".6"/></svg>`;
    }
    deco.style.animationDuration = (2.3+Math.random()*1.2)+"s";
    decorCont.appendChild(deco);
    setTimeout(()=>deco.remove(), 2800);
  }
  setInterval( ()=>{ for(let i=0;i<1+Math.random()*1.85;i++) spawnDecor(); }, 130);

  // -- TWINKLING STARS --
  const starBg = document.querySelector('.star-bg');
  function spawnStar() {
    if (!starBg) return;
    const star = document.createElement('div');
    let size = Math.random() * 2.73 + 1.1;
    star.style.cssText =
      `position:absolute;left:${Math.random()*100}vw;top:${Math.random()*100}vh;width:${size}px;height:${size}px;border-radius:50%;background:#fff;opacity:${.45+Math.random()*0.48};box-shadow:0 0 ${9+Math.random()*19}px #e4dbfc99;animation:twinkle ${1.5+Math.random()*2.2}s infinite;`;
    starBg.appendChild(star);
    setTimeout(() => star.remove(), 6100);
  }
  if (starBg) {
    setInterval(() => { for(let i=0;i<2+Math.random()*3;i++) spawnStar(); }, 440);
  }

  // --------- MUSIC AUTOPLAY/LOW VOLUME ---------
  const music = document.getElementById('welcome-music');
  if (music) {
    music.volume = 0.13;
    document.body.addEventListener('click', ()=>{ music.volume=0.13; music.play().catch(()=>{}); }, {once:true});
  }

  // --------- BUTTON LOGIC: SCROLL or FADE to next section ---------
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  if (openSurpriseBtn) {
    openSurpriseBtn.onclick = function() {
      // Example: fade out #section-0, fade in #section-1, or use scroll
      // revealSection(1); // Your own navigation control
    };
  }

  const allSections = document.querySelectorAll('.section');
  let currentSection = 0;

  // Make all sections full viewport
  allSections.forEach(sec => {
    sec.style.minHeight = "100vh";
    sec.style.display = "flex";
    sec.style.flexDirection = "column";
    sec.style.justifyContent = "center";
    sec.style.alignItems = "center";
    sec.style.margin = 0;
    sec.style.padding = "0 8vw";
    sec.style.boxSizing = "border-box";
  });

  // Reveal logic
  function revealSection(idx, smooth = true) {
    if(idx < 0) idx = 0;
    if(idx >= allSections.length) idx = allSections.length - 1;
    currentSection = idx;

    allSections.forEach((sec, i) => {
      if(i === idx) {
        sec.classList.add('visible');
        sec.style.opacity = 1;
        sec.style.pointerEvents = "auto";
        if (smooth) sec.scrollIntoView({behavior:"smooth"});
        else sec.scrollIntoView();
      } else {
        sec.classList.remove('visible');
        sec.style.opacity = 0;
        sec.style.pointerEvents = "none";
      }
    });
  }

  // Next/Prev buttons
  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      let idx = parseInt(this.dataset.next,10);
      revealSection(idx);
    });
  });

  // Arrow key and scroll navigation
  window.addEventListener('keydown', ev => {
    if(ev.key === "ArrowDown" || ev.key === "PageDown") {
      revealSection(currentSection+1);
      ev.preventDefault();
    }
    if(ev.key === "ArrowUp" || ev.key === "PageUp") {
      revealSection(currentSection-1);
      ev.preventDefault();
    }
  });

  // Scroll/swipe between sections
  let lastScroll = Date.now();
  window.addEventListener('wheel', e => {
    if(Date.now()-lastScroll < 650) return;
    lastScroll = Date.now();
    if(e.deltaY > 0) revealSection(currentSection+1);
    else if(e.deltaY < 0) revealSection(currentSection-1);
  });

  let touchStart = null;
  window.addEventListener('touchstart', e => {
    touchStart = e.touches[0].clientY;
  });
  window.addEventListener('touchend', e => {
    if(touchStart === null) return;
    let diff = e.changedTouches[0].clientY - touchStart;
    if(Math.abs(diff) > 50) {
      revealSection(currentSection + (diff < 0 ? 1 : -1));
    }
    touchStart = null;
  });

  // Flip cards, puzzle, jar, vault as before...
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('active'));
  });
  document.querySelectorAll('.puzzle-piece').forEach(piece => {
    piece.addEventListener('click', function() {
      piece.classList.add('revealed');
    });
  });
  const jarImg = document.getElementById('jarImg'),
        affCards = Array.from(document.querySelectorAll('.affirm-card'));
  if (jarImg) {
    jarImg.addEventListener('click', () => {
      affCards.forEach(el=>el.classList.remove('selected'));
      let rand = Math.floor(Math.random() * affCards.length);
      let card = affCards[rand];
      card.classList.add('selected');
      card.scrollIntoView({behavior:'smooth', block:'center'});
      setTimeout(()=>card.classList.remove('selected'),1500);
    });
  }
  const vaultBox = document.getElementById('vaultBox');
  const giftCards = document.getElementById('giftCards');
  let vaultOpen = false;
  if (vaultBox && giftCards) {
    vaultBox.addEventListener('click', function() {
      vaultOpen = !vaultOpen;
      if(vaultOpen) {
        vaultBox.classList.remove('vault-locked');
        vaultBox.classList.add('vault-unlocked');
        vaultBox.innerHTML = "💝";
        giftCards.classList.add('show');
      } else {
        vaultBox.classList.remove('vault-unlocked');
        vaultBox.classList.add('vault-locked');
        vaultBox.innerHTML = "";
        giftCards.classList.remove('show');
      }
    });
  }

  // Countdown
  function updateCountdown() {
    const nextMeetDate = new Date('2025-09-01T17:30:00');
    const now = new Date();
    let diff = Math.floor((nextMeetDate-now)/1000);
    const countdownEl = document.getElementById('meetCountdown');
    if(!countdownEl) return;
    if(diff>0) {
      let d = Math.floor(diff/86400), h = Math.floor((diff%86400)/3600), m = Math.floor((diff%3600)/60), s = diff%60;
      let msg = "Time till we're together again: ";
      msg += `<b>${d} days, ${h} hours, ${m} minutes</b>`;
      countdownEl.innerHTML = msg;
    } else {
      countdownEl.innerHTML = "Together at last! 🎉";
    }
  }
  setInterval(updateCountdown, 20000); updateCountdown();

  // Background music (play on gesture if needed)
  const bgm = document.getElementById('background-music');
  if (bgm) {
    document.body.addEventListener('click', () => {
      bgm.volume = 0.15;
      bgm.play().catch(()=>{});
    }, {once:true});
  }

  // Reveal first section on page load
  revealSection(0, false);

  // ---- Flip single card on tap ----
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click',function(){
      card.classList.toggle('revealed');
    });
  });

  // ---- Reveal all cards ----
  const revealAllBtn = document.getElementById('revealAllBtn');
  if (revealAllBtn) {
    revealAllBtn.onclick = function(){
      document.querySelectorAll('.flip-card').forEach(c=>c.classList.toggle('revealed'));
    };
  }

  // ---- Optional: Floating hearts animation ----
  const heartsCont = document.querySelector('.floating-hearts');
  function createHeart() {
    if (!heartsCont) return;
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.style.left = (Math.random()*100) + "vw";
    heart.style.top = (Math.random() * -18) + "vh";
    heart.innerHTML = `<svg width="25" height="25" fill="none"><path d="M12 23C-4 10 25-1 12 14 0-1 29 10 12 23z" fill="#ffb6d1"/></svg>`;
    heart.style.animationDuration = (2.4 + Math.random() * 0.9) + "s";
    heartsCont.appendChild(heart);
    setTimeout(()=>heart.remove(), 3000);
  }
  if (heartsCont) {
    setInterval(()=>{ for(let j=0;j<1+Math.random()*1.5;j++) createHeart(); },170);
  }

  // ---- Optional: Fade in bg music ----
  const flipMusic = document.getElementById('flipMusic');
  if (flipMusic) {
    flipMusic.volume = 0.11;
    document.body.addEventListener('click',()=>{ 
      flipMusic.volume=0.11;
      flipMusic.play().catch(()=>{});
    }, {once:true});
  }

  /* Affirmations Array */
  const affirmations = [
    "You are enough, just as you are 💗",
    "You light up the lives of those around you 🌟",
    "You have a beautiful heart, and it shows 🌸",
    "You are stronger than your doubts 💪",
    "Even on tough days, your presence is a gift 🎁",
    "You deserve love, peace, and joy — every single day 🕊️",
    "You make the world a better place by being in it 🌍",
    "Your emotions are valid, and your voice matters 🫶",
    "Keep going, beautiful soul — you've got this ✨",
    "You bring so much warmth wherever you go 🔆",
    "You are love in human form 💞",
    "You are worthy of all good things 🌼",
    "You're doing better than you think 🧡",
    "It's okay to rest — your value isn't based on productivity 💤",
    "You make someone's life so much brighter 💡",
    "You're allowed to feel everything deeply 💬",
    "Your journey is uniquely beautiful 🌈",
    "The universe is rooting for you 🌌",
    "You're the kind of person the world needs more of 💫",
    "Today is another chance to begin again 🌿",
    "You are loved — always, unconditionally ❤️"
  ];

  const affirmationTextEl = document.getElementById('affirmation');
  const floatingNotesContainer = document.querySelector('.floating-notes');

  function showAffirmation() {
    // Pick random affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const text = affirmations[randomIndex];
    
    // Animate text update
    affirmationTextEl.classList.remove('animate');
    void affirmationTextEl.offsetWidth; // Trigger reflow to restart animation
    affirmationTextEl.textContent = text;
    affirmationTextEl.classList.add('animate');
    
    createFloatingNotes(); // Animate a few floating notes on pick
  }

  // Create floating notes animation
  function createFloatingNotes() {
    if (!floatingNotesContainer) return;
    const notesCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < notesCount; i++) {
      const note = document.createElement('div');
      note.className = 'floating-note';
      note.style.left = (20 + Math.random() * 60) + 'vw';
      note.style.top = '90vh';
      note.style.animationDuration = (3 + Math.random() * 1.5) + 's';
      note.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d291bc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
        </svg>`;
      floatingNotesContainer.appendChild(note);
      setTimeout(() => note.remove(), 4000);
    }
  }

  // Copy affirmation text to clipboard
  function copyAffirmation() {
    const text = affirmationTextEl.textContent;
    if (!text || text.startsWith('Click below')) {
      alert('Please pick an affirmation first.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      alert('Affirmation copied to clipboard!');
    }).catch(() => {
      alert('Copy failed. Please try manually.');
    });
  }

  // Download affirmation as a .txt file
  function downloadAffirmation() {
    const text = affirmationTextEl.textContent;
    if (!text || text.startsWith('Click below')) {
      alert('Please pick an affirmation first.');
      return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'affirmation.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  let boxOpened = false;

  // Gift box click handler
  const giftBoxEl = document.getElementById('giftBox');
  if (giftBoxEl) {
    giftBoxEl.addEventListener('click', function() {
      if (boxOpened) return;

      boxOpened = true;

      // Switch box appearance
      const closedBox = this.querySelector('.box-closed');
      const openBox = this.querySelector('.box-open');

      if (closedBox) closedBox.style.display = 'none';
      if (openBox) openBox.style.display = 'block';

      // Add a little bounce to the box
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);

      // Show gift cards with delay
      setTimeout(() => {
        const giftCards = document.getElementById('giftCards');
        if (giftCards) {
          giftCards.style.display = 'block';
          setTimeout(() => {
            giftCards.classList.add('show');
          }, 100);
        }
      }, 500);

      // Trigger confetti
      createConfetti();
    });
  }

  // Confetti animation
  function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    const colors = ['#ff6b8a', '#ff8fab', '#ffd700', '#c897d8', '#66BB6A', '#e23744'];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

      // Random shapes
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
      }

      container.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  }

  // Add sparkle effect around the gift box
  function addSparkles() {
    const giftBox = document.getElementById('giftBox');
    if (!giftBox || !giftBox.parentElement) return;
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = (Math.random() * 140) + 'px';
    sparkle.style.top = (Math.random() * 120) + 'px';
    sparkle.style.fontSize = '16px';
    sparkle.style.opacity = '0';
    sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';
    sparkle.style.pointerEvents = 'none';

    giftBox.parentElement.style.position = 'relative';
    giftBox.parentElement.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 2000);
  }

  // Add sparkle animation CSS
  const sparkleStyle = document.createElement('style');
  sparkleStyle.textContent = `
    @keyframes sparkleAnimation {
      0% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
      100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
  `;
  document.head.appendChild(sparkleStyle);

  // Periodically add sparkles around the unopened box
  const sparkleInterval = setInterval(() => {
    if (!boxOpened) {
      addSparkles();
    } else {
      clearInterval(sparkleInterval);
    }
  }, 800);

  // Flip passcode card on tap or keyboard enter/space
  const passcodeCard = document.querySelector('.passcode-card');
  const passcodeInput = document.getElementById('passcodeInput');
  const passcodeHelp = document.getElementById('passcodeHelp');
  const passcodeText = document.getElementById('passcodeText');
  const copyPasscodeBtn = document.querySelector('.copy-passcode');
  const submitBtn = document.getElementById('submitPasscodeBtn');
  const giftBoxContainer = document.getElementById('giftBoxContainer');
  const giftBox = document.getElementById('giftBox');

  // Actual passcode (change as needed)
  const SECRET_PASSCODE = 'LOVE21';

  // Allow flipping the passcode card
  if (passcodeCard) {
    passcodeCard.addEventListener('click', () => {
      passcodeCard.classList.toggle('flipped');
      passcodeCard.setAttribute('aria-pressed', passcodeCard.classList.contains('flipped').toString());
    });
    passcodeCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        passcodeCard.click();
      }
    });
  }

  // Copy passcode button
  if (copyPasscodeBtn && passcodeText) {
    copyPasscodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(passcodeText.textContent).then(() => {
        alert('Passcode copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy passcode. Please copy manually.');
      });
    });
  }

  // Unlock box on submit
  if (submitBtn && passcodeInput && passcodeHelp && giftBoxContainer && giftBox && giftCards) {
    submitBtn.addEventListener('click', () => {
      const val = passcodeInput.value.trim();
      if (!val) {
        passcodeHelp.textContent = 'Please enter the passcode.';
        passcodeInput.focus();
        return;
      }
      if (val.toUpperCase() === SECRET_PASSCODE) {
        passcodeHelp.textContent = '';
        // Hide passcode container
        const passcodeContainer = document.querySelector('.passcode-container');
        if (passcodeContainer) passcodeContainer.style.display = 'none';
        // Show gift box container
        giftBoxContainer.style.display = 'block';
        
        // Gift box click logic - open box and show cards
        giftBox.addEventListener('click', openGiftBoxOnce);
        // Optionally focus giftBox for keyboard accessibility
        giftBox.setAttribute('tabindex', '0');

        function openGiftBoxOnce() {
          if (giftBox.classList.contains('opened')) return;
          giftBox.classList.add('opened');

          // Switch box appearance
          const closedBox = giftBox.querySelector('.box-closed');
          const openBox = giftBox.querySelector('.box-open');
          if (closedBox) closedBox.style.display = 'none';
          if (openBox) openBox.style.display = 'block';

          // Animate box pop
          giftBox.style.transform = 'scale(1.1)';
          setTimeout(() => giftBox.style.transform = 'scale(1)', 200);

          // Reveal gift cards with fade + slide
          giftCards.style.display = 'block';
          setTimeout(() => giftCards.classList.add('show'), 50);
        }
      } else {
        passcodeHelp.textContent = 'Incorrect passcode, please try again.';
        passcodeInput.focus();
      }
    });
  }

  // Flip gift cards on click or keyboard enter/space
  document.querySelectorAll('#giftCards .flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', card.classList.contains('flipped').toString());
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // --- Floating soft sparkles/stars ---
  const closingSparkles = document.querySelector('.closing-sparkles');
  function makeSparkle() {
    if (!closingSparkles) return;
    const s = document.createElement('div');
    s.className = 'closing-sparkle';
    s.style.left = (18+Math.random()*64) + 'vw';
    s.style.top = (70+Math.random()*16) + 'vh';
    s.style.animationDuration = (2.8 + Math.random()*1.7) + 's';
    // Randomly pick soft sparkle/star SVG
    if (Math.random()<0.6) {
      // Sparkle
      s.innerHTML = `<svg width="18" height="18" fill="none"><path d="M9 0L10.5 7.5 18 9 10.5 10.5 9 18 7.5 10.5 0 9 7.5 7.5z" fill="#ffd6fa" opacity="0.8"/></svg>`;
    } else {
      // Little twinkle star
      s.innerHTML = `<svg width="14" height="14"><circle cx="7" cy="7" r="4" fill="#c8b2f3" opacity=".5"/></svg>`;
    }
    closingSparkles.appendChild(s);
    setTimeout(()=>s.remove(),3500);
  }
  setInterval(()=>{ for(let i=0;i<2+Math.random()*2;i++) makeSparkle(); },350);

  // --- Soft background music
  const finalMusic = document.getElementById('finalMusic');
  finalMusic && (finalMusic.volume = 0.13);
  document.body.addEventListener('click', ()=>{ if(finalMusic){finalMusic.volume=0.13;finalMusic.play().catch(()=>{});} }, {once:true});

  // --- "Replay Box" logic (you can link to your opening slide logic here) ---
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.onclick = function() {
      // Example: Jump to beginning, reset sections, etc.
      // revealSection(0); // If using revealSection()
      // Or scroll to start:
      window.scrollTo({top: 0, behavior: 'smooth'});
      // Add your own full box reset logic here if needed
    };
  }

  // --- WAVEFORM: simple animated bars (pulse with voice note audio) ---
  const simpleWave = document.getElementById('simpleWave');
  let bars = [];
  if(simpleWave){
    for(let i=0;i<19;i++){
      let s = document.createElement("span");
      s.style.height = (5+Math.random()*14|0)+"px";
      simpleWave.appendChild(s);bars.push(s);
    }
    function animateWave(on) {
      if(on){
        bars.forEach((bar,i)=>{
          let base = 8 + Math.abs(9-Math.abs(i-9))*1.4;
          bar.style.height = (base + Math.random()*16|0)+"px";
        });
      } else {
        bars.forEach(bar=>bar.style.height="7px");
      }
    }
    let isActive = false, waveInt;
    const audio = document.getElementById('voiceNoteAudio');
    if(audio){
      audio.addEventListener('play',()=>{isActive=true;waveInt=setInterval(()=>animateWave(true),99);});
      audio.addEventListener('pause',()=>{isActive=false;clearInterval(waveInt);animateWave(false);});
      audio.addEventListener('ended',()=>{isActive=false;clearInterval(waveInt);animateWave(false);});
    }
  }

  // ---- FLOATING MUSIC NOTES ----
  const floatingNotesCont = document.querySelector('.floating-notes');
  function createMusicNote(){
    if (!floatingNotesCont) return;
    const note = document.createElement('div');
    note.className='music-note';
    note.style.left=(18+Math.random()*64)+'vw';
    note.style.top=(70+Math.random()*16)+'vh';
    let set = [
      `<svg width="26" height="33" fill="none"><path d="M12 25Q14 17 14 3L24 5V31M14 23a6 6 0 0 0-8 6 6 6 0 1 0 8-6Z" stroke="#e7f6fe" stroke-width="2" fill="#ffe7f6b7"/></svg>`,
      `<svg width="26" height="33"><ellipse cx="15" cy="27" rx="7" ry="5" fill="#ffe9f7"/><rect x="13" y="5" width="3" height="23" rx="1.3" fill="#e0c4ec"/></svg>`,
      `<svg width="29" height="23"><path d="M15 21Q21 12 21 7Q21 3 17 3Q13 3 13 7Q13 12 19 21Z" fill="#b8e8f6"/></svg>`
    ];
    note.innerHTML = set[Math.floor(Math.random()*set.length)];
    note.style.animationDuration = (2.3+Math.random()*1.8)+'s';
    floatingNotesCont.appendChild(note);
    setTimeout(()=>note.remove(),3200);
  }

  // Animate notes when either player is on
  let musicActive = false;
  const audioEl = document.getElementById('voiceNoteAudio');
  if (audioEl) {
    audioEl.addEventListener('play',()=>{
      musicActive=true;
      let intv = setInterval(()=>{if(musicActive) createMusicNote();},211);
      audioEl.addEventListener('pause',()=>{musicActive=false;clearInterval(intv);},{once:true});
      audioEl.addEventListener('ended',()=>{musicActive=false;clearInterval(intv);},{once:true});
    });
  }

  let songIframe = document.querySelector('.playlist-side iframe');
  function triggerPlaylistNotes(){
    musicActive=true;
    let intv = setInterval(()=>{if(musicActive) createMusicNote();},300);
    setTimeout(()=>{musicActive=false;clearInterval(intv);},3700);
  }
  if(songIframe){
    // Play notes on click/touch (since autoplay can't be detected on iframe)
    songIframe.addEventListener('click',triggerPlaylistNotes);
    songIframe.addEventListener('touchstart',triggerPlaylistNotes);
  }

  // -- Optionally pulse aurora background with audio --
  if(audioEl){
    let aura = document.querySelector('.aurora-bg');
    let pulseInt;
    audioEl.addEventListener('play',()=>{
      pulseInt = setInterval(()=>{
        if(aura) aura.style.filter="brightness(1."+ (Math.floor(Math.random()*10)+5) + ")";
      },211);
    });
    audioEl.addEventListener('pause',()=>{if(aura)aura.style.filter="";clearInterval(pulseInt);});
    audioEl.addEventListener('ended',()=>{if(aura)aura.style.filter="";clearInterval(pulseInt);});
  }

  // -- STAR WISH REVEAL --
  const btn = document.getElementById('revealWish');
  const wish = document.getElementById('starWishMsg');
  if (btn && wish) {
    btn.addEventListener('click',()=>{ btn.style.display='none'; wish.style.display='block'; });
  }

  // -- STARRY AMBIENT MUSIC CONTROL --
  const starMusic = document.getElementById('star-ambient');
  starMusic && (starMusic.volume = 0.11);
  document.body.addEventListener('click', () => {
    if (starMusic) { starMusic.volume=0.11; starMusic.play().catch(()=>{});}
  },{once:true});

  // -- Envelope reveal logic --
  const env = document.getElementById('envelopeSvg');
  const envOpen = document.getElementById('envelopeOpen');
  const letter = document.getElementById('loveLetter');
  let opened = false;
  if (env && envOpen && letter) {
    env.onclick = function() {
      if(opened) return;
      opened = true;
      env.classList.add('fade-out');
      setTimeout(()=>{
        env.style.display='none';
        envOpen.style.display='block';
        setTimeout(()=>{
          envOpen.style.opacity=1;
          letter.style.display='block';
          setTimeout(()=> letter.classList.add('show'), 70);
        },380);
      },270);
      // Fade music in (if not already)
      const aud = document.getElementById('letter-music');
      if(aud){ aud.volume = 0.17; aud.play().catch(()=>{}); }
    };
  }

  // -- Floating petals/paper cranes/feathers animation --
  const floatPetals = document.querySelector('.floating-petals');
  if (floatPetals) {
    function createPetal() {
      const el = document.createElement('div');
      el.className = 'petal';
      if(Math.random()<0.55) { // Rose petal
        el.innerHTML = `<svg width="22" height="24" viewBox="0 0 22 24"><path d="M11 23Q4 18 5 9Q7 -1 11 1Q15 -1 17 9Q18 18 11 23Z" fill="#fbc2d1"/></svg>`;
      } else if(Math.random()<0.7) { // Feather
        el.innerHTML = `<svg width="19" height="21" viewBox="0 0 19 21"><path d="M11 2Q19 7 13 17Q6 26 2 11Q-1 2 11 2Z" fill="#f4e6fa" opacity=".94"/></svg>`;
      } else { // Paper crane
        el.innerHTML = `<svg width="21" height="15" fill="none"><polygon points="1,14 15,4 20,14 7,9" fill="#e5d3f7" opacity=".8"/></svg>`;
      }
      el.style.left = (Math.random()*100)+'vw';
      el.style.animation = `fallPetal ${(2.2+Math.random()*1.7).toFixed(2)}s linear forwards`;
      el.style.top = (Math.random()*-16)+'vh';
      floatPetals.appendChild(el);
      setTimeout(()=>el.remove(), 2900);
    }
    setInterval(()=>{for(let i=0;i<Math.random()*2+1;i++)createPetal();},160);
  }

  // -- Soft violin or piano music --
  const amusic = document.getElementById('letter-music');
  if (amusic) {
    amusic.volume = 0.13;
    document.body.addEventListener('click', () => {
      amusic.volume=0.13; 
      amusic.play().catch(()=>{});
    },{once:true});
  }

  // Global functions for HTML onclick attributes
  window.showAffirmation = showAffirmation;
  window.copyAffirmation = copyAffirmation;
  window.downloadAffirmation = downloadAffirmation;
});
