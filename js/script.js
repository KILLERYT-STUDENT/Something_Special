/* ===========================================
   RAKSHA BANDHAN GIFT WEBSITE
   For Nisha Didi — From Naveen ❤️
=========================================== */

/* ==========================
   DOM REFERENCES
========================== */

const pages = document.querySelectorAll("section");
const loader = document.getElementById("loader");
const startBtn = document.getElementById("beginBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const heart = document.getElementById("magicHeart");
const continueBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restartBtn");
const unlockLetterBtn = document.getElementById("unlockLetterBtn");

/* ==========================
   QUIZ DATA
========================== */

const quizData = [
  {
    question: "What does I Bhai do the most? 🤔",
    options: ["Sleeping 😴", "Overthinking 🧠", "Coding 💻", "Gaming"],
    correct: 2
  },
  {
    question: "What You Feel Talking to Me",
    options: ["Boring", "Akward", "Nervous", "Strange"],
    correct: 2
  },
  {
    question: "What is the bond between us? 🤝",
    options: ["Brother Sister by Love", "A Best Brother & Sister", "Brother-Sister by Heart ❤️", "A Best Frined"],
    correct: 2
  }
];

let quizScore = 0;
let currentQuestion = 0;
let typedInstance = null;

/* ==========================
   LOADER
========================== */

window.addEventListener('load', () => {

  setTimeout(() => {

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {

      loader.style.display = "none";

    }, 700);

  }, 3200);

});

/* ==========================
   CREATE PARTICLES
========================== */

function createParticles() {

  const container = document.getElementById('particles');
  const particleCount = 25;
  const emojis = ['🌸', '💗', '✨', '💖', '🩷', '💕', '🫧'];

  for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random emoji or circle
    if (Math.random() > 0.4) {
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.fontSize = (Math.random() * 18 + 10) + 'px';
      particle.style.background = 'none';
      particle.style.width = 'auto';
      particle.style.height = 'auto';
    } else {
      const colors = ['#ff69b4', '#ff4fa1', '#ff7ec9', '#ffd86f', '#a76dff'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
    }

    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';

    container.appendChild(particle);

  }

}

createParticles();

/* ==========================
   CREATE FIREFLIES (Ending)
========================== */

function createFireflies() {

  const container = document.getElementById('fireflies');
  if (!container) return;

  // Create stars
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 5) + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }

  // Create fireflies
  for (let i = 0; i < 20; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.top = Math.random() * 100 + '%';
    firefly.style.setProperty('--fx', (Math.random() * 200 - 100) + 'px');
    firefly.style.setProperty('--fy', (Math.random() * 200 - 100) + 'px');
    firefly.style.animationDuration = (Math.random() * 8 + 5) + 's';
    firefly.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(firefly);
  }

}

createFireflies();

/* ==========================
   PAGE NAVIGATION
========================== */

function showPage(id) {

  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

}

/* ==========================
   START / BEGIN BUTTON
========================== */

if (startBtn) {

  startBtn.addEventListener('click', () => {

    // Try to play music
    if (music) {
      music.volume = 0.3;
      music.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i><span>Music</span>';
      }).catch(() => {
        // autoplay blocked — user can click music btn manually
      });
    }

    showPage("scrapbook");

  });

}

/* ==========================
   MUSIC BUTTON
========================== */

musicBtn.addEventListener('click', () => {

  if (music.paused) {
    music.volume = 0.3;
    music.play();
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i><span>Music</span>';
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i><span>Music</span>';
  }

});

/* ==========================
   GO TO QUIZ BUTTON
========================== */

const goToQuizBtn = document.getElementById('goToQuizBtn');
if (goToQuizBtn) {
  goToQuizBtn.addEventListener('click', () => {
    showPage("quizSection");
  });
}

/* ==========================
   POLAROID HOVER EFFECTS
========================== */

const polaroids = document.querySelectorAll('.polaroid');

/* ==========================
   QUIZ LOGIC
========================== */

function renderQuiz() {

  const container = document.getElementById('quizContainer');
  container.innerHTML = '';

  quizData.forEach((q, index) => {

    const card = document.createElement('div');
    card.classList.add('quiz-card');
    card.id = 'quizCard-' + index;

    if (index > 0) card.style.display = 'none';

    let optionsHTML = '<div class="quiz-options">';
    q.options.forEach((opt, optIdx) => {
      optionsHTML += `<button class="quiz-option" data-question="${index}" data-option="${optIdx}">${opt}</button>`;
    });
    optionsHTML += '</div>';

    card.innerHTML = `
      <h3>Question ${index + 1} of ${quizData.length}</h3>
      <h2>${q.question}</h2>
      ${optionsHTML}
    `;

    container.appendChild(card);

  });

  // Attach click events to options
  document.querySelectorAll('.quiz-option').forEach(btn => {

    btn.addEventListener('click', handleQuizAnswer);

  });

}

