export { errorHandler };
import ui from "./ui.js";

const errorHandler = (function () {
  function handleError(code) {
    switch (code) {
      case 1003:
        ui.renderErrorMessage("Please enter a location name.");
        break;
      case 1006:
        ui.renderErrorMessage("Location not found.");
        break;
    }
  }

  return {
    handleError,
  };
})();
