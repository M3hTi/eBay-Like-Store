const productsGrid = document.querySelector('.products-grid')
const searcInput = document.querySelector('.js-srchInput')
const searchBtn = document.querySelector('.js-srchBtn')
const cartCounter = document.querySelector('.cart-count')
const cartIcon = document.querySelector('.cart-icon')

fetch(`https://api.escuelajs.co/api/v1/products`)
.then(response => {
    if(!response.ok) throw new Error(`Error : ${response.statusText}`);
    return response.json()
})
.then(data => {
    console.log(data);
    showProducts(data)
    searcInput.addEventListener('keydown', (e) => {
        searchProduct(e, data)
    })
    searchBtn.addEventListener('click', (e) => {
        searchProduct(e, data)
    })
    cartIcon.addEventListener('click', () => {
        displayCartItems(cart.products);
    })
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
        const quantitySelect = document.createElement('select') // renamed from quantity to quantitySelect
        quantitySelect.className = 'quantity'
        for(let i = 1; i <= 5; i++) {
            const option = document.createElement('option')
            option.value = i
            option.textContent = i
            quantitySelect.appendChild(option)
        }
        
        // Add buy button
        const buyBtn = document.createElement('button')
        buyBtn.className = 'buy-btn'
        buyBtn.textContent = 'Buy Now'
        
        // Append all elements in correct order
        card.appendChild(cardImg)
        productDetail.appendChild(title)
        productDetail.appendChild(price)
        productDetail.appendChild(quantitySelect)
        productDetail.appendChild(buyBtn)
        card.appendChild(productDetail)

        buyBtn.addEventListener('click', () => {
            const image = element.images[0]
            const title = element.title
            const price =  (element.price) * 100
            const quantity = quantitySelect.value // Now referencing the correct select element
            const id = element.id

            const product = new Product(image, title , price , quantity , id)

            // console.log(product);

            cart.addProduct(product)

            cartCounter.textContent = cart.products.length


            localStorage.setItem('cartItems', JSON.stringify(cart.products))

            console.log(cart.products);
        })
        
        productsGrid.appendChild(card)
    });
}

function displayCartItems(arr) {
    // Remove existing cart overlay if present
    const existingOverlay = document.querySelector('.cart-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create cart overlay
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';

    // Create cart items container
    const cartItemsContainer = document.createElement('div');
    cartItemsContainer.className = 'cart-items-container';

    

    // Add each cart item
    arr.forEach(element => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemImage = document.createElement('img');
        itemImage.src = element.image;
        itemImage.className = 'cart-item-image';
        itemImage.setAttribute("onerror", "this.src='https://via.placeholder.com/300'");

        const itemInfo = document.createElement('div');
        itemInfo.className = 'cart-item-info';

        const itemTitle = document.createElement('h3');
        itemTitle.className = 'cart-item-title';
        itemTitle.textContent = element.title;

        const itemPrice = document.createElement('p');
        itemPrice.className = 'cart-item-price';
        const price = element.price / 100; // Convert cents to dollars
        itemPrice.textContent = `Price: $${price.toFixed(2)}`;

        const itemQuantity = document.createElement('p');
        itemQuantity.className = 'cart-item-price'
        itemQuantity.textContent = `Quantity: ${element.quantity}`

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';


        deleteBtn.addEventListener('click', () => {
            // console.log(element);
            const foundProduct = cart.products.some(product => product.id === element.id)

            if(foundProduct){
                const findIndex = cart.products.findIndex(product => product.id === element.id)

                cart.products.splice(findIndex, 1)

                displayCartItems(cart.products)
            }

            // console.log(cart.products);
        })

        itemInfo.appendChild(itemTitle);
        itemInfo.appendChild(itemPrice);
        itemInfo.appendChild(itemQuantity);

        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(deleteBtn);
        cartItemsContainer.appendChild(cartItem);
    });

    // Add total
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    const total = cart.calculateTotalPrice()
    totalElement.textContent = `Total: $${total.toFixed(2)}`;


    const checkOut = document.createElement('div')


    const checkOutLink = document.createElement('a')
    checkOutLink.className = "checkOut"
    checkOutLink.href = "#"
    checkOutLink.textContent = "Proceed to checkout"
    checkOut.appendChild(checkOutLink)
     


    // Append everything to cart overlay
    cartOverlay.appendChild(cartItemsContainer);
    cartOverlay.appendChild(totalElement);
    cartOverlay.appendChild(checkOut)

    // Add to document
    document.body.appendChild(cartOverlay);

    // Show cart overlay
    setTimeout(() => {
        cartOverlay.classList.add('active');
    }, 10);

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartOverlay.contains(e.target) && !cartIcon.contains(e.target)) {
            cartOverlay.classList.remove('active');
            setTimeout(() => {
                cartOverlay.remove();
            }, 300);
        }
    });
}

function searchProduct(e, arr) {
    if(e.type === 'click' || (e.type === 'keydown' &&  e.key === 'Enter')){
        const srchValue = searcInput.value.toLowerCase();

        const matchProduct = arr.filter(elem => 
            elem.title.toLowerCase().includes(srchValue)
        );

        showProducts(matchProduct);
    }
}




