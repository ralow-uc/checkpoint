document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = localStorage.getItem("usuarioActual");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const form = document.getElementById("editarPerfilForm");

  if (!usuarioActual) {
    alert("Debes iniciar sesión para editar tu perfil.");
    window.location.href = "login.html";
    return;
  }

  const usuario = usuarios.find(u => u.nombreUsuario === usuarioActual);
  if (!usuario) {
    alert("Usuario no encontrado.");
    return;
  }

  document.getElementById("nombreCompleto").value = usuario.nombreCompleto;
  document.getElementById("nombreUsuario").value = usuario.nombreUsuario;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevoNombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const nuevoNombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const nuevaClave = document.getElementById("clave").value;
    const confirmarClave = document.getElementById("confirmarClave").value;

    if (nuevaClave) {
      let tieneNumero = /\d/.test(nuevaClave);
      let tieneMayuscula = /[A-Z]/.test(nuevaClave);

      if (nuevaClave.length < 6 || nuevaClave.length > 18 || !tieneNumero || !tieneMayuscula) {
        alert("La contraseña debe tener entre 6 y 18 caracteres, incluir una mayúscula y un número.");
        return;
      }

      if (nuevaClave !== confirmarClave) {
        alert("Las contraseñas no coinciden.");
        return;
      }
    }

    const nombreExistente = usuarios.find(u => u.nombreUsuario === nuevoNombreUsuario && u.nombreUsuario !== usuarioActual);
    if (nombreExistente) {
      alert("El nombre de usuario ya está en uso.");
      return;
    }

    usuario.nombreCompleto = nuevoNombreCompleto;
    usuario.nombreUsuario = nuevoNombreUsuario;
    if (nuevaClave) {
      usuario.clave = nuevaClave;
    }

    const index = usuarios.findIndex(u => u.nombreUsuario === usuarioActual);
    usuarios[index] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActual", nuevoNombreUsuario);

    alert("Datos actualizados correctamente.");
    window.location.href = "index.html";
  });
});