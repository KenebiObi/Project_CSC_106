// inject shared head content safely

const headContent = `
<link rel="stylesheet" href="css/fonts.css">
<link rel="stylesheet" href="css/style.css">
`;

document.addEventListener("DOMContentLoaded", () => {
  document.head.insertAdjacentHTML("beforeend", headContent);
});