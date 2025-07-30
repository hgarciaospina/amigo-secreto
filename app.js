let listaAmigos = [];

function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombreDelAmigo = input.value.trim();
  console.log(nombreDelAmigo);
  if (esNombreValido(nombreDelAmigo)) {
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
