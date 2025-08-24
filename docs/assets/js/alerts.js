document.addEventListener("DOMContentLoaded", () => {
  const blockquotes = document.querySelectorAll("blockquote");

  blockquotes.forEach(quote => {
    const p = quote.querySelector("p");
    if (!p) return;

    const text = p.innerHTML.trim().replace(/<br\s*\/?>/g, " ");

    const match = text.match(/^\[!WARNING\]/);

    if (match) {
      const newClass = "warning";
      const newTitle = "Warning";
      const titleIcon = "⚠️";

      const contentText = text.substring(match[0].length).trim();

      const newAlert = document.createElement("div");
      newAlert.className = newClass;

      const titleElement = document.createElement("p");
      titleElement.className = `${newClass}-title`;
      titleElement.textContent = `${titleIcon} ${newTitle}`;

      const contentElement = document.createElement("p");
      contentElement.innerHTML = contentText;

      newAlert.appendChild(titleElement);
      newAlert.appendChild(contentElement);

      quote.parentNode.replaceChild(newAlert, quote);
    }
  });
});
