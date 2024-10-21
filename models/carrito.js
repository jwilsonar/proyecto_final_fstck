const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');


const p = path.join(
    raizDir,
    'data',
    'carrito.json'
);

module.exports = class Carrito {
    static agregarProducto(id, precio) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
        let carrito = { productos: [], precioTotal: 0 };
        if (!err) {
            carrito = JSON.parse(fileContent);
        }
        // Analyze the cart => Find existing product
        const indiceProductoExistente = carrito.productos.findIndex(
            prod => prod.id === id
        );
        const productoExistente = carrito.productos[indiceProductoExistente];
        let productoActualizado;
        // Add new product/ increase quantity
        if (productoExistente) {
            productoActualizado = { ...productoExistente };
            productoActualizado.cantidad = productoActualizado.cantidad + 1;
            carrito.productos = [...carrito.productos];
            carrito.productos[indiceProductoExistente] = productoActualizado;
        } else {
            productoActualizado = { id: id, cantidad: 1 };
            carrito.productos = [...carrito.productos, productoActualizado];
        }
        carrito.precioTotal = carrito.precioTotal + +precio;
        fs.writeFile(p, JSON.stringify(carrito), err => {
            console.log(err);
        });
        });
    }

    static eliminarProducto(id, precio) {
        fs.readFile(p, (err, fileContent) => {
        if (err) {
            return;
        }
        const carritoActualizado = { ...JSON.parse(fileContent) };
        const producto = carritoActualizado.productos.find(prod => prod.id === id);
        if (!producto) {
            return;
        } 
        const cantidadProducto = producto.cantidad;
        carritoActualizado.productos = carritoActualizado.productos.filter(
            prod => prod.id !== id
        );
        carritoActualizado.precioTotal =
        carritoActualizado.precioTotal - precio * cantidadProducto;

        fs.writeFile(p, JSON.stringify(carritoActualizado), err => {
            console.log(err);
        });
        });
    }
    
    static getCarrito(cb) {
        fs.readFile(p, (err, fileContent) => {
        const carrito = JSON.parse(fileContent);
        if (err) {
            cb(null);
        } else {
            cb(carrito);
        }
        });
    }

};