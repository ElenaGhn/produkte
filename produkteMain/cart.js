document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.getElementById('cartTableBody');
    const addProductBtn = document.getElementById('addProductBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartTableBody.innerHTML = '';
        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            const productCell = document.createElement('td');
            productCell.textContent = item.name;

            const priceCell = document.createElement('td');
            priceCell.textContent = `€${item.price.toFixed(2)}`;

            const quantityCell = document.createElement('td');
            quantityCell.innerHTML = `<input type="number" min="1" value="${item.quantity || 1}" data-index="${index}" class="quantityInput">`;

            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `<button class="removeBtn" data-index="${index}">Entfernen</button>`;

            row.appendChild(productCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(actionsCell);
            cartTableBody.appendChild(row);
        });
    }

    function updateCart(index, quantity) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function handleActions() {
        cartTableBody.addEventListener('click', event => {
            if (event.target.classList.contains('removeBtn')) {
                const index = event.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }
        });

        addProductBtn.addEventListener('click', () => {
            alert('Funktionalität zum Hinzufügen neuer Produkte wird noch entwickelt.');
        });

        checkoutBtn.addEventListener('click', () => {
            alert('Zur Kasse gehen: Funktion wird noch entwickelt.');
        });

        cartTableBody.addEventListener('change', event => {
            if (event.target.classList.contains('quantityInput')) {
                const index = event.target.getAttribute('data-index');
                const quantity = parseInt(event.target.value, 10);
                if (quantity > 0) {
                    updateCart(index, quantity);
                } else {
                    alert('Menge muss mindestens 1 sein.');
                    event.target.value = cart[index].quantity || 1;
                }
            }
        });
    }

    renderCart();
    handleActions();
});
