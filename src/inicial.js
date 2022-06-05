import { knex } from './db.js';
import {faker} from '@faker-js/faker';

let productos = [];

for (let i = 1; i <= 6; i++) {
    const product = {
        id: i,
        timestamp: 0,
        nombre: faker.name.firstName(),
        descripcion: "descripción "+i,
        codigo: faker.random.numeric(5),
        foto: faker.image.imageUrl(),
        precio: faker.random.numeric(3),
        stock: faker.random.numeric(3)
    }
    productos.push(product);        
}

console.log(productos);

let carrito = [];

carrito = [
    {
        "id" : 1,
        "timestamp": Date.now(),
        "producto": {
            "id": 1,
            "timestamp": Date.now(),
            "nombre": "",
            "descripcion": "",
            "codigo": "",
            "foto": "",
            "precio": 0.0,    
            "stock": 0
        }
    }
];      

async function batchProductos() {
    // Drop Table
    try {
        const exist = await knex.schema.dropTableIfExists('productos');
        console.log(exist);                  
    } catch (error) {
        console.log(error);
    }
    // Table Creation
    try {
        const exist = await knex.schema.hasTable('productos');
        if (!exist) {
            await knex.schema.createTable('productos', (table) => {
                table.increments('id').primary().notNullable(),
                table.varchar('timestamp', 15).notNullable,
                table.varchar('nombre', 30).notNullable,
                table.string('descripcion', 30),
                table.integer('codigo'),
                table.string('foto', 40),
                table.float('precio'),
                table.integer('stock')
            });
            console.log('🔥 Tabla Productos creada 🔥');
        } else {
            console.log('La tabla Productos ya existe 🥺');
        }
    } catch (error) {
        console.log(error);
    }
    // Insert Products
    try {
        const response = await knex.insert(productos).from('productos');
        console.log('Productos Agregados 😁')
        console.log(response);
    } catch (error) {
        console.log(error)
    } 
}

async function batchCarrito() {
    // Drop Table
    try {
        const exist = await knex.schema.dropTableIfExists('carrito');
        console.log(exist);                  
    } catch (error) {
        console.log(error);
    }
    // Table Creation
    try {
        const exist = await knex.schema.hasTable('carrito');
        if (!exist) {
            await knex.schema.createTable('carrito', (table) => {
                table.increments('id').primary().notNullable(),
                table.varchar('timestamp', 15).notNullable,
                table.json('producto', 50).notNullable
            });
            console.log('🔥 Tabla Carrito creada 🔥');
        } else {
            console.log('La tabla Carrito ya existe 🥺');
        }
    } catch (error) {
        console.log(error);
    }
    // Insert Products
    try {
        const response = await knex.insert(carrito).from('carrito');
        console.log('Carrito Agregado 😁')
        console.log(response);
    } catch (error) {
        console.log(error)
    } 
}

// Llamar a los procesos batch
batchProductos();
batchCarrito();