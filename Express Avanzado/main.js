class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, image, code, stock) {
        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code){
                console.log(`El codigo: ${code} esta repetido`);
                break;
            }
        }
        

        const newProduct ={
            title,
             description, 
             price, 
             image, 
             code, 
             stock,
            }
            
            if(!Object.values(newProduct).includes(undefined)){
                ProductManager.id++ 
                this.products.push({
                    ...newProduct,
                    id: ProductManager.id, 
                });
            } else {
                console.log("Todos los campos son requeridos")
            }

    }

    getProduct() {
        return this.products;
    }

    existe (id) {
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id) {
        !this.existe(id) ? console.log("Not found") : console.log(this.existe(id))
        
    }
}

const productos = new ProductManager();
// Primera llamada = arreglo vacio
console.log(productos.getProduct());

// Agregamos Producto
productos.addProduct('Tituto1', 'descriptio1', 1000, "imagen1", "abc123", 5)
productos.addProduct('Tituto2', 'descriptio2', 2000, "imagen2", "abc1234")


// Segunda llamada = arreglo con producto
console.log(productos.getProduct());

// Validacion de CODE repetido
productos.addProduct('Tituto3', 'descriptio3', 3000, "imagen3", "abc123", 5)

// Busqueda de producto por su ID
productos.getProductById(2)

// Busqueda por su ID no encontrado
productos.getProductById(3)






























