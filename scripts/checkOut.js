function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const container = document.querySelector('.products-grid')
    container.innerHTML = ''
    
    if (!cartItems || cartItems.length === 0) {
        container.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
        return
    }
    
    showCartItems(cartItems, container)
    addTotalAndCheckout(container)
}

function addTotalAndCheckout(container) {
    // Add total
    const totalContainer = document.createElement('div')
    totalContainer.className = 'total-container'
    
    const totalText = document.createElement('div')
    totalText.className = 'total-text'
    totalText.textContent = 'Total: your_total'
    
    totalContainer.appendChild(totalText)
    container.appendChild(totalContainer)
    
    // Add checkout button
    const buttonContainer = document.createElement('div')
    buttonContainer.className = 'checkout-button-container'
    
    const checkoutButton = document.createElement('a')
    checkoutButton.className = 'checkout-button'
    checkoutButton.href = '#'
    checkoutButton.innerHTML = 'check out >>'
    
    buttonContainer.appendChild(checkoutButton)
    container.appendChild(buttonContainer)
}

function showCartItems(arr, container) {
    arr.forEach(element => {
        const cartItem = document.createElement('div')
        cartItem.className = 'product-card'
        
        // Create image container
        const imageContainer = document.createElement('div')
        imageContainer.className = 'image-container'
        const img = document.createElement('img')
        img.src = element.image
        img.setAttribute("onerror", "this.src='https://via.placeholder.com/300'")
        imageContainer.appendChild(img)
        
        // Create details container
        const detailsContainer = document.createElement('div')
        detailsContainer.className = 'product-details'
        
        // Add title
        const title = document.createElement('h3')
        title.textContent = element.title
        
        // Add quantity with edit button
        const quantityContainer = document.createElement('div')
        quantityContainer.className = 'quantity-container'
        
        const quantity = document.createElement('p')
        quantity.textContent = `Quantity: ${element.quantity}`
        
        const editBtn = document.createElement('button')
        editBtn.textContent = 'edit quantity'
        editBtn.className = 'edit-quantity-btn'
        
        quantityContainer.appendChild(quantity)
        quantityContainer.appendChild(editBtn)
        
        // Add price
        const price = document.createElement('p')
        const priceValue = element.price / 100
        price.textContent = `Price: $${priceValue.toFixed(2)}`
        
        // Append all elements
        detailsContainer.appendChild(title)
        detailsContainer.appendChild(quantityContainer)
        detailsContainer.appendChild(price)
        
        cartItem.appendChild(imageContainer)
        cartItem.appendChild(detailsContainer)
        
        container.appendChild(cartItem)
    });
}

window.addEventListener('load', getCartItems)