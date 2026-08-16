// ==========================================
// IMPORTACIONES
// ==========================================

import '../css/styles.scss'

import * as bootstrap from 'bootstrap'



// ==========================================
// DETALLES DE PRODUCTOS
// ==========================================

const modalElemento =
    document.getElementById('modalProducto')


if (modalElemento) {

    const botonesDetalles =
        document.querySelectorAll('.btn-detalles')

    const modalNombre =
        document.getElementById('modalProductoNombre')

    const modalDescripcion =
        document.getElementById('modalProductoDescripcion')

    const modalPrecio =
        document.getElementById('modalProductoPrecio')

    const modalImagen =
        document.getElementById('modalProductoImagen')

    const modalProducto =
        new bootstrap.Modal(modalElemento)


    botonesDetalles.forEach((boton) => {

        boton.addEventListener('click', () => {

            const nombre =
                boton.dataset.nombre

            const descripcion =
                boton.dataset.descripcion

            const precio =
                boton.dataset.precio


            const tarjeta =
                boton.closest('.card')

            const imagenProducto =
                tarjeta.querySelector('.product-image')


            modalNombre.textContent =
                nombre

            modalDescripcion.textContent =
                descripcion

            modalPrecio.textContent =
                precio

            modalImagen.src =
                imagenProducto.src

            modalImagen.alt =
                nombre


            modalProducto.show()

        })

    })

}



// ==========================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ==========================================

const formularioContacto =
    document.getElementById('formContacto')


if (formularioContacto) {

    const camposFormulario =
        formularioContacto.querySelectorAll(
            'input, textarea'
        )

    const mensajeExito =
        document.getElementById('mensajeExito')


    // ======================================
    // VALIDACIÓN EN TIEMPO REAL
    // ======================================

    camposFormulario.forEach((campo) => {

        campo.addEventListener('input', () => {

            if (campo.checkValidity()) {

                campo.classList.remove(
                    'is-invalid'
                )

                campo.classList.add(
                    'is-valid'
                )

            } else {

                campo.classList.remove(
                    'is-valid'
                )

                campo.classList.add(
                    'is-invalid'
                )

            }

        })

    })


    // ======================================
    // VALIDACIÓN AL ENVIAR
    // ======================================

    formularioContacto.addEventListener(
        'submit',
        (evento) => {

            evento.preventDefault()


            if (
                !formularioContacto.checkValidity()
            ) {

                camposFormulario.forEach(
                    (campo) => {

                        if (
                            !campo.checkValidity()
                        ) {

                            campo.classList.add(
                                'is-invalid'
                            )

                        }

                    }
                )

                return
            }


            mensajeExito.classList.remove(
                'd-none'
            )


            formularioContacto.reset()


            camposFormulario.forEach(
                (campo) => {

                    campo.classList.remove(
                        'is-valid',
                        'is-invalid'
                    )

                }
            )

        }
    )

}



// ==========================================
// FUNCIONES GENERALES DEL CARRITO
// ==========================================

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem('carrito')
    ) || []

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        'carrito',
        JSON.stringify(carrito)
    )

}



// ==========================================
// CONTADOR DEL CARRITO EN EL NAVBAR
// ==========================================

function actualizarContadorCarrito() {

    const carrito =
        obtenerCarrito()


    const cantidadTotal =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        )


    // Buscar todos los enlaces que llevan al carrito
    const enlacesCarrito =
        document.querySelectorAll(
            'a[href="carrito.html"]'
        )


    enlacesCarrito.forEach((enlace) => {

        let contador =
            enlace.querySelector(
                '.contador-carrito'
            )


        // Crear el contador si todavía no existe
        if (!contador) {

            contador =
                document.createElement('span')

            contador.className =
                'contador-carrito badge rounded-pill bg-danger ms-1'

            enlace.appendChild(contador)

        }


        contador.textContent =
            cantidadTotal


        // Ocultar cuando está vacío
        if (cantidadTotal === 0) {

            contador.classList.add(
                'd-none'
            )

        } else {

            contador.classList.remove(
                'd-none'
            )

        }

    })

}


