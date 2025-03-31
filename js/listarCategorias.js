document.addEventListener("DOMContentLoaded", function () {
  const categoriasBtn = document.getElementById("categorias-btn");
  const categoriasLista = document.getElementById("categorias-lista");

  if (categoriasBtn && categoriasLista) {
    categoriasBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Evita que el enlace recargue la página
      categoriasLista.style.display =
        categoriasLista.style.display === "block" ? "none" : "block";
    });

    // Cerrar el dropdown si se hace clic fuera de él
    document.addEventListener("click", function (event) {
      if (
        !categoriasBtn.contains(event.target) &&
        !categoriasLista.contains(event.target)
      ) {
        categoriasLista.style.display = "none";
      }
    });
  }
});