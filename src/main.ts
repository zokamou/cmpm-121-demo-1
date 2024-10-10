import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Super duper awesome insane game :D";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click me! &#128516;";
app.append(button);
