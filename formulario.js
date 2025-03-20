document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let valid = true;

        const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
        const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const clave = document.getElementById("clave").value;
        const confirmarClave = document.getElementById("confirmarClave").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;

        const mostrarError = (input, mensaje) => {
            input.classList.add("is-invalid");
            input.nextElementSibling.textContent = mensaje;
            valid = false;
        };

        const limpiarError = (input) => {
            input.classList.remove("is-invalid");
            input.nextElementSibling.textContent = "";
        };

        limpiarError(document.getElementById("nombreUsuario"));
        limpiarError(document.getElementById("correo"));
        limpiarError(document.getElementById("clave"));
        limpiarError(document.getElementById("confirmarClave"));

        if (nombreUsuario.length < 3) {
            mostrarError(document.getElementById("nombreUsuario"), "El nombre de usuario debe tener al menos 3 caracteres.");
        }
        
        if (!correo.includes("@")) {
            mostrarError(document.getElementById("correo"), "Ingrese un correo electrónico válido.");
        }

        if (clave.length < 6) {
            mostrarError(document.getElementById("clave"), "La contraseña debe tener al menos 6 caracteres.");
        }

        if (clave !== confirmarClave) {
            mostrarError(document.getElementById("confirmarClave"), "Las contraseñas no coinciden.");
        }

        if (valid) {
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            if (usuarios.some(u => u.nombreUsuario === nombreUsuario)) {
                mostrarError(document.getElementById("nombreUsuario"), "El nombre de usuario ya está en uso.");
                return;
            }
            
            const nuevoUsuario = { nombreCompleto, nombreUsuario, correo, clave, fechaNacimiento };
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        }
    });
});
