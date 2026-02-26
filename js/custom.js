
// Custom JavaScript for loading header and footer
async function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`${file} not found`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
    el.innerHTML = "<!-- include failed -->";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "inc/header.html");
  loadHTML("footer", "inc/footer.html");
});
