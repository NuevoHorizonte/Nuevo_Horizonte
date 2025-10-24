document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    const img = item.querySelector("img");
    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");

    item.addEventListener("mouseenter", () => {
      img.setAttribute("src", altSrc);
      item.classList.add("hovered"); // activa clase para animar texto
    });

    item.addEventListener("mouseleave", () => {
      img.setAttribute("src", originalSrc);
      item.classList.remove("hovered");
    });
  });
});