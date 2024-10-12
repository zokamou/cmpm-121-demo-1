import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super duper awesome insane game :D";
document.title = gameName;

let counter: number = 0;
let upgrade: number = 1;
let apple: number = 0;
let watermelon: number = 0;
let strawberry: number = 0;

// display elements ----------------------------------------------

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const itemcount = document.createElement("h2");
itemcount.innerHTML =
  "strawberry: " +
  strawberry +
  " apple: " +
  apple +
  " watermelon: " +
  watermelon;
app.append(itemcount);

const growthdisplay = document.createElement("h2");
growthdisplay.innerHTML = "current growth rate: " + upgrade;
app.append(growthdisplay);

const button = document.createElement("button");
button.innerHTML = "Click me! 🐢";
button.addEventListener("click", () => {
  counter += 1;
  scoreDisplay.innerHTML = counter.toString() + " 🐢";
  updatePurchaseButtonStateA();
  updatePurchaseButtonStateB();
  updatePurchaseButtonStateC();
});
app.append(button);

const scoreDisplay = document.createElement("div");
scoreDisplay.innerHTML = counter.toString() + " 🐢";
app.append(scoreDisplay);

// timer by frame ----------------------------------------------

let last: number | undefined;
function step(timestamp: number) {
  if (last === undefined) {
    last = timestamp;
  }

  const elapsed = (timestamp - last) / 1000;
  counter += upgrade * elapsed;
  scoreDisplay.innerHTML = counter.toFixed(0) + " 🐢";
  updatePurchaseButtonStateA();
  updatePurchaseButtonStateB();
  updatePurchaseButtonStateC();
  last = timestamp;

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

// button A ----------------------------------------------

const purchaseButtonA = document.createElement("button");
purchaseButtonA.innerHTML = "Buy a strawberry for 10 turtles 🍓";
purchaseButtonA.disabled = true;

purchaseButtonA.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    upgrade += 0.1;
    strawberry += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🐢";
    updatePurchaseButtonStateA();
  }
});

function updatePurchaseButtonStateA() {
  purchaseButtonA.disabled = counter < 10;
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  growthdisplay.innerHTML = "current growth rate: " + upgrade;
}

app.append(purchaseButtonA);

// button B ----------------------------------------------

const purchaseButtonB = document.createElement("button");
purchaseButtonB.innerHTML = "Buy an apple for 100 turtles 🍎";
purchaseButtonB.disabled = true;

purchaseButtonB.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    upgrade += 2;
    apple += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🐢";
    updatePurchaseButtonStateB();
  }
});

function updatePurchaseButtonStateB() {
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  purchaseButtonB.disabled = counter < 100;
  growthdisplay.innerHTML = "current growth rate: " + upgrade;
}

app.append(purchaseButtonB);

// button C ----------------------------------------------

const purchaseButtonC = document.createElement("button");
purchaseButtonC.innerHTML = "Buy a watermelon for 1000 turtles 🍉";
purchaseButtonC.disabled = true;

purchaseButtonC.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    upgrade += 50;
    watermelon += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🐢";
    updatePurchaseButtonStateC();
  }
});

function updatePurchaseButtonStateC() {
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  purchaseButtonC.disabled = counter < 1000;
  growthdisplay.innerHTML = "current growth rate: " + upgrade.toFixed(1);
}

app.append(purchaseButtonC);
