import { knex } from './db.js';

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const articles = [
    {nombre: 'Nombre1', codigo: 'Codigo1', precio: 123.45, stock: 100},
    {nombre: 'Nombre2', codigo: 'Codigo2', precio: 223.45, stock: 200},
    {nombre: 'Nombre3', codigo: 'Codigo3', precio: 323.45, stock: 300},
    {nombre: 'Nombre4', codigo: 'Codigo4', precio: 423.45, stock: 400},
    {nombre: 'Nombre5', codigo: 'Codigo5', precio: 523.45, stock: 500}
]

let carrito = 
[
    {
        "id": 1,
        "timestamp": "",
        "producto": {
            "id": 0,
            "timestamp": "",
            "nombre": "",
            "descripcion": "",
            "codigo": "",
            "foto": "",
            "precio": 0,
            "stock": 0
        }
    }
]

let productos = 
[
    {
        "id" : 1,
        "timestamp": "",
        "nombre": "Escuadra",
        "descripcion": "Escuadra de madera",
        "codigo": "001",
        "foto": "./escuadra.png",
        "precio": 323.45,    
        "stock": 100
    },
    {
        "id" : 2,
        "timestamp": "",
        "nombre": "Calculadora",
        "descripcion": "Calculadora Casio",
        "codigo": "002",
        "foto": "./calculadora.png",
        "precio": 234.56,    
        "stock": 102
    },
    {
        "id": 3,
        "timestamp": "",
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
                table.varchar('timestap', 15).notNullable,
                table.varchar('nombre', 10).notNullable,
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
    /*
    // Read Articles
    try {
        const users = await knex.select().from('articulos').orderBy('id','asc');
        console.log(users);
    } catch (error) {
        console.log(error);
    }
    // Delete Article
    try {
        await knex.del().from('articulos').where('id',5);
        console.log('Artículo borrado 😫');
    } catch (error) {
        console.log(error);
    }
    // Update Article
    try {
        await knex.from('articulos').update({stock: 0}).where('id',2);
        console.log('Información Actualizada');
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
    */
}

// Llamar al batch
batchProcess();

const routerProductos = express.Router();
const routerCarrito = express.Router();

// PRODUCTOS

routerProductos.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    const misproductos = []
    async function selectProducts() {
        try{
            misproductos = await knex.select().from('productos').orderBy('id','asc');
        } catch (error) {
            console.log(error);
        }
    }
    selectProducts();
    res.send(JSON.stringify(misproductos));
})

routerProductos.get('/:id', (req, res) => {
    const {id} = req.params
    let itemSearched = productos[id-1];
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(itemSearched));
})

routerProductos.post('/', (req, res) => {
    const {body} = req
    productos.push(body);
    res.status(200).send('Producto agregado');
})

routerProductos.put('/:id', (req, res) => {
    const {id} = req.params;
    const {body} = req
    let itemSearched = productos[id];
    let content = productos;
    content = content.filter(x => {
        return x.id != id;
      })
    productos = content;
    productos.push(body);
    res.status(200).send('Producto actualizado');
})

routerProductos.delete('/:id', (req, res) => {
    const {id} = req.params;
    let content = productos;
    content = content.filter(x => {
        return x.id != id;
      })
    productos = content;
    res.status(200).send(`Producto ${id} eliminado`);
})

// CARRITO

routerCarrito.get('/:id', (req, res) => {
    const {id} = req.params
    let itemSearched = carrito[id-1];
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(itemSearched));
})

routerCarrito.post('/', (req, res) => {
    const {body} = req
    carrito.push(body);
    res.status(200).send('Carrito creado');
})

routerCarrito.delete('/:id', (req, res) => {
    const {id} = req.params;
    let content = carrito;
    content = content.filter(x => {
        return x.id != id;
      })
    carrito = content;
    res.status(200).send(`Carrito ${id} eliminado`);
})

routerCarrito.post('/:id/productos', (req, res) => {
    const {id} = req.params;
    const {body} = req
    let itemSearched = productos[id];
    let content = productos;
    content = content.filter(x => {
        return x.id != id;
      })
    productos = content;
    carrito.push(body);
    res.status(200).send('Producto agregado al carrito');
})

routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const {id} = req.params;
    let content = carrito;
    content = content.filter(x => {
        return x.id != id;
      })
    carrito = content;
    res.status(200).send(`Carrito ${id} eliminado`);
})

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));
