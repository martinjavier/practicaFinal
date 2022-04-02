const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let productos = 
[
    {
    "title": "Escuadra",
    "price": 323.45,
    "thumbnail": "./escuadra.png",
    "id": 1
    },
    {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "./calculadora.png",
    "id": 2
    },
    {
    "title": "Globo Terráqueo",
    "price": 45.67,
    "thumbnail": "./globoterraqueo.png",
    "id": 3
    },
    {
    "title": "Paleta Pintura",
    "price": 456.78,
    "thumbnail": "./paletapintura.png",
    "id": 4
    },
    {
    "title": "Reloj Reloj Reloj",
    "price": 67.89,
    "thumbnail": "./reloj.png",
    "id": 5
    },
    {
    "title": "Agenda Agenda",
    "price": 78.9,
    "thumbnail": "./agenda.png",
    "id": 6
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

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));
