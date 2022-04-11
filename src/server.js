import { knex } from './db.js';
import express from "express";
//import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const routerProductos = express.Router();
const routerCarrito = express.Router();

// PRODUCTOS

routerProductos.get('/', (req, res) => {
    let misproductos = [];
    async function selectProducts() {
        try{
            misproductos = await knex.select().from('productos').orderBy('id','asc');
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            console.log("GET /");
            res.send(JSON.stringify(misproductos));
        } catch (error) {
            console.log(error);
        }
    }
    selectProducts();    
})

routerProductos.get('/:id', (req, res) => {
    const {id} = req.params.id;
    console.log('Parámetro recibido: ',req.params);
    console.log('Body recibido: ',req.body);
    let itemSearched = [];
    async function selectProducts() {
        try{            
            itemSearched = await knex.select().from('productos').where('id',id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            console.log("GET WITH ID");
            res.send(JSON.stringify(itemSearched));
        } catch (error) {
            console.log(error);
        }
    }
    selectProducts(); 
})

routerProductos.post('/', (req, res) => {
    const {body} = req;
    async function insertProduct() {
        try{
            const response = await knex.insert(body).from('productos');
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    }
    insertProduct(); 
})

routerProductos.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("ID: ", id);
    console.log("BODY: ", body);
    async function updateProduct() {
        try{ 
            const update = await knex.from('productos').update(body).where('id',id);  
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(update));
        } catch (error) {
            console.log(error);
        }
    }
    updateProduct(); 
})

routerProductos.delete('/:id', (req, res) => {
    const {id} = req.params;
    async function deleteProduct() {
        try{ 
            const deleted = await knex.del().from('productos').where('id',id-1);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(deleted));
        } catch (error) {
            console.log(error);
        }
    }
    deleteProduct(); 
})

// CARRITO

routerCarrito.get('/', (req, res) => {
    let micarrito = [];
    async function selectCarrito(){
    try {
        micarrito = await knex.select().from('carrito').orderBy('id','asc');
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(micarrito));
    } catch (error) {
        console.log(error);
    }
    }
    selectCarrito();
})

routerCarrito.get('/:id', (req, res) => {
    const {id} = req.params.id;
    let itemSearched = [];
    async function getCarrito(){
    try {
        itemSearched = await knex.select().from('carrito').where('id',id);
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(itemSearched));
    } catch (error) {
        console.log(error);
    }
    }
    getCarrito();
})

routerCarrito.post('/', (req, res) => {
    const {body} = req
    async function insertCarrito() {
        try{
            const response = await knex.insert(body).from('carrito');
            res.status(200).send('Carrito creado');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    }
    insertCarrito();
})

// Borra carrito
routerCarrito.delete('/:id', (req, res) => {
    const {id} = req.params;
    async function deleteCarrito() {
        try{ 
            const deleted = await knex.del().from('carrito').where('id',id);
            res.status(200).send(`Carrito ${id} eliminado`);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(deleted));
        } catch (error) {
            console.log(error);
        }
    }
    deleteCarrito();
})

// Borra un producto dentro del carrito
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
    const {id} = req.params;
    async function deleteCarrito() {
        try{ 
            const deleted = await knex.del().from('carrito').where('id_prod',id);
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(deleted));
        } catch (error) {
            console.log(error);
        }
    }
    deleteCarrito();
})

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => { console.log(`🔥 Server started on localhost on http://localhost:${PORT}`)});
server.on('error', (err) => console.log(err));
