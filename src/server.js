const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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

const routerProductos = express.Router();

routerProductos.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(productos));
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

// Recibe y Actualiza un producto según su ID
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

app.use('/api/productos', routerProductos);

const routerCarrito = express.Router();

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

routerCarrito.get('/:id/productos', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(carrito));
})

routerProductos.post('/:id/productos', (req, res) => {
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

app.use('/api/carrito', routerCarrito);


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));