// Actualizar al cargar cualquier página
actualizarContadorCarrito()



// ==========================================
// AÑADIR PRODUCTOS AL CARRITO
// ==========================================

const botonesCarrito =
    document.querySelectorAll('.btn-carrito')


botonesCarrito.forEach((boton) => {

    boton.addEventListener('click', () => {

        const tarjeta =
            boton.closest('.product-card')


        if (!tarjeta) {
            return
        }


        const imagenProducto =
            tarjeta.querySelector(
                '.product-image'
            )


        const producto = {

            id: boton.dataset.id,

            nombre:
                boton.dataset.nombre,

            precio:
                Number(
                    boton.dataset.precio
                ),

            imagen:
                imagenProducto.src,

            cantidad: 1

        }


        let carrito =
            obtenerCarrito()


        const productoExistente =
            carrito.find(
                (item) =>
                    item.id === producto.id
            )


        if (productoExistente) {

            productoExistente.cantidad += 1

        } else {

            carrito.push(producto)

        }


        guardarCarrito(carrito)


        // Actualizar número del navbar
        actualizarContadorCarrito()


        // Mensaje visual en el botón
        boton.textContent =
            'Añadido ✓'

        boton.disabled = true


        setTimeout(() => {

            boton.textContent =
                'Añadir al carrito'

            boton.disabled = false

        }, 1200)

    })

})



// ==========================================
// PÁGINA DEL CARRITO
// ==========================================

const tablaCarrito =
    document.getElementById('carritoProductos')


if (tablaCarrito) {

    const subtotalCarrito =
        document.getElementById(
            'subtotalCarrito'
        )

    const totalCarrito =
        document.getElementById(
            'totalCarrito'
        )

    const cantidadProductos =
        document.getElementById(
            'cantidadProductos'
        )

    const carritoVacio =
        document.getElementById(
            'carritoVacio'
        )

    const contenidoCarrito =
        document.getElementById(
            'contenidoCarrito'
        )

    const botonVaciar =
        document.getElementById(
            'vaciarCarrito'
        )

    const botonPago =
        document.getElementById(
            'procederPago'
        )


    const formatoDinero =
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD'
            }
        )



    // ======================================
    // MOSTRAR PRODUCTOS
    // ======================================

    function mostrarCarrito() {

        const carrito =
            obtenerCarrito()


        tablaCarrito.innerHTML = ''


        // ==================================
        // CARRITO VACÍO
        // ==================================

        if (carrito.length === 0) {

            carritoVacio.classList.remove(
                'd-none'
            )

            contenidoCarrito.classList.add(
                'd-none'
            )

            actualizarContadorCarrito()

            return

        }


        carritoVacio.classList.add(
            'd-none'
        )

        contenidoCarrito.classList.remove(
            'd-none'
        )


        let subtotal = 0

        let cantidadTotal = 0


        // ==================================
        // CREAR PRODUCTOS
        // ==================================

        carrito.forEach((producto) => {

            const totalProducto =
                producto.precio *
                producto.cantidad


            subtotal +=
                totalProducto


            cantidadTotal +=
                producto.cantidad


            const fila =
                document.createElement('tr')


            fila.innerHTML = `

                <td>

                    <div class="d-flex align-items-center gap-3">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            width="70"
                            height="70"
                            class="rounded object-fit-cover">

                        <span>
                            ${producto.nombre}
                        </span>

                    </div>

                </td>


                <td>
                    ${formatoDinero.format(
                        producto.precio
                    )}
                </td>


                <td>

                    <div class="d-flex align-items-center justify-content-center gap-2">

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-dark btn-restar"
                            data-id="${producto.id}">

                            −

                        </button>


                        <span class="fw-bold">

                            ${producto.cantidad}

                        </span>


                        <button
                            type="button"
                            class="btn btn-sm btn-outline-dark btn-sumar"
                            data-id="${producto.id}">

                            +

                        </button>

                    </div>

                </td>


                <td class="fw-bold">

                    ${formatoDinero.format(
                        totalProducto
                    )}

                </td>


                <td class="text-center">

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger btn-eliminar"
                        data-id="${producto.id}">

                        Eliminar

                    </button>

                </td>

            `


            tablaCarrito.appendChild(
                fila
            )

        })


        // ==================================
        // RESUMEN
        // ==================================

        subtotalCarrito.textContent =
            formatoDinero.format(
                subtotal
            )

        totalCarrito.textContent =
            formatoDinero.format(
                subtotal
            )

        cantidadProductos.textContent =
            cantidadTotal


        actualizarContadorCarrito()

    }



    // Mostrar carrito al entrar
    mostrarCarrito()



    // ======================================
    // BOTONES +, -, ELIMINAR
    // ======================================

    tablaCarrito.addEventListener(
        'click',
        (evento) => {

            const boton =
                evento.target.closest(
                    'button'
                )


            if (!boton) {
                return
            }


            const id =
                boton.dataset.id


            let carrito =
                obtenerCarrito()


            const producto =
                carrito.find(
                    (item) =>
                        item.id === id
                )


            if (!producto) {
                return
            }



            // SUMAR

            if (
                boton.classList.contains(
                    'btn-sumar'
                )
            ) {

                producto.cantidad += 1

            }



            // RESTAR

            if (
                boton.classList.contains(
                    'btn-restar'
                )
            ) {

                producto.cantidad -= 1


                if (
                    producto.cantidad <= 0
                ) {

                    carrito =
                        carrito.filter(
                            (item) =>
                                item.id !== id
                        )

                }

            }



            // ELIMINAR

            if (
                boton.classList.contains(
                    'btn-eliminar'
                )
            ) {

                carrito =
                    carrito.filter(
                        (item) =>
                            item.id !== id
                    )

            }


            guardarCarrito(carrito)

            mostrarCarrito()

        }
    )



    // ======================================
    // VACIAR CARRITO
    // ======================================

    if (botonVaciar) {

        botonVaciar.addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    'carrito'
                )

                mostrarCarrito()

            }
        )

    }



    // ======================================
    // PROCEDER AL PAGO
    // ======================================

    if (botonPago) {

    botonPago.addEventListener(
        'click',
        () => {

            const carrito =
                obtenerCarrito()

            if (carrito.length === 0) {

                alert(
                    'Tu carrito está vacío.'
                )

                return
            }

            window.location.href =
                'pago.html'

        }
    )

}

}

