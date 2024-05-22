import { errorHandler } from "./error";

const weatherAPI = (function () {
  async function searchCity(input) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=dd52c3dfc99546429a7162039242804&days=3&q=${input}`,
        { mode: "cors" }
      );
      const data = await response.json();
      if (data.error) {
        errorHandler.handleError(data.error.code);
        throw new Error(data.error.message);
      } else {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { searchCity };
})();

export default weatherAPI;
