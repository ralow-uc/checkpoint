document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let valid = true;

    const nombreCompleto = document
      .getElementById("nombreCompleto")
      .value.trim();
    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;
    const confirmarClave = document.getElementById("confirmarClave").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const direccion = document.getElementById("direccion").value.trim();

    const mostrarError = (input, mensaje) => {
      input.classList.add("is-invalid");
      input.nextElementSibling.textContent = mensaje;
      valid = false;
    };

    const limpiarError = (input) => {
      input.classList.remove("is-invalid");
    };

    // Validaciones nombre y usuario
    !nombreCompleto
      ? mostrarError(
          document.getElementById("nombreCompleto"),
          "El nombre completo es obligatorio."
        )
      : limpiarError(document.getElementById("nombreCompleto"));
    !nombreUsuario
      ? mostrarError(
          document.getElementById("nombreUsuario"),
          "El nombre de usuario es obligatorio."
        )
      : limpiarError(document.getElementById("nombreUsuario"));

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailRegex.test(correo)
      ? limpiarError(document.getElementById("correo"))
      : mostrarError(
          document.getElementById("correo"),
          "Ingrese un correo válido."
        );

    // Validación de la contraseña
    let tieneNumero = false;
    let tieneMayuscula = false;

    for (let i = 0; i < clave.length; i++) {
      let char = clave[i];
      if (!isNaN(char * 1)) tieneNumero = true;
      if (char === char.toUpperCase() && isNaN(char)) tieneMayuscula = true;
    }

    if (
      clave.length < 6 ||
      clave.length > 18 ||
      !tieneNumero ||
      !tieneMayuscula
    ) {
      mostrarError(
        document.getElementById("clave"),
        "Debe tener entre 6 y 18 caracteres, incluir una mayúscula y un número."
      );
    } else {
      limpiarError(document.getElementById("clave"));
    }

    // Validación de coincidencia de contraseñas
    clave === confirmarClave
      ? limpiarError(document.getElementById("confirmarClave"))
      : mostrarError(
          document.getElementById("confirmarClave"),
          "Las contraseñas deben coincidir."
        );

    // Validación de edad mínima (13 años)
    if (fechaNacimiento) {
      let fechaNacimientoObj = new Date(fechaNacimiento);
      let hoy = new Date();
      let edad = hoy.getFullYear() - fechaNacimientoObj.getFullYear();
      let mesDiferencia = hoy.getMonth() - fechaNacimientoObj.getMonth();
      let diaDiferencia = hoy.getDate() - fechaNacimientoObj.getDate();

      if (
        edad < 13 ||
        (edad === 13 && mesDiferencia < 0) ||
        (edad === 13 && mesDiferencia === 0 && diaDiferencia < 0)
      ) {
        mostrarError(
          document.getElementById("fechaNacimiento"),
          "Debes tener al menos 13 años para registrarte."
        );
      } else {
        limpiarError(document.getElementById("fechaNacimiento"));
      }
    } else {
      mostrarError(
        document.getElementById("fechaNacimiento"),
        "La fecha de nacimiento es obligatoria."
      );
    }

    if (valid) {
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      let usuarioExistente = usuarios.find(
        (u) => u.nombreUsuario === nombreUsuario
      );

      if (usuarioExistente) {
        alert("El nombre de usuario ya existe. Por favor, elige otro.");
      } else {
        let nuevoUsuario = {
          nombreCompleto: nombreCompleto,
          nombreUsuario: nombreUsuario,
          correo: correo,
          clave: clave,
          fechaNacimiento: fechaNacimiento,
          direccion: direccion,
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("¡Te has registrado exitosamente!");
        form.reset();
        window.location.href = "login.html";
      }
    }
  });
});
