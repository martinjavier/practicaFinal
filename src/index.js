import "./config/db.js";
import { ProductosModel } from "./modules/productos.modules.js";
import { CarritoModel} from "./modules/carrito.modules.js";

const producto1 = {
    timestamp: new Date(),
    nombre: "Escuadra",
    descripcion: "Escuadra de madera",
    codigo: "001",
    foto: "./escuadra.png",
    precio: 323.45,
    stock: 100
}

const producto2 = {
    timestamp: new Date(),
    nombre: "Calculadora",
    descripcion: "Calculadora Casio",
    codigo: "002",
    foto: "./calculadora.png",
    precio: 234.56,
    stock: 102
}

const producto3 = {
    timestamp: new Date(),
    nombre: "Globo Terráqueo",
    descripcion: "Globo terráqueo de madera",
    codigo: "003",
    foto: "./globoterraqueo.png",
    precio: 456.78,
    stock: 103
}

const carrito1 = {
    timestamp: new Date(),
    producto: {
        nombre: "",
        descripcion: "",
        codigo: "",
        foto: "",
        precio: 0,
        stock: 0
    }
}

// CRUD Mongoose

// CREATE

async function createProduct() {
    try{
        // Para grabar uno o múltiples registros
        const response = await ProductosModel.create(producto1, producto2, producto3)
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

createProduct();

// READ ALL

async function readAllProducts() {
    try {
        const response = await ProductosModel.find();
        console.log(response);
    } catch (error) {
        console.log(error);        
    }
}

readAllProducts();

// READ ONE

async function readOneProduct() {
    try {
        const response = await ProductosModel.findOne({_id:'625df4a68da6e229210a98bb'});
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

readOneProduct();

// UPDATE

async function updateProduct() {
    try {
        const response = await ProductosModel.updateMany({nombre:'Calculadora'}, {precio: 987.65})
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

updateProduct();

// DELETE

async function deleteOneProduct() {
    try {
        const response = await ProductosModel.deleteMany({nombres:'Calculadora'})
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

deleteOneProduct();

// PROJECTIONS

let response
async function fn() {
    try{
        response = await ProductosModel.find(
            { nombre: "Escuadra"},
            {_id:0, nombre:1, descripcion:1}
        )
        console.log(response);
    } catch (error) {
        console.log(error)
    }
} 

fn();

// ************ CARRITO **************

// CREATE CARRITO

async function createCarrito() {
    try{
        // Para grabar uno o múltiples registros
        const response = await CarritoModel.create(carrito1)
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

createCarrito();

// READ CARRITO

async function readCarrito() {
    try {
        const response = await CarritoModel.find();
        console.log(response);
    } catch (error) {
        console.log(error);        
    }
}

readCarrito();

// UPDATE CARRITO

async function updateCarrito() {
    try {
        const response = await CarritoModel.updateMany({nombre:'Calculadora'}, {precio: 987.65})
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

updateCarrito();

// DELETE

async function deleteCarrito() {
    try {
        const response = await CarritoModel.deleteOne({_id:'1'})
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

deleteCarrito();