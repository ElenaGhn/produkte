document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cartButton');
    const cartDetails = document.getElementById('cartDetails');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const filterButtons = document.querySelectorAll('.filterBtn');
    const products = document.querySelectorAll('.product');

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - €${item.price.toFixed(2)}`;
            cartItems.appendChild(listItem);
            total += item.price;
        });
        totalPriceElement.textContent = `Gesamtpreis: €${total.toFixed(2)}`;
    }

    function addToCart(name, price) {
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Product added to cart: ${name} - €${price.toFixed(2)}`);
        updateCart();
    }

    function toggleCartDetails() {
        cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
    }

    cartButton.addEventListener('click', toggleCartDetails);

    function initializeAddToCartButtons() {
        document.querySelectorAll('.addToCartBtn').forEach(button => {
            button.addEventListener('click', event => {
                const product = event.target.closest('.product');
                const name = product.querySelector('h2').textContent;
                const priceText = product.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace('€', '').replace(',', '.'));

                console.log(`Adding to cart: ${name} - €${price.toFixed(2)}`);
                addToCart(name, price);
            });
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            products.forEach(product => {
                if (filter === 'all' || product.dataset.category === filter) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    initializeAddToCartButtons();
    updateCart();

    // Pagination Logic
    let currentPage = 1;
    const totalPages = 5; // Adjust as needed

    function updatePagination() {
        document.getElementById('prevPageBtn').disabled = (currentPage === 1);
        document.getElementById('nextPageBtn').disabled = (currentPage === totalPages);
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
            updatePagination();
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            loadPage(currentPage);
            updatePagination();
        }
    }

    function loadPage(page) {
        // Replace with actual page loading logic
        console.log('Loading page', page);
    }

    document.getElementById('prevPageBtn').addEventListener('click', goToPreviousPage);
    document.getElementById('nextPageBtn').addEventListener('click', goToNextPage);

    // Initialize pagination
    updatePagination();
});
