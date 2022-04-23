import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config()

const Schema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: false, max: 100 },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: false },
    stock: { type: Number, required: false }
})

export const ProductosModel = mongoose.model("Productos", Schema);

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log("❌ Error al conectarse a MongoDB");
    } else {
        console.log("🔥 Conectados a MongoDB");
    }
});

export default mongoose;