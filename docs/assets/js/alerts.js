// assets/js/alerts.js
document.addEventListener("DOMContentLoaded", () => {
  // すべての引用ブロックを取得
  const blockquotes = document.querySelectorAll("blockquote");

  blockquotes.forEach(quote => {
    // 引用内の最初の段落のテキストを取得
    const p = quote.querySelector("p");
    if (!p) return;

    const text = p.innerHTML.trim();

    // [!WARNING]のパターンをチェック
    const match = text.match(/^\\[!(WARNING)\\]/);

    if (match) {
      const type = match[1]; // "WARNING"

      // 対応するCSSクラスとタイトルを決定
      let newClass = "";
      let newTitle = "";
      let titleIcon = "";

      switch (type) {
        case "WARNING":
          newClass = "warning";
          titleIcon = "⚠️";
          newTitle = "Warning";
          break;
      }

      if (newClass) {
        // [!WARNING] というテキストを削除
        const content = text
          .substring(match[0].length)
          .trim()
          .replace(/<br\s*\/?>/g, " ");

        // 新しい警告ボックスのHTMLを生成
        const newAlert = document.createElement("div");
        newAlert.className = newClass;
        newAlert.innerHTML = `
          <p class="${newClass}-title">${titleIcon} ${newTitle}</p>
          <p>${content}</p>
        `;

        // 元の引用ブロックを新しい警告ボックスに置き換える
        quote.parentNode.replaceChild(newAlert, quote);
      }
    }
  });
});
