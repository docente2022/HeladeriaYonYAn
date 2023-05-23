const botonesAgregar = document.querySelectorAll('.agregar');
const carrito = document.querySelector('.carrito');
const cantidadCarrito = document.querySelector('.cantidad-carrito');
const totalCarrito = document.querySelector('.total-carrito');
const productosCarrito = document.querySelector('.productos-carrito');
const finalizarCompraBtn = document.querySelector('.finalizar-compra');
const montoTotal = document.querySelector('.monto-total');

let productosEnCarrito = 0;
let precioTotal = 0;

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
            'Canceladpo',
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
