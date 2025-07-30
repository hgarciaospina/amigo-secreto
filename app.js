let listaAmigos = [];

function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombreDelAmigo = input.value.trim();
  listaAmigos.push(nombreDelAmigo);
  input.value = "";
  input.focus();
  console.log(nombreDelAmigo);
}
