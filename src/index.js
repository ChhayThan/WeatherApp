import "./style.css";
import ui from "./ui";

async function initializePage() {
  try {
    ui.init();
  } catch (error) {
    console.log(error);
  }
}

initializePage();
