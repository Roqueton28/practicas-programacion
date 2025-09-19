document.addEventListener("DOMContentLoaded", () => {
  // Activar pestañas
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // Fecha actual por defecto
  const fechaInput = document.getElementById("fecha");
  if (fechaInput) {
    fechaInput.valueAsDate = new Date();
  }

  // Agregar artículo
  const enviarBtn = document.querySelector(".enviar-btn");
  const rejilla = document.querySelector(".rejilla");

  enviarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const articulo = {
      fecha: fechaInput.value,
      id: document.getElementById("id").value,
      nombre: document.getElementById("nombre-articulo").value,
      cantidad: document.getElementById("cantidad-articulo").value,
      precio: document.getElementById("precio-articulo").value
    };

    guardarArticulo(articulo);
    mostrarArticulos();

    document.getElementById("form-agregar").reset();
    fechaInput.valueAsDate = new Date();
  });

  function guardarArticulo(articulo) {
    const lista = JSON.parse(localStorage.getItem("articulos")) || [];
    lista.push(articulo);
    localStorage.setItem("articulos", JSON.stringify(lista));
  }

  function mostrarArticulos() {
    const lista = JSON.parse(localStorage.getItem("articulos")) || [];
    rejilla.innerHTML = lista.map(a => `
      <div class="tarjeta">
        <strong>${a.nombre}</strong> - ${a.cantidad} unidades - $${a.precio} <br>
        <small>ID: ${a.id} | Fecha: ${a.fecha}</small>
      </div>
    `).join("");
  }

  mostrarArticulos();

  // Buscar artículo
  const buscarBtn = document.querySelector(".buscar-btn");
  const borrarBtn = document.querySelector(".borrar-btn");

  buscarBtn.addEventListener("click", () => {
    const idBuscar = document.getElementById("buscar-id").value;
    const lista = JSON.parse(localStorage.getItem("articulos")) || [];
    const encontrado = lista.find(a => a.id === idBuscar);
    document.getElementById("buscar-id").value="";


    if (encontrado) {
      document.getElementById("nombre").textContent = encontrado.nombre;
      document.getElementById("cantidad").textContent = encontrado.cantidad;
      document.getElementById("precio").textContent = encontrado.precio;
      borrarBtn.dataset.id = encontrado.id;
    } else {
      alert("Artículo no encontrado");
    }
  });

  // Borrar artículo
  borrarBtn.addEventListener("click", () => {
    const id = borrarBtn.dataset.id;
    let lista = JSON.parse(localStorage.getItem("articulos")) || [];
    lista = lista.filter(a => a.id !== id);
    localStorage.setItem("articulos", JSON.stringify(lista));
    mostrarArticulos();
    document.getElementById("nombre").textContent = "";
    document.getElementById("cantidad").textContent = "";
    document.getElementById("precio").textContent = "";
    borrarBtn.dataset.id = "";
  });

  // Personalizar colores
  const aplicarBtn = document.querySelector(".aplicar-btn");
  const fondoColor = document.getElementById("fondo-color");
  const textoColor = document.getElementById("texto-color");
  const preview = document.querySelector(".preview");

  fondoColor.addEventListener("input", actualizarPreview);
  textoColor.addEventListener("input", actualizarPreview);

  function actualizarPreview() {
    preview.style.backgroundColor = fondoColor.value;
    preview.style.color = textoColor.value;
  }

  aplicarBtn.addEventListener("click", () => {
    tabContents.forEach(tab => {
      tab.style.backgroundColor = fondoColor.value;
      tab.style.color = textoColor.value;
    });
  });
});
