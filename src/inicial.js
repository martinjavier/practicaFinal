import { knex } from './db.js';

let productos = 
[
    {
        "id" : 1,
        "timestamp": "10",
        "nombre": "Escuadra",
        "descripcion": "Escuadra de madera",
        "codigo": "001",
        "foto": "./escuadra.png",
        "precio": 323.45,    
        "stock": 100
    },
    {
        "id" : 2,
        "timestamp": "20",
        "nombre": "Calculadora",
        "descripcion": "Calculadora Casio",
        "codigo": "002",
        "foto": "./calculadora.png",
        "precio": 234.56,    
        "stock": 102
    },
    {
        "id": 3,
        "timestamp": "30",
        "nombre": "Globo Terráqueo",
        "descripcion": "Globo terráqueo de madera",
        "codigo": "003",
        "foto": "./globoterraqueo.png",
        "precio": 45.67,    
        "stock": 103
    }
];

async function batchProcess() {
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

// Llamar al batch
batchProcess();