const listaProductos = [
    { nombre: 'Helado de vainilla', precio: 3.99 },
    { nombre: 'Helado de chocolate', precio: 4.99 },
    { nombre: 'Helado de fresa', precio: 4.49 },
    { nombre: 'Helado de cookies and cream', precio: 5.49 },
    { nombre: 'Helado de pistacho', precio: 4.99 }
  ];
  
  const inputBuscar = document.querySelector('#buscar-producto');
  const resultadoBusquedaElement = document.querySelector('.resultado-busqueda');
  
  // Función para mostrar el resultado de búsqueda
  function mostrarResultadoBusqueda(producto) {
    resultadoBusquedaElement.innerHTML = '';
  
    if (producto) {
      const item = document.createElement('li');
      item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      resultadoBusquedaElement.appendChild(item);
    } else {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No se encontró el producto.';
      resultadoBusquedaElement.appendChild(mensaje);
    }
  }
  
  // Función para buscar productos
  function buscarProducto() {
    const textoBusqueda = inputBuscar.value.toLowerCase();
    const productoEncontrado = listaProductos.find((producto) =>
      producto.nombre.toLowerCase().includes(textoBusqueda)
    );
  
    mostrarResultadoBusqueda(productoEncontrado);
  }
  
  // Escuchar el evento de entrada en el campo de búsqueda
  inputBuscar.addEventListener('input', buscarProducto);
  
  