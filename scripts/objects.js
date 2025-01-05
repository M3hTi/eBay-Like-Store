const cart = {
    products : [],
    total : 0,
    addProduct : function (obj) {
        this.products.push(obj)
    },
    calculateTotalPrice : function() {
        this.total = 0
        this.products.forEach(product => {
            this.total += (product.price * Number(product.quantity))
        })
        return this.total / 100
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