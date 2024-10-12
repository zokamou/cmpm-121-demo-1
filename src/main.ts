import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Feed Terry the Turtle! 🐢";
document.title = gameName;

let counter: number = 0;
let upgrade: number = 1;
let apple: number = 0;
let watermelon: number = 0;
let strawberry: number = 0;
let strawberryprice = 10;
let appleprice = 100;
let watermelonprice = 1000;

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
button.innerHTML = "Click me for 1 piece of lettuce!";
button.addEventListener("click", () => {
  counter += 1;
  scoreDisplay.innerHTML = counter.toString() + " 🥬";
  updatePurchaseButtonStateA();
  updatePurchaseButtonStateB();
  updatePurchaseButtonStateC();
});
app.append(button);

const scoreDisplay = document.createElement("div");
scoreDisplay.innerHTML = counter.toString() + " 🥬";
app.append(scoreDisplay);

// timer by frame ----------------------------------------------

let last: number | undefined;
function step(timestamp: number) {
  if (last === undefined) {
    last = timestamp;
  }

  const elapsed = (timestamp - last) / 1000;
  counter += upgrade * elapsed;
  scoreDisplay.innerHTML = counter.toFixed(0) + " 🥬";
  updatePurchaseButtonStateA();
  updatePurchaseButtonStateB();
  updatePurchaseButtonStateC();
  last = timestamp;

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

// button A ----------------------------------------------

const purchaseButtonA = document.createElement("button");
purchaseButtonA.innerHTML =
  "Build a strawberry patch for " + strawberryprice.toFixed(2) + " pieces of lettuce 🍓";
purchaseButtonA.disabled = true;

purchaseButtonA.addEventListener("click", () => {
  if (counter >= strawberryprice) {
    counter -= strawberryprice;
    upgrade += 0.1;
    strawberry += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🥬";
    updatePurchaseButtonStateA();
    strawberryprice = strawberryprice * 1.15;
  }
});

function updatePurchaseButtonStateA() {
  purchaseButtonA.disabled = counter < strawberryprice;
  purchaseButtonA.innerHTML =
  "Build a strawberry patch for " + strawberryprice.toFixed(2) + " pieces of lettuce 🍓";
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  growthdisplay.innerHTML = "current growth rate: " + upgrade;
}

app.append(purchaseButtonA);

// button B ----------------------------------------------

const purchaseButtonB = document.createElement("button");
purchaseButtonB.innerHTML =
  "Buy an apple orchard for " + appleprice.toFixed(2) + " pieces of lettuce 🍎";
purchaseButtonB.disabled = true;

purchaseButtonB.addEventListener("click", () => {
  if (counter >= appleprice) {
    counter -= appleprice;
    upgrade += 2;
    apple += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🥬";
    updatePurchaseButtonStateB();
    appleprice = appleprice * 1.15;
  }
});

function updatePurchaseButtonStateB() {
  purchaseButtonB.innerHTML =
  "Buy an apple orchard for " + appleprice.toFixed(2) + " pieces of lettuce 🍎";
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  purchaseButtonB.disabled = counter < appleprice;
  growthdisplay.innerHTML = "current growth rate: " + upgrade;
}

app.append(purchaseButtonB);

// button C ----------------------------------------------

const purchaseButtonC = document.createElement("button");
purchaseButtonC.innerHTML =
  "Buy a super watermelon for " + watermelonprice.toFixed(2) + " pieces of lettuce 🍉";
purchaseButtonC.disabled = true;

purchaseButtonC.addEventListener("click", () => {
  if (counter >= watermelonprice) {
    counter -= watermelonprice;
    upgrade += 50;
    watermelon += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🥬";
    watermelonprice = watermelonprice * 1.15;
    updatePurchaseButtonStateC();
  }
});

function updatePurchaseButtonStateC() {
  itemcount.innerHTML =
    "🍓: " + strawberry + " 🍎: " + apple + " 🍉: " + watermelon;
  purchaseButtonC.disabled = counter < watermelonprice;
  purchaseButtonC.innerHTML =
  "Buy a super watermelon for " + watermelonprice.toFixed(2) + " pieces of lettuce 🍉";
  growthdisplay.innerHTML = "current growth rate: " + upgrade.toFixed(1);
}

app.append(purchaseButtonC);
