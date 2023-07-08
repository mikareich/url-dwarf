const shortenBtn = document.getElementById("shorten");
const copyBtn = document.getElementById("copy");
const url = document.getElementById("url");
const description = document.getElementById("description");

function success(id) {
  copyBtn.classList.remove("hidden");
  shortenBtn.classList.add("hidden");
  description.classList.remove("hidden");
  url.value = `${window.location.href}${id}`;
  url.disabled = true;
}

shortenBtn.addEventListener("click", () => {
  const data = {
    url: url.value,
  };

  fetch("/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create short URL");
      }
    })
    .then((data) => {
      success(data.id);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(url.value);
  const range = document.createRange();
  range.selectNode(url);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
});
