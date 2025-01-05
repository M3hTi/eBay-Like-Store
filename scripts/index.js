const productsGrid = document.querySelector('.products-grid')

fetch(`https://api.escuelajs.co/api/v1/products`)
.then(response => {
    if(!response.ok) throw new Error(`Error : ${response.statusText}`);
    return response.json()
})
.then(data => {
    console.log(data);
    showProducts(data)
})
.catch(error => {
    console.log(error);
})

function showProducts(arr) {
    productsGrid.innerHTML = ''; // Clear existing content first
    
    arr.forEach(element => {
        const card = document.createElement('div')
        card.className = 'product-card'
        
        const cardImg = document.createElement('img')
        cardImg.src = element.images[0]
        cardImg.alt = element.title
        cardImg.setAttribute("onerror", "this.src='https://via.placeholder.com/300'")
        
        const productDetail = document.createElement('div')
        productDetail.className = 'product-details'
        
        // Add product title
        const title = document.createElement('h3')
        title.textContent = element.title
        
        // Add product price
        const price = document.createElement('p')
        price.className = 'price'
        price.textContent = `$${element.price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`
        
        // Add quantity selector
        const quantity = document.createElement('select')
        quantity.className = 'quantity'
        for(let i = 1; i <= 5; i++) {
            const option = document.createElement('option')
            option.value = i
            option.textContent = i
            quantity.appendChild(option)
        }
        
        // Add buy button
        const buyBtn = document.createElement('button')
        buyBtn.className = 'buy-btn'
        buyBtn.textContent = 'Buy Now'
        
        // Append all elements in correct order
        card.appendChild(cardImg)
        productDetail.appendChild(title)
        productDetail.appendChild(price)
        productDetail.appendChild(quantity)
        productDetail.appendChild(buyBtn)
        card.appendChild(productDetail)
        
        productsGrid.appendChild(card)
    });
}