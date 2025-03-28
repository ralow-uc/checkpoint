document.addEventListener("DOMContentLoaded", () => { 

    const categoriasBtn = document.getElementById("categorias-btn");
    const categoriasLista = document.getElementById("categorias-lista");

    categoriasBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        
        // Alternar visibilidad de la lista
        if (categoriasLista.style.display === "none") {
          categoriasLista.style.display = "block";
        } else {
          categoriasLista.style.display = "none";
        }
      });
  
      // Cerrar la lista si se hace clic fuera de ella
      document.addEventListener("click", function (event) {
        if (!categoriasBtn.contains(event.target) && !categoriasLista.contains(event.target)) {
          categoriasLista.style.display = "none";
        }
      });


})