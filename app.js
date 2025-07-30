let listaAmigos = [];
let listaAmigosSorteados = [];
let lista = "";
let juegoIniciado = false; // ✅ NUEVO: control del estado del juego

// Al cargar la página, desactiva el botón de sorteo e inicializa contador
document.addEventListener("DOMContentLoaded", () => {
  actualizarBotonSortear();
  actualizarContador(); // Mostrar 0 al iniciar
});

/**
 * Agrega un nuevo nombre a la lista si es válido y no está repetido.
 */
function agregarAmigo() {
  if (juegoIniciado) {
    alert(
      "El juego ya ha comenzado. Debes iniciar un nuevo juego para agregar amigos."
    );
    return;
  }

  const input = document.getElementById("amigo");
  let nombreDelAmigo = input.value.trim();

  if (existeNombre(nombreDelAmigo)) {
    let mostrarMensajeError = `El nombre "${capitalizarNombre(
      nombreDelAmigo
    )}" ya fue ingresado.`;

    alert(mostrarMensajeError);
    limpiarInput(input);
    return;
  }

  if (esNombreValido(nombreDelAmigo)) {
    nombreDelAmigo = capitalizarNombre(nombreDelAmigo);
    listaAmigos.push(nombreDelAmigo);
  } else {
    alert(
      "Nombre inválido. Usa solo letras (con tildes y ñ), mínimo 2 por palabra."
    );
    limpiarInput(input);
    return;
  }

  limpiarInput(input);
  renderizarLista();
  actualizarBotonSortear(); // actualiza botón
  actualizarContador(); // actualiza cuántos faltan
}

/**
 * Verifica si un nombre ya existe en la lista, sin importar mayúsculas/minúsculas.
 */
function existeNombre(nombre) {
  return listaAmigos.some(
    (amigo) => amigo.toLowerCase() === nombre.toLowerCase()
  );
}

/**
 * Verifica si el nombre ingresado cumple con el formato correcto.
 */
function esNombreValido(nombre) {
  const regex = /^([A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})( [A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})*$/;
  return regex.test(nombre.trim());
}

/**
 * Capitaliza correctamente el nombre: "jUAN pérez" -> "Juan Pérez"
 */
function capitalizarNombre(texto) {
  return texto
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((p) => p.length > 0)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

/**
 * Limpia el input de texto y devuelve el foco a él.
 */
function limpiarInput(entrada) {
  entrada.value = "";
  entrada.focus();
  return;
}

/**
 * Muestra en pantalla la lista actual de amigos agregados.
 */
function renderizarLista() {
  lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  listaAmigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    lista.appendChild(li);
  });
}

/**
 * Sortea un amigo aleatoriamente entre los no sorteados aún.
 */
function sortearAmigo() {
  const resultado = document.getElementById("resultado");

  // Validación: lista vacía
  if (listaAmigos.length === 0) {
    alert("No hay nombres en la lista para hacer el sorteo.");
    return;
  }

  // Marcar inicio del juego
  juegoIniciado = true;

  // Validación: ya se sortearon todos
  if (listaAmigosSorteados.length === listaAmigos.length) {
    alert("Ya se sortearon todos los amigos.");
    reiniciarListas(); // reinicia por completo
    alert("Comienza un nuevo sorteo. Ingresa los nombres de nuevo.");
    actualizarBotonSortear(); // desactiva botón
    actualizarContador(); // actualiza contador
    return;
  }

  // Al hacer el primer sorteo, borra la lista visual
  if (listaAmigosSorteados.length === 0) {
    document.getElementById("listaAmigos").innerHTML = "";
  }

  // Filtra amigos disponibles
  const amigosDisponibles = listaAmigos.filter(
    (amigo) =>
      !listaAmigosSorteados.some(
        (sorteado) => sorteado.toLowerCase() === amigo.toLowerCase()
      )
  );

  const posicion = Math.floor(Math.random() * amigosDisponibles.length);
  const amigoSecreto = amigosDisponibles[posicion];

  listaAmigosSorteados.push(amigoSecreto);

  resultado.innerHTML = `El amigo secreto sorteado es: ${amigoSecreto}`;

  actualizarContador(); // actualiza cuántos faltan
  actualizarBotonSortear(); // actualiza botón

  // ✅ NUEVO: Al finalizar el último sorteo, mostrar mensaje y reiniciar
  if (listaAmigosSorteados.length === listaAmigos.length) {
    setTimeout(() => {
      alert("🎉 ¡Fin del juego! Todos los amigos han sido sorteados.");
      reiniciarListas();
      actualizarBotonSortear();
      actualizarContador();
    }, 200); // pequeño delay para que se vea el último nombre sorteado
  }
}

/**
 * Reinicia por completo las listas y limpia el DOM.
 */
function reiniciarListas() {
  listaAmigos = [];
  listaAmigosSorteados = [];
  juegoIniciado = false; // ✅ permitir agregar nuevamente
  document.getElementById("listaAmigos").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("amigo").value = "";
}

/**
 * Actualiza el contador visible de cuántos amigos faltan por sortear.
 */
function actualizarContador() {
  const contador = document.getElementById("contador");
  if (listaAmigos.length === 0) {
    contador.textContent = "";
  } else {
    const restantes = listaAmigos.length - listaAmigosSorteados.length;
    contador.textContent = `Amigos restantes por sortear: ${restantes}`;
  }
}

/**
 * Habilita o deshabilita el botón de sorteo dependiendo del estado actual.
 * Además, agrega o remueve clase CSS que cambia el estilo del botón.
 */
function actualizarBotonSortear() {
  const boton = document.querySelector(".button-draw");
  const puedeSortear =
    listaAmigos.length > 0 && listaAmigosSorteados.length < listaAmigos.length;
  boton.disabled = !puedeSortear;

  if (puedeSortear) {
    boton.classList.remove("desactivado");
  } else {
    boton.classList.add("desactivado");
  }
}
