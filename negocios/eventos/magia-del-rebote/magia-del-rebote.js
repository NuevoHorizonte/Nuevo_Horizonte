// ==========================
//  CAMBIO DE IMÁGENES EN LA CABEZA + CAMBIO DE TEXTO SOLO EN CONTACTO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
    const img = item.querySelector("img");
    const span = item.querySelector("span");
    const originalSrc = img.getAttribute("src");
    const altSrc = img.getAttribute("data-alt");
    const originalText = span.textContent;

    item.addEventListener("mouseenter", () => {
    img.setAttribute("src", altSrc);
    item.classList.add("hovered");

    if (originalText.trim().toLowerCase() === "contacto") {
        span.textContent = "919283481";
    }
    });

    item.addEventListener("mouseleave", () => {
    img.setAttribute("src", originalSrc);
    item.classList.remove("hovered");


    if (originalText.trim().toLowerCase() === "contacto") {
        span.textContent = originalText;
    }
    });
});
});