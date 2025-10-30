document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // 🔹 cerrar menú al hacer clic en un link
  const navLinks = mainNav.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
});
