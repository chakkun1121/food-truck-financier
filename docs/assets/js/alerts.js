document.addEventListener("DOMContentLoaded", () => {
  const blockquotes = document.querySelectorAll("blockquote");

  blockquotes.forEach(quote => {
    const p = quote.querySelector("p");
    if (!p) return;

    const text = p.innerHTML.trim();

    const match = text.match(/^\[!WARNING\]/);

    if (match) {
      const newClass = "warning";
      const newTitle = "Warning";
      const titleIcon = "⚠️";

      if (newClass) {
        const content = text.substring(match[0].length).trim();

        const newAlert = document.createElement("div");
        newAlert.className = newClass;
        newAlert.innerHTML = `
          <p class="${newClass}-title">${titleIcon} ${newTitle}</p>
          <p>${content}</p>
        `;

        quote.parentNode.replaceChild(newAlert, quote);
      }
    }
  });
});
