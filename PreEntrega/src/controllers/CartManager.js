import { promises as fs } from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js'

const productAll = new ProductManager

class CartManager{
    constructor() {
        this.path = './src/models/carts.json'
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(carts)
        
    }
    writeCarts = async (cart) => {
        await fs.writeFile(this.path,JSON.stringify(cart))
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCarts = async (cart) => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{ id : id, carts : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"


    }

    getCartsById = async (id) => {
        let cartById =  await this.exist(id)
        if(!cartById) return "Carrito No Encontrado"
        return cartById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById =  await this.exist(cartId)
        if(!cartById) return "Carrito No Encontrado"
        let productById = await productAll.exist(productId)
        if(!cartById) return "Producto No Encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)
        
        if(cartById.products.some(prod => prod.id === productId)){
            let moreProductInCart = cartById.products.find(prod => prod.id === productId) 
            moreProductInCart.cantidad ++
            console.log(moreProductInCart.cantidad)
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado al Carrito"
        }

        cartById.products.push({ id:productById.id, cantidad: 1 })
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al Carrito"
        

    }

}

export default CartManager