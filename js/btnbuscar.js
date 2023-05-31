const productos = [
  { nombre: 'Helado de vainilla', precio: 3.99 },
  { nombre: 'Helado de chocolate', precio: 4.99 },
  { nombre: 'Helado de fresa', precio: 4.49 },
  { nombre: 'Helado de cookies and cream', precio: 5.49 },
  { nombre: 'Helado de pistacho', precio: 4.99 }
];

function buscarProducto() {
  const textoBusqueda = document.getElementById('texto-busqueda').value.toLowerCase();
  const listaProductos = document.getElementById('lista-productos');
  listaProductos.innerHTML = '';

  const productosEncontrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(textoBusqueda)
  );

  if (productosEncontrados.length > 0) {
    productosEncontrados.forEach((producto) => {
      const item = document.createElement('li');
      item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      listaProductos.appendChild(item);
    });
  } else {
    const mensaje = document.createElement('li');
    mensaje.textContent = 'No se encontraron productos.';
    listaProductos.appendChild(mensaje);
  }
}

document.getElementById('btn-buscar').addEventListener('click', buscarProducto);
