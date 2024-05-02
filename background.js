console.log("Background script loaded");

let audioContext;
let source;
let stream;
let analyser;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received with command: ", request.command); // Confirm command received

  if (request.command === "start_capture") {
    if (!audioContext) {
      audioContext = new AudioContext();
      console.log("AudioContext initialized.");
    }

    if (!stream) {
      // Ensure we don't capture more than one stream
      console.log("Starting tab capture...");
      chrome.tabCapture.capture(
        { audio: true, video: false },
        (capturedStream) => {
          if (capturedStream) {
            console.log("Audio stream captured");
            stream = capturedStream;
            source = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            source.connect(analyser);
            // Further processing setup can be logged here
            sendResponse({ status: "Audio capture started" });
          } else {
            console.error("Failed to capture audio");
            sendResponse({ status: "Audio capture failed" });
          }
        }
      );
      return true; // Indicates to Chrome that the response is asynchronous
    } else {
      console.log("Capture already in progress.");
      sendResponse({ status: "Capture already in progress" });
    }
  } else if (request.command === "stop_capture") {
    console.log("Stopping audio capture...");
    if (stream && source) {
      stream.getTracks().forEach((track) => track.stop());
      source.disconnect();
      analyser.disconnect();
      stream = null;
      source = null;
      analyser = null;
      sendResponse({ status: "Audio capture stopped" });
    } else {
      console.log("No active capture to stop.");
      sendResponse({ status: "No active capture to stop" });
    }
    return true;
  }
});
