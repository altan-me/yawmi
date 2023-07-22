// console.log("JS LOADED");

// var target = document.getElementById("click");

// function copyTextToClipboard() {
//   const element = document.getElementById("click");
//   if (element && element.textContent.trim() !== "") {
//     const textToCopy = element.textContent;
//     navigator.clipboard
//       .writeText(textToCopy)
//       .then(() => {
//         console.log("Text copied to clipboard:", textToCopy);
//       })
//       .catch((err) => {
//         console.error("Error copying text to clipboard:", err);
//       });
//   } else {
//     console.error(
//       'Element with ID "click" does not exist or has no text content.'
//     );
//   }
// }

// target.onclick = function () {
//   copyTextToClipboard();
// };

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
