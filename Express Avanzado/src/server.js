// Importamos los archivos al server
import express from "express";
import ProductManager from "./components/ProductManager.js";
// Creamos nuestro servidor
const app = express()
app.use(express.urlencoded({ extended: true })) // Se le especifica que puede leer Endpoints extendidos

const productos = new ProductManager() // Creamos un nuevo ProductManager
const readProducts = productos.readProducts() // Creamos un readProducts donde traemos de ProductManager los productos

// Generamos 2 rutas: 1 para todos los productos
app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) return res.send(await readProducts)
// Recibe un limite de productos sino devuelve a todos los productos
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)  
})
// La 2da ruta, especificamos por el id, el producto que queremos lo va a devolver
app.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
    try {
        let id = parseInt(req.params.id);
        let productById = await getProductById(id);
        if (!productById) return res.status(404).send('Producto no encontrado');
        res.send(productById);
      } catch (error) {
        res.status(500).send('Error al obtener el producto');
      }
})
// El servidor creado
const PORT = 8000;
const server = app.listen(PORT, () => {
    console.log(`Express por local host ${server.address().port}`)
})
server.on('error', (error) => console.log(`Error del servidor ${error}`))
