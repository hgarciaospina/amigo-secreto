let listaAmigos = [];

function agregarAmigo() {
  const input = document.getElementById("amigo");
  let nombreDelAmigo = input.value.trim();

  // Validación de duplicado
  if (existeNombre(nombreDelAmigo)) {
    let mostrarMensajeError = `El nombre "${capitalizarNombre(
      nombreDelAmigo
    )}" ya fue ingresado.`;

    alert(mostrarMensajeError);
    limpiarInput(input);
  }

  if (esNombreValido(nombreDelAmigo)) {
    nombreDelAmigo = capitalizarNombre(nombreDelAmigo);
    listaAmigos.push(nombreDelAmigo);
  } else {
    alert(
      "Nombre inválido. Usa solo letras (con tildes y ñ), mínimo 2 por palabra."
    );
  }
  limpiarInput(input);
}

function existeNombre(nombre) {
  return listaAmigos.some(
    (amigo) => amigo.toLowerCase() === nombre.toLowerCase()
  );
}

function esNombreValido(nombre) {
  const regex = /^([A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})( [A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$/;
  return regex.test(nombre.trim());
}

function capitalizarNombre(texto) {
  return texto
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((p) => p.length > 0)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

function limpiarInput(entrada) {
  entrada.value = "";
  entrada.focus();
  return;
}
