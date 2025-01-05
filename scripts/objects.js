const cart = {
    products : [],
    addProduct : function (obj) {
        this.products.push(obj)
    }
}





class Product {
    constructor(image, title , price , quantity , id) {
        this.image = image
        this.title = title
        this.price = price
        this.quantity = quantity
        this.id = id
    }
}