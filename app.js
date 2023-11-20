let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let colors = ["blue", "red", "yellow", "green"];
let h3 = document.querySelector("h3");
let score = [];
const screenWidth = window.innerWidth;
//Game Starter
document.addEventListener("keypress", function () {
  if (start == false) {
    start = true;
    levelUp();
  }
});
document.addEventListener("touchstart", function () {
  if (start == false) {
    start = true;
    levelUp();
  }
});

function updateTextForMobile() {
  if (screenWidth <= 768) {
    h3.textContent = "Touch anywhere to start";
  } else {
    h3.textContent = "Press any key to start";
  }
}

updateTextForMobile();
window.addEventListener("resize", updateTextForMobile);

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let randomColor = Math.floor(Math.random() * 4);
  let color = document.querySelector(`.${colors[randomColor]}`);
  gameSeq.push(colors[randomColor]);
  blinking(color);
}
let allBtns = document.querySelectorAll(".clr");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress);
}

function blinking(color) {
  color.classList.add("blink");
  setTimeout(() => {
    color.classList.remove("blink");
  }, 250);
}

function userBlinking(color) {
  color.classList.add("userBlink");
  setTimeout(() => {
    color.classList.remove("userBlink");
  }, 250);
}

function btnPress() {
  let btn = this;
  userBlinking(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}
function checkAns(e) {
  if (userSeq[e] === gameSeq[e]) {
    if (userSeq.length == gameSeq.length) {
      document.querySelector("body").style.backgroundColor = "green";
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
      }, 150);
      setTimeout(levelUp, 1000);
    }
  } else {
    score.push(level);
    let highscore = score.reduce(
      (acc, current) => Math.max(acc, current),
      -Infinity
    );

    if (screenWidth <= 768) {
      h3.innerHTML = `Game Over. Your Score was <b>${level}.</b> <br />Highest Score ${highscore}. Touch anywhere to restart.`;
    } else {
      h3.innerHTML = `Game Over. Your Score was <b>${level}.</b> <br />Highest Score ${highscore}. Press any Key to restart.`;
    }
    // h3.innerHTML = `Game Over. Your Score was <b>${level}.</b> <br />Highest Score ${highscore}. Press any Key to restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    resetGame();
  }
}
function resetGame() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  start = false;
}
