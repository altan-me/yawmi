console.log("JS LOADED");

var target = document.getElementById("click");
console.log(target);

function selection(elem) {
  var elem = document.getElementById(elem);
  var select = window.getSelection();
  var range = document.createRange();

  range.selectNodeContents(elem);
  select.addRange(range);
}

target.onclick = function () {
  selection("click");
};
