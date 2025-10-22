import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  flowchart: { curve: "basis" },
  themeVariables: {
    primaryColor: "#3498db",
    primaryTextColor: "#2c3e50",
    lineColor: "#34495e",
    background: "#f8f9fa"
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Boutons copier
  document.querySelectorAll("pre code").forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrapper";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "copy-button";
    button.textContent = "Copier";
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(codeBlock.textContent);
      button.textContent = "Copié !";
      setTimeout(() => (button.textContent = "Copier"), 1500);
    });
    wrapper.appendChild(button);
  });

  // TOC
  const headers = document.querySelectorAll("#content h1, #content h2, #content h3");
  const tocContent = document.getElementById("toc-content");
  if (headers.length && tocContent) {
    const ul = document.createElement("ul");
    headers.forEach((header, i) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      if (!header.id) header.id = "heading-" + i;
      a.href = "#" + header.id;
      a.textContent = header.textContent;
      li.style.marginLeft = (parseInt(header.tagName[1]) - 1) * 20 + "px";
      li.appendChild(a);
      ul.appendChild(li);
    });
    tocContent.appendChild(ul);
  }

  // Mermaid
  renderMermaid();
});

async function renderMermaid() {
  const elements = document.querySelectorAll(".mermaid");
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    try {
      const { svg } = await mermaid.render("diagram-" + i, el.textContent);
      el.innerHTML = svg;
    } catch (err) {
      el.innerHTML = `<div style="color:#e74c3c;">Erreur Mermaid</div><pre><code>${el.textContent}</code></pre>`;
    }
  }
}

window.toggleTOC = () => {
  const toc = document.getElementById("toc");
  if (toc) toc.style.display = toc.style.display === "none" ? "block" : "none";
};