// ==========================================
// CHECKOUT / PÁGINA DE PAGO
// ==========================================

const formularioPago =
    document.getElementById('formPago')


if (formularioPago) {

    const resumenProductosPago =
        document.getElementById(
            'resumenProductosPago'
        )

    const cantidadPago =
        document.getElementById(
            'cantidadPago'
        )

    const subtotalPago =
        document.getElementById(
            'subtotalPago'
        )

    const totalPago =
        document.getElementById(
            'totalPago'
        )

    const mensajePagoExito =
        document.getElementById(
            'mensajePagoExito'
        )

    const datosTarjeta =
        document.getElementById(
            'datosTarjeta'
        )

    const numeroTarjeta =
        document.getElementById(
            'numeroTarjeta'
        )

    const fechaTarjeta =
        document.getElementById(
            'fechaTarjeta'
        )

    const cvvTarjeta =
        document.getElementById(
            'cvvTarjeta'
        )

    const metodosPago =
        document.querySelectorAll(
            'input[name="metodoPago"]'
        )


    const formatoDineroPago =
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD'
            }
        )



    // ======================================
    // MOSTRAR RESUMEN
    // ======================================

    function mostrarResumenPago() {

        const carrito =
            obtenerCarrito()


        resumenProductosPago.innerHTML = ''


        if (carrito.length === 0) {

            window.location.href =
                'carrito.html'

            return
        }


        let subtotal = 0
        let cantidad = 0


        carrito.forEach((producto) => {

            const totalProducto =
                producto.precio *
                producto.cantidad


            subtotal += totalProducto

            cantidad += producto.cantidad


            const productoResumen =
                document.createElement('div')


            productoResumen.className =
                'd-flex justify-content-between mb-3'


            productoResumen.innerHTML = `

                <div>

                    <strong>
                        ${producto.nombre}
                    </strong>

                    <div class="small text-muted">

                        Cantidad:
                        ${producto.cantidad}

                    </div>

                </div>

                <span>

                    ${formatoDineroPago.format(
                        totalProducto
                    )}

                </span>

            `


            resumenProductosPago.appendChild(
                productoResumen
            )

        })


        cantidadPago.textContent =
            cantidad


        subtotalPago.textContent =
            formatoDineroPago.format(
                subtotal
            )


        totalPago.textContent =
            formatoDineroPago.format(
                subtotal
            )

    }


    mostrarResumenPago()



    // ======================================
    // CAMBIAR MÉTODO DE PAGO
    // ======================================

    metodosPago.forEach((metodo) => {

        metodo.addEventListener(
            'change',
            () => {

                if (
                    metodo.value === 'Tarjeta' &&
                    metodo.checked
                ) {

                    datosTarjeta.classList.remove(
                        'd-none'
                    )

                    numeroTarjeta.required = true
                    fechaTarjeta.required = true
                    cvvTarjeta.required = true

                } else if (
                    metodo.checked
                ) {

                    datosTarjeta.classList.add(
                        'd-none'
                    )

                    numeroTarjeta.required = false
                    fechaTarjeta.required = false
                    cvvTarjeta.required = false

                }

            }
        )

    })



    // ======================================
    // FORMATEAR NÚMERO DE TARJETA
    // ======================================

    numeroTarjeta.addEventListener(
        'input',
        () => {

            let valor =
                numeroTarjeta.value
                    .replace(/\D/g, '')
                    .slice(0, 16)


            valor =
                valor.replace(
                    /(.{4})/g,
                    '$1 '
                ).trim()


            numeroTarjeta.value =
                valor

        }
    )



    // ======================================
    // FORMATEAR FECHA
    // ======================================

    fechaTarjeta.addEventListener(
        'input',
        () => {

            let valor =
                fechaTarjeta.value
                    .replace(/\D/g, '')
                    .slice(0, 4)


            if (valor.length > 2) {

                valor =
                    valor.slice(0, 2) +
                    '/' +
                    valor.slice(2)

            }


            fechaTarjeta.value =
                valor

        }
    )



    // ======================================
    // SOLO NÚMEROS EN CVV
    // ======================================

    cvvTarjeta.addEventListener(
        'input',
        () => {

            cvvTarjeta.value =
                cvvTarjeta.value
                    .replace(/\D/g, '')
                    .slice(0, 4)

        }
    )



    // ======================================
    // VALIDACIÓN EN TIEMPO REAL
    // ======================================

    const camposPago =
        formularioPago.querySelectorAll(
            'input[type="text"], input[type="email"]'
        )


    camposPago.forEach((campo) => {

        campo.addEventListener(
            'input',
            () => {

                if (campo.checkValidity()) {

                    campo.classList.remove(
                        'is-invalid'
                    )

                    campo.classList.add(
                        'is-valid'
                    )

                } else {

                    campo.classList.remove(
                        'is-valid'
                    )

                    campo.classList.add(
                        'is-invalid'
                    )

                }

            }
        )

    })



    // ======================================
    // COMPLETAR COMPRA
    // ======================================

    formularioPago.addEventListener(
        'submit',
        (evento) => {

            evento.preventDefault()


            if (
                !formularioPago.checkValidity()
            ) {

                camposPago.forEach(
                    (campo) => {

                        if (
                            !campo.checkValidity()
                        ) {

                            campo.classList.add(
                                'is-invalid'
                            )

                        }

                    }
                )

                return
            }


            // Eliminar carrito al completar
            localStorage.removeItem(
                'carrito'
            )


            actualizarContadorCarrito()


            formularioPago.classList.add(
                'd-none'
            )


            mensajePagoExito.classList.remove(
                'd-none'
            )


            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })

        }
    )

}
