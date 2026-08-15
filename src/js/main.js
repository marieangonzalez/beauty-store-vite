// ==========================================
// IMPORTACIONES
// ==========================================

// Importar nuestros estilos personalizados
import '../css/styles.scss'

// Importar JavaScript de Bootstrap
import * as bootstrap from 'bootstrap'


// ==========================================
// DETALLES DE PRODUCTOS
// ==========================================

const modalElemento = document.getElementById('modalProducto')

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

            // Obtener información almacenada en el botón
            const nombre = boton.dataset.nombre
            const descripcion = boton.dataset.descripcion
            const precio = boton.dataset.precio

            // Buscar la tarjeta correspondiente al botón
            const tarjeta = boton.closest('.card')

            // Obtener la imagen que ya está cargada en la tarjeta
            const imagenProducto =
                tarjeta.querySelector('.product-image')


            // Mostrar información en el modal
            modalNombre.textContent = nombre
            modalDescripcion.textContent = descripcion
            modalPrecio.textContent = precio

            // Usar la misma URL procesada por Vite
            modalImagen.src = imagenProducto.src
            modalImagen.alt = nombre


            // Abrir modal
            modalProducto.show()

        })

    })

}

// ==========================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// ==========================================

const formularioContacto =
    document.getElementById('formContacto')


// Comprobar que estamos en la página de contacto
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

                campo.classList.remove('is-invalid')
                campo.classList.add('is-valid')

            } else {

                campo.classList.remove('is-valid')
                campo.classList.add('is-invalid')

            }

        })

    })


    // ======================================
    // VALIDACIÓN AL ENVIAR
    // ======================================

    formularioContacto.addEventListener(
        'submit',
        (evento) => {

            // Evitar que la página se recargue
            evento.preventDefault()


            // Verificar si el formulario es válido
            if (!formularioContacto.checkValidity()) {

                camposFormulario.forEach((campo) => {

                    if (!campo.checkValidity()) {

                        campo.classList.add('is-invalid')

                    }

                })

                return

            }


            // Mostrar mensaje de éxito
            mensajeExito.classList.remove('d-none')


            // Limpiar formulario
            formularioContacto.reset()


            // Eliminar estilos de validación
            camposFormulario.forEach((campo) => {

                campo.classList.remove(
                    'is-valid',
                    'is-invalid'
                )

            })

        }
    )

}