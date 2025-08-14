// Function to copy specific text
function copyText(text, button) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      showFeedback(button);
    })
    .catch(function (err) {
      console.error("Failed to copy text: ", err);
    });
}

// Show "Copied!" feedback
function showFeedback(button) {
  const feedback = button.nextElementSibling;
  feedback.classList.add("show");
  setTimeout(() => {
    feedback.classList.remove("show");
  }, 2000);
}

// Footer - Set the current year
document.getElementById("year").textContent = new Date().getFullYear();
