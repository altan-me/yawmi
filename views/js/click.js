console.log("JS LOADED");

document.addEventListener("click", function (event) {
  const target = event.target;
  if (target.id === "click") {
    copyTextToClipboard(target.textContent);
  }
});

function copyTextToClipboard(text) {
  if (text && text.trim() !== "") {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Error copying text to clipboard:", err);
      });
  } else {
    console.error(
      "Element with ID 'click' does not exist or has no text content."
    );
  }
}
