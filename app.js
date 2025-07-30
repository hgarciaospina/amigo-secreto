let listaAmigos = [];

function agregarAmigo() {
  const input = document.getElementById("amigo");
  let nombreDelAmigo = input.value.trim();
  if (esNombreValido(nombreDelAmigo)) {
    nombreDelAmigo = capitalizarNombre(nombreDelAmigo);
    listaAmigos.push(nombreDelAmigo);
  } else {
    alert(
      "Nombre inválido. Usa solo letras (con tildes y ñ), mínimo 2 por palabra."
    );
  }
  input.value = "";
  input.focus();
  return;
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
