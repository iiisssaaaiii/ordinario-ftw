document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("tabla-productos");

  if (!tabla) return;

  fetch("productos.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const productos = xml.getElementsByTagName("producto");

      for (let i = 0; i < productos.length; i++) {
        const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
        const descripcion = productos[i].getElementsByTagName("descripcion")[0].textContent;
        const precio = productos[i].getElementsByTagName("precio")[0].textContent;
        const imagenSrc = productos[i].getElementsByTagName("imagen")[0].textContent;

        const fila = document.createElement("tr");
        fila.setAttribute("role", "row");

        // Imagen
        const celdaImagen = document.createElement("td");
        celdaImagen.setAttribute("role", "cell");
        const img = document.createElement("img");
        img.src = imagenSrc;
        img.alt = `Foto de ${nombre}. ${descripcion}. Precio $${precio}.`;
        img.style.width = "240px";
        img.style.borderRadius = "8px";
        celdaImagen.appendChild(img);

        // Nombre
        const celdaNombre = document.createElement("td");
        celdaNombre.setAttribute("role", "cell");
        celdaNombre.textContent = nombre;

        // Descripción
        const celdaDescripcion = document.createElement("td");
        celdaDescripcion.setAttribute("role", "cell");
        celdaDescripcion.textContent = descripcion;

        // Precio
        const celdaPrecio = document.createElement("td");
        celdaPrecio.setAttribute("role", "cell");
        celdaPrecio.textContent = `$${precio}`;

        // Botón "Construye tu [nombre]"
        const celdaBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.textContent = `Construye tu ${nombre}`;
        boton.onclick = function () {
          const productoParam = encodeURIComponent(nombre);
          window.location.href = `construye.html?producto=${productoParam}`;
        };
        boton.setAttribute("aria-label", `Construir ${nombre}`);
        celdaBoton.appendChild(boton);

        // Agregar a la fila
        fila.appendChild(celdaImagen);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaBoton);

        tabla.querySelector("tbody").appendChild(fila);
      }
    })
    .catch(error => {
      console.error("Error al cargar el XML:", error);
    });
});
