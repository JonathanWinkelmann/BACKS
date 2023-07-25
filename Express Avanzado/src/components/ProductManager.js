import {promises as fs} from "fs"

export default class ProductManager {
    constructor(config) {
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, image, price, code, stock) => {

        ProductManager.id++
        let newProduct = {
            title,
            description,
            image,
            price,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => { 
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find((product) => product.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(respuesta3.find((product) => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter((products) => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto Eliminado  ")
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsModif = [ {...producto,  id}, ...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModif))
    }
}

//const productos = new ProductManager
/*
productos.addProduct("Title1", "Description1", "image1", "$100", "1abc123", "4") 
productos.addProduct("Title2", "Description2", "image2", "$120", "1abc1234", "5") 
productos.addProduct("Title3", "Description3", "image3", "$130", "1abc12345", "5") 
productos.addProduct("Title4", "Description4", "image4", "$140", "1abc1223", "3") 
productos.addProduct("Title5", "Description5", "image5", "$1520", "1abc12324", "5") 
productos.addProduct("Title6", "Description6", "image6", "$1430", "1abc123435", "5")
productos.addProduct("Title7", "Description7", "image7", "$10420", "1abc12563", "4") 
productos.addProduct("Title8", "Description8", "image8", "$13220", "1abc12354", "5") 
productos.addProduct("Title9", "Description9", "image9", "$1320", "1abc1234545", "5")
productos.addProduct("Title10", "Description10", "image10", "$13340", "1abc1234425", "5")
*/

//productos.getProducts()

//productos.getProductById(1)

//productos.deleteProductsById(2)

/*productos.updateProducts({
    title: 'Titulo3',
    description: 'Description3',
    image: 'image3',
    price: '$990', 
    code: '1abc12345',
    stock: '5',
    id: 3
})*/