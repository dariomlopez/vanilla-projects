document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const mensaje = document.getElementById("mensaje");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    let formulario_valido = true;

    //Validación del campo nombre
    const nombreRegex = /^[a-zA-Z]{4,}$/;
    if (!nombreRegex.test(nombre.value.trim())){
      mostrarError("error-nombre", "El nombre debe contener solo letras sin tilde y ser mayor de 4 caracteres");
      formulario_valido = false;
    } else {
      ocultarError("error-nombre");
    }

    //Validación del campo email
    const emailRegex = /^[^\s@]{4,}@+[^\s@]{3,}\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.value.trim())){
      mostrarError("error-email", "El formato de email no es correcto. Ejemplo: abc12@abc.co");
      formulario_valido = false;
    } else {
      ocultarError("error-email")
    }

    //Validación campo teléfono
    const telefonoRegex = /^[0-9]{8,15}$/
    if (!telefonoRegex.test(telefono.value.trim())){
      mostrarError("error-telefono", "El campo teléfono no es correcto. Ejemplo: 987654321");
      formulario_valido = false;
    } else {
      ocultarError("error-telefono")
    }

    //Validación campo mensaje
    if (mensaje.value.trim === ""){
      mostrarError("error-mensaje", "El mensaje es obligatorio");
      formulario_valido = false;
    } else {
      ocultarError("error-mensaje")
    }

    // Prevenir que el formulario se pueda enviar si hay algún error en los campos
    if(!formulario_valido) {
      event.preventDefault();
    }
  });

  function mostrarError(id, mensaje) {
    const errorDiv = document.getElementById(id);
    errorDiv.innerText = mensaje;
    errorDiv.style.display = "block";
  }

  function ocultarError(id) {
    const errorDiv = document.getElementById(id);
    errorDiv.innerText = "";
    errorDiv.style.display = "none";
  }
})