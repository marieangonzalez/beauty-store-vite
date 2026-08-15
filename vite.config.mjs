import { resolve } from 'path'

export default {

    base: '/beauty-store-vite/',

    root: resolve(__dirname, 'src'),

    input: {
        inicio: resolve(__dirname, 'src/index.html'),
        productos: resolve(__dirname, 'src/productos.html'),
        categorias: resolve(__dirname, 'src/categorias.html'),
        ofertas: resolve(__dirname, 'src/ofertas.html'),
        novedades: resolve(__dirname, 'src/novedades.html'),
        favoritos: resolve(__dirname, 'src/favoritos.html'),
        carrito: resolve(__dirname, 'src/carrito.html'),
        nosotros: resolve(__dirname, 'src/nosotros.html'),
        contacto: resolve(__dirname, 'src/contacto.html'),
        preguntas: resolve(__dirname, 'src/preguntas.html'),
        politicas: resolve(__dirname, 'src/politicas.html')
    },

    build: {
        outDir: '../dist',
        emptyOutDir: true
    },

    server: {
        port: 8080
    }

}