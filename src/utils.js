export function changeTempUnit() {
  const tempSpans = document.querySelectorAll("span.temp");
  tempSpans.forEach((tempSpan) => {
    if (tempSpan.classList.contains("celsius")) {
      const tempC = parseFloat(tempSpan.innerText);
      const tempF = (tempC * 9) / 5 + 32;
      tempSpan.innerHTML = `${tempF.toFixed(1)}&deg;F`;
      tempSpan.classList.remove("celsius");
      tempSpan.classList.add("fahrenheit");
    } else if (tempSpan.classList.contains("fahrenheit")) {
      const tempF = parseFloat(tempSpan.innerText);
      const tempC = ((tempF - 32) * 5) / 9;
      tempSpan.innerHTML = `${tempC.toFixed(1)}&deg;C`;
      tempSpan.classList.remove("fahrenheit");
      tempSpan.classList.add("celsius");
    }
  });
}
