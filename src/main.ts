import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super duper awesome insane game :D";
document.title = gameName;

let counter: number = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click me! 🐢";
button.addEventListener("click", () => {
  counter += 1;
  scoreDisplay.innerHTML = counter.toString() + " 🐢";
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
  counter += elapsed;
  scoreDisplay.innerHTML = counter.toFixed(0) + " 🐢";

  last = timestamp;

  requestAnimationFrame(step);
}

requestAnimationFrame(step);
