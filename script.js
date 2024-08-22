// Initialisiere einen leeren Warenkorb
let cart = [];

// Funktion zum Aktualisieren der Warenkorbanzeige
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Funktion zum Hinzufügen eines Produkts zum Warenkorb
function addToCart(productName, productPrice) {
    // Erstelle ein Produktobjekt
    const product = {
        name: productName,
        price: parseFloat(productPrice.replace('€', '').replace(',', '.'))
    };

    // Füge das Produkt zum Warenkorb hinzu
    cart.push(product);

    // Speichern des Warenkorbs im localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Aktualisiere die Warenkorbanzeige
    updateCartCount();

    // Aktualisiere die Anzeige der Warenkorbprodukte
    renderCartItems();
}

// Funktion zum Rendern der Warenkorbprodukte im Dropdown
function renderCartItems() {
    const cartItemsElement = document.getElementById('cartItemsDropdown');
    cartItemsElement.innerHTML = ''; // Alte Einträge löschen

    let total = 0;
    cart.forEach((product) => {
        const item = document.createElement('li');
        item.textContent = `${product.name} - €${product.price.toFixed(2)}`;
        cartItemsElement.appendChild(item);
        total += product.price;
    });

    // Gesamtpreis im Dropdown aktualisieren
    document.getElementById('totalPriceDropdown').textContent = `Gesamtpreis: €${total.toFixed(2)}`;
}

// Event-Listener für alle "In den Warenkorb"-Buttons
document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', event => {
        // Hole die Produktinformationen aus dem DOM
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = productElement.querySelector('.price').textContent;

        // Füge das Produkt zum Warenkorb hinzu
        addToCart(productName, productPrice);
    });
});

// Laden des Warenkorbs aus dem localStorage beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        renderCartItems();
        updateCartCount();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');
    const filterButtons = document.querySelectorAll('.filterBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    const productsPerPage = 10;

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterProducts(filter);
        });
    });

    function filterProducts(category) {
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Pagination functionality
    function showPage(page) {
        products.forEach((product, index) => {
            if (index >= (page - 1) * productsPerPage && index < page * productsPerPage) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        showPage(currentPage);
    });

    // Initialize first page view
    showPage(currentPage);
});
