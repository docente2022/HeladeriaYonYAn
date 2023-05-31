

//agregar al dom elementos mediante json
fetch('./js/productos.json')
.then(response => response.json())
.then(data => {
  // Obtener el contenedor de productos
  const productosContainer = document.querySelector('#productos-container');
console.log(data)
  // Recorrer los productos y generar el contenido
  data.productos.forEach(producto => {
    // Crear elementos HTML para mostrar la información
   const productoDiv = document.createElement('div');
productoDiv.innerHTML = `
<div class="col">
  <div class="card p-2" style="width: 18rem">
    <img src="${producto.imagen}" class="card-img-top p-2" alt="Helado 1">
    <h2 class="card-title">${producto.nombre}</h2>
    <p class="card-text">${producto.descripcion}</p>
    <p>Ingredientes:${producto.ingredientes.join(', ')}</p>
    <p>Precio: $${producto.precio}</p>
  </div>
</div>
`;

// Crear el botón de agregar al carrito
const botonAgregar = document.createElement('button');
botonAgregar.textContent = 'Agregar al carrito';
botonAgregar.classList.add('agregar', 'btn', 'btn-primary');
botonAgregar.dataset.nombre = producto.nombre;
botonAgregar.dataset.precio = producto.precio;

const botonesAgregar = document.querySelectorAll('.agregar');

// Agregar evento click al botón de agregar al carrito
botonesAgregar.forEach((boton) => {
  boton.addEventListener('click', () => {
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    productosEnCarrito++;
    precioTotal += precio;

    cantidadCarrito.textContent = productosEnCarrito;
    totalCarrito.textContent = `$${precioTotal.toFixed(2)}`;

    // Agregar el producto al carrito
    const producto = document.createElement('li');
    producto.textContent = `${nombre} - $${precio.toFixed(2)}`;
    productosCarrito.appendChild(producto);

     // Agregar el botón de eliminar
     const botonEliminar = document.createElement('button');
     botonEliminar.textContent = 'Eliminar';
     
     botonEliminar.addEventListener('click', () => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿ Estás seguro que quieres eliminar el producto?',
        text: "El producto se eliminará de tu carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, elimínalo',
        cancelButtonText: 'No, cancélalo',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Producto eliminado',
            'Puedes agregar otro.',
            'success'
          )
           // Remover el producto del carrito
       productosEnCarrito--;
       precioTotal -= precio;
 
       cantidadCarrito.textContent = productosEnCarrito;
       totalCarrito.textContent = `$${precioTotal.toFixed(2)}`;
 
       productosCarrito.removeChild(producto);
       montoTotal.textContent = `$${precioTotal.toFixed(2)}`;
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El producto sigue en el carrito :)',
            'error'
          )
        }
      })
      
     });
 
     producto.appendChild(botonEliminar);
     productosCarrito.appendChild(producto);
 

    // Actualizar el monto total a pagar
    montoTotal.textContent = `$${precioTotal.toFixed(2)}`;
  });
});

// Agregar el botón al elemento productoDiv
productoDiv.querySelector('.card').appendChild(botonAgregar);


    // Agregar el elemento al contenedor de productos
    productosContainer.appendChild(productoDiv);
  });
})
.catch(error => {
  console.error('Error al cargar el archivo JSON:', error);
});



const carrito = document.querySelector('.carrito');
const cantidadCarrito = document.querySelector('.cantidad-carrito');
const totalCarrito = document.querySelector('.total-carrito');
const productosCarrito = document.querySelector('.productos-carrito');
const finalizarCompraBtn = document.querySelector('.finalizar-compra');
const montoTotal = document.querySelector('.monto-total');

let productosEnCarrito = 0;
let precioTotal = 0;

finalizarCompraBtn.addEventListener('click', () => {
  // Mostrar mensaje de agradecimiento
  Swal.fire({
    icon: 'success',
    title: 'Helados Yon-YAn',
    text: '¡ Gracias por tu compra!',
    footer: '<a href="/index.html">Volver a Comprar.</a>'
  })

  // Reiniciar el carrito
  productosEnCarrito = 0;
  precioTotal = 0;
  cantidadCarrito.textContent = productosEnCarrito;
  totalCarrito.textContent = `$${precioTotal.toFixed(2)}`;
  productosCarrito.innerHTML = '';
  montoTotal.textContent = '$0.00';
});
