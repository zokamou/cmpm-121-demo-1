import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Feed Terry the Turtle! 🐢";
document.title = gameName;

let counter: number = 0;
let growthRate = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  count: number;
}

const availableItems: Item[] = [
  {
    name: "Super Strawberry 🍓",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "A delicious fruit that grows in your garden.",
  },
  {
    name: "Amazing Apple 🍎",
    cost: 100,
    rate: 2,
    count: 0,
    description: "A shiny apple a day keeps the turtles happy.",
  },
  {
    name: "Wonderful Watermelon 🍉",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "A giant treat for all your turtle friends.",
  },
  {
    name: "Crazy Carrot 🥕",
    cost: 5000,
    rate: 100,
    description: "A crunchy snack that boosts turtle productivity.",
    count: 0,
  },
  {
    name: "Fruit Basket 🍇",
    cost: 20000,
    rate: 300,
    description: "A big fruit basket for Terry and all his friends!",
    count: 0,
  },
];

const buttonbox = document.createElement("div");
app.append(buttonbox);
buttonbox.classList.add("button-box");

const mainbox = document.createElement("div");
app.append(mainbox);
mainbox.classList.add("main-box");

// function definitions ------------------------------------------------
function updatePurchaseButtonStates() {
  const buttons = document.querySelectorAll(
    ".purchase-button",
  ) as NodeListOf<HTMLButtonElement>;
  buttons.forEach((button, index) => {
    const item = availableItems[index];
    button.innerHTML = `Build a ${item.name} for ${item.cost.toFixed(2)} pieces of lettuce`;
    button.disabled = counter < item.cost;
  });
}

function updateItemCountDisplay() {
  itemCountDisplays.forEach((display, index) => {
    const item = availableItems[index];
    display.innerHTML = `${item.name}: ${item.count} - ${item.description}`;
  });
}

function updateScoreDisplay() {
  scoreDisplay.innerHTML = counter.toFixed(0).toString() + " 🥬";
}

function purchaseItem(item: Item): void {
  counter -= item.cost;
  growthRate += item.rate;
  item.count++;
  item.cost *= 1.15;
}

function updateDisplayAfterPurchase() {
  updateItemCountDisplay();
  updateScoreDisplay();
  growthdisplay.innerHTML =
    "Current growth rate: " + (1 + growthRate).toFixed(2);
}

// Display elements ----------------------------------------------
const header = document.createElement("h1");
header.innerHTML = gameName;
mainbox.append(header);

const button = document.createElement("button");
button.classList.add("main-button");
button.innerHTML = "🥬";
button.addEventListener("click", () => {
  counter += 1;
  updateScoreDisplay();
});
mainbox.append(button);

const itemCountDisplays: HTMLHeadingElement[] = [];

const growthdisplay = document.createElement("h2");
growthdisplay.innerHTML = "Current growth rate: 1";
mainbox.append(growthdisplay);

const scoreDisplay = document.createElement("div");
updateScoreDisplay();
mainbox.append(scoreDisplay);
scoreDisplay.classList.add("score-display");

for (const item of availableItems) {
  const countDisplay = document.createElement("p");
  countDisplay.classList.add("count");
  countDisplay.innerHTML = `${item.name}: ${item.count} - ${item.description}`;
  itemCountDisplays.push(countDisplay);
  mainbox.append(countDisplay);
}

// increment lettuce timer ----------------------------------------------
let last: number | undefined;

function step(timestamp: number) {
  if (last === undefined) {
    last = timestamp;
  }
  const elapsed = (timestamp - last) / 1000;
  counter += (1 + growthRate) * elapsed;
  updateScoreDisplay();
  updatePurchaseButtonStates();
  last = timestamp;
  requestAnimationFrame(step);
}

// purchase buttons ----------------------------------------------
for (const item of availableItems) {
  const purchaseButton = document.createElement("button");
  purchaseButton.innerHTML = `Build a ${item.name} for ${item.cost.toFixed(2)} pieces of lettuce`;
  purchaseButton.disabled = true;
  purchaseButton.classList.add("purchase-button");

  purchaseButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      purchaseItem(item);
      updateDisplayAfterPurchase();
      updateItemCountDisplay();
      updateScoreDisplay();
      growthdisplay.innerHTML =
        "Current growth rate: " + (1 + growthRate).toFixed(2);
    }
  });

  buttonbox.append(purchaseButton);
}

// start the game
requestAnimationFrame(step);
