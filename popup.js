document.getElementById("start").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "start_capture" }, (response) => {
    document.getElementById("results").textContent =
      "Analysis started: " + response.status;
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "stop_capture" }, (response) => {
    document.getElementById("results").textContent =
      "Analysis stopped: " + response.status;
  });
});
