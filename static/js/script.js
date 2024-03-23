const generateGlowButtons = () => {
  document.querySelectorAll(".glow-button").forEach((button) => {
    let gradientElem = button.querySelector(".gradient");

    if (!gradientElem) {
      console.log(gradientElem, "=hey");
      gradientElem = document.createElement("div");
      gradientElem.classList.add("gradient");

      button.appendChild(gradientElem);
    }

    button.addEventListener("pointermove", (e) => {
      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(button, {
        "--pointer-x": `${x}px`,
        "--pointer-y": `${y}px`,
        duration: 0.6,
      });

      gsap.to(button, {
        "--button-glow": chroma
          .mix(
            getComputedStyle(button)
              .getPropertyValue("--button-glow-start")
              .trim(),
            getComputedStyle(button)
              .getPropertyValue("--button-glow-end")
              .trim(),
            x / rect.width
          )
          .hex(),
        duration: 0.2,
      });
    });
  });
};

// Set variables on loaded
document.addEventListener("DOMContentLoaded", generateGlowButtons);

// Set variables on resize
window.addEventListener("resize", generateGlowButtons);

// flipper

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // rotate out letters of current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  // reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);
