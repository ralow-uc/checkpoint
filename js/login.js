document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    const loginLink = document.getElementById("login-link");

    // Revisar si hay un usuario logueado y actualizar el header
    let usuarioActual = localStorage.getItem("usuarioActual");
    if (usuarioActual) {
        loginLink.textContent = usuarioActual;
        loginLink.href = "ver_perfil.html";
        logoutBtn.style.display = "inline-block";
    }

    // Manejar el inicio de sesión
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let nombreUsuario = document.getElementById("username").value.trim();
            let clave = document.getElementById("password").value;

            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            let usuarioEncontrado = usuarios.find(u => u.nombreUsuario === nombreUsuario && u.clave === clave);

            if (usuarioEncontrado) {
                localStorage.setItem("usuarioActual", usuarioEncontrado.nombreUsuario);
                window.location.href = "index.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });
    }

    // Manejar el cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("usuarioActual");
            window.location.href = "index.html";
        });
    }
});
