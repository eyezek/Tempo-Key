/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
console.log("Background script loaded");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message received:", request);
  // Implement background-level message handling if needed
  sendResponse({
    status: "Message received"
  });
});
/******/ })()
;
//# sourceMappingURL=background.bundle.js.map