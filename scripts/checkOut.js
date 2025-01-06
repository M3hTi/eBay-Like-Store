const container = document.querySelector('.products-grid')
const cartIcon = document.querySelector('.cart-count')

function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    
    if (!cartItems || cartItems.length === 0) {
        container.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
        cartIcon.textContent = '0'
        return
    }

    // Initialize cart products from localStorage
    cart.products = cartItems
    cartIcon.textContent = cartItems.length
    container.innerHTML = ''
    
    showCartItems(cartItems)
    addTotalAndCheckout(container)
}

function addTotalAndCheckout(container) {
    // Add total
    const totalContainer = document.createElement('div')
    totalContainer.className = 'total-container'
    
    const totalText = document.createElement('div')
    totalText.className = 'total-text'
    const total = cart.calculateTotalPrice()
    totalText.textContent = `Total: $${total.toFixed(2)}`
    
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

function showCartItems(arr) {
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

        editBtn.addEventListener('click', () => {
            editBtn.remove()
            const numberInput = document.createElement('input')
            numberInput.type = 'number'
            numberInput.min = '1'
            numberInput.max = '99'
            numberInput.value = element.quantity
            numberInput.placeholder = 'Qty'
            
            const saveBtn = document.createElement('button')
            saveBtn.className = 'edit-quantity-btn'
            saveBtn.textContent = 'Save'
            
            quantityContainer.appendChild(numberInput)
            quantityContainer.appendChild(saveBtn)
            
            // Auto focus the input
            numberInput.focus()
        })
        
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