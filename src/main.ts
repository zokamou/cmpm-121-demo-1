import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super duper awesome insane game :D";
document.title = gameName;

let counter: number = 0;
let upgrade: number = 1;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click me! 🐢";
button.addEventListener("click", () => {
  counter += 1;
  scoreDisplay.innerHTML = counter.toString() + " 🐢";
  updatePurchaseButtonState();
});
app.append(button);

const scoreDisplay = document.createElement("div");
scoreDisplay.innerHTML = counter.toString() + " 🐢";
app.append(scoreDisplay);

let last: number | undefined;

function step(timestamp: number) {
  if (last === undefined) {
    last = timestamp;
  }

  const elapsed = (timestamp - last) / 1000;
  counter += upgrade * elapsed;
  scoreDisplay.innerHTML = counter.toFixed(0) + " 🐢";
  updatePurchaseButtonState();
  last = timestamp;

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

const purchaseButton = document.createElement("button");
purchaseButton.innerHTML = "Upgrade clicker for 10 turtles";
purchaseButton.disabled = true;

purchaseButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    upgrade += 1;
    scoreDisplay.innerHTML = counter.toFixed(2) + " 🐢";
    updatePurchaseButtonState();
  }
});

function updatePurchaseButtonState() {
  purchaseButton.disabled = counter < 10;
}

app.append(purchaseButton);