function handleQuizAnswer(e) {

  const btn = e.target;
  const questionIdx = parseInt(btn.dataset.question);
  const optionIdx = parseInt(btn.dataset.option);
  const correctIdx = quizData[questionIdx].correct;

  // Disable all options for this question
  const card = document.getElementById('quizCard-' + questionIdx);
  card.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.add('disabled');
  });

  // Mark correct/wrong
  if (optionIdx === correctIdx) {
    btn.classList.add('correct');
    quizScore++;

    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#4caf50', '#8bc34a', '#cddc39']
      });
    }
  } else {
    btn.classList.add('wrong');
    // Highlight the correct answer
    card.querySelectorAll('.quiz-option')[correctIdx].classList.add('correct');
  }

  // Move to next question or show result
  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

      card.style.display = 'none';
      const nextCard = document.getElementById('quizCard-' + currentQuestion);
      nextCard.style.display = 'block';

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(nextCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      }

    } else {

      // Show quiz result
      document.getElementById('quizContainer').style.display = 'none';
      const result = document.getElementById('quizResult');
      result.style.display = 'block';

      const scoreText = document.getElementById('scoreText');
      const resultTitle = document.getElementById('resultTitle');
      const resultEmoji = document.getElementById('resultEmoji');

      scoreText.textContent = `You scored ${quizScore} out of ${quizData.length}!`;

      if (quizScore === quizData.length) {
        resultEmoji.textContent = '🎉';
        resultTitle.textContent = 'Perfect Score! You Know Me So Well!';
      } else if (quizScore >= 2) {
        resultEmoji.textContent = '😊';
        resultTitle.textContent = 'Almost There! Great Job!';
      } else {
        resultEmoji.textContent = '💖';
        resultTitle.textContent = 'It\'s Okay! Love Is What Matters!';
      }

      if (typeof gsap !== 'undefined') {
        gsap.from(result, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out" });
      }

      // Big confetti celebration
      if (typeof confetti !== 'undefined') {
        confetti({
          particleCount: 150,
          spread: 140,
          origin: { y: 0.5 },
          colors: ['#ff4fa1', '#ff7ec9', '#ffd86f', '#a76dff']
        });
      }

    }

  }, 1200);

}

renderQuiz();

/* ==========================
   UNLOCK LETTER
========================== */

if (unlockLetterBtn) {

  unlockLetterBtn.addEventListener('click', () => {

    showPage("letterSection");

    // Delay to let scroll finish, then start typing
    setTimeout(() => {
      startTypedLetter();
    }, 800);

  });

}

/* ==========================
   TYPED LETTER
========================== */

function startTypedLetter() {

  const typedTarget = document.getElementById('typedLetter');
  if (!typedTarget) return;

  // Clear existing
  typedTarget.innerHTML = '';

  // Destroy previous instance
  if (typedInstance) {
    typedInstance.destroy();
  }

  const letterText = `Dear Nisha Didi ❤️,

Happy Raksha Bandhan!

I honestly don't know how to put everything I feel into words...

We don't share the same blood, but you know what?
That never mattered. Not even for a single second.

You became my Didi not by birth, but by love.
And honestly? That's a bond even stronger than blood.

Every time I needed someone, you were there.
Every time I felt lost, you showed me the way.
You are not just a sister — you are my strength,
my protector, my guide.

This might be our last Raksha Bandhan together like this...
And that thought alone making my heart heavy.
But no matter where life takes us,
no distance, no time, nothing can ever break what we have.

You'll always be my Didi. Always. ❤️

Thank you for being in my Life.
Thank you for being YOU.

Happy Raksha Bandhan ❤️

— Your Brother,
   Naveen`;

  try {

    typedInstance = new Typed("#typedLetter", {
      strings: [letterText],
      typeSpeed: 30,
      showCursor: true,
      cursorChar: "❤️",
      onComplete: () => {
        // Show continue button after letter finishes
        const footer = document.getElementById('letterFooter');
        if (footer) {
          footer.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.from(footer, { opacity: 0, y: 20, duration: 0.6 });
          }
        }
      }
    });

  } catch (e) {
    // Fallback if Typed.js fails
    typedTarget.textContent = letterText;
    const footer = document.getElementById('letterFooter');
    if (footer) footer.style.display = 'block';
  }

}

/* ==========================
   CONTINUE BUTTON → CERTIFICATE
========================== */

if (continueBtn) {

  continueBtn.addEventListener('click', () => {

    showPage("certificateSection");

    // Confetti celebration for certificate
    setTimeout(() => {
      if (typeof confetti !== 'undefined') {

        // Grand celebration
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4fa1', '#ff7ec9', '#ffd86f']
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#a76dff', '#ff69b4', '#ff7ec9']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };

        frame();

      }
    }, 500);

    // Auto scroll to ending after a pause
    setTimeout(() => {
      showPage("endingSection");
    }, 6000);

  });

}

/* ==========================
   RESTART BUTTON
========================== */

if (restartBtn) {

  restartBtn.addEventListener('click', () => {

    // Reset quiz
    quizScore = 0;
    currentQuestion = 0;
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    renderQuiz();

    // Reset letter
    const typedTarget = document.getElementById('typedLetter');
    if (typedTarget) typedTarget.innerHTML = '';
    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }
    const letterFooter = document.getElementById('letterFooter');
    if (letterFooter) letterFooter.style.display = 'none';

    // Scroll to top
    showPage("hero");

  });

}

/* ==========================
   EASTER EGG — 25 clicks on page
========================== */

let easterEggClicks = 0;

document.body.addEventListener('click', () => {

  easterEggClicks++;

  if (easterEggClicks === 25) {
    alert("❤️ Nisha Didi, you'll always be the best sister in the world! — Naveen 💖");

    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 300,
        spread: 180,
        origin: { y: 0.5 },
        colors: ['#ff4fa1', '#ff7ec9', '#ffd86f', '#a76dff', '#ff69b4']
      });
    }

    easterEggClicks = 0;
  }

});

/* ==========================
   PREVENT RIGHT CLICK (Gift Protection)
========================== */

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
