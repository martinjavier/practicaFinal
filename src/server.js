import { knex } from './db.js';
import express from "express";

//const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = express.Router();
const routerCarrito = express.Router();

// PRODUCTOS

routerProductos.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    let misproductos = [];
    async function selectProducts() {
        try{
            misproductos = await knex.select().from('productos').orderBy('id','asc');
            res.send(JSON.stringify(misproductos));
        } catch (error) {
            console.log(error);
        }
    }
    selectProducts();
    
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
