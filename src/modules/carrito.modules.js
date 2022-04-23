import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config()

const Schema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    producto: { type: Object, required: true, max: 500 }
})

export const CarritoModel = mongoose.model("Carrito", Schema);

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log("❌ Error al conectarse a MongoDB");
    } else {
        console.log("🔥 Conectados a MongoDB");
    }
});

export default mongoose;