const products = [
    { img: "https://via.placeholder.com/50", name: "Wireless ear headphones", price: "₹7999", desc: "Noise-cancelling over-ear headphones" },
    { img: "https://via.placeholder.com/50", name: "Smartwatch", price: "₹12,999", desc: "Fitness tracking smartwatch" },
    { img: "https://via.placeholder.com/50", name: "Gaming Mouse", price: "₹2499", desc: "Ergonomic gaming mouse" },
    { img: "https://via.placeholder.com/50", name: "Laptop Stand", price: "₹1999", desc: "Adjustable aluminium laptop stand" },
    { img: "https://via.placeholder.com/50", name: "Product 5", price: "₹4999", desc: "Description for product 5" },
    { img: "https://via.placeholder.com/50", name: "Product 6", price: "₹3999", desc: "Description for product 6" },
    { img: "https://via.placeholder.com/50", name: "Product 7", price: "₹5999", desc: "Description for product 7" },
    { img: "https://via.placeholder.com/50", name: "Product 8", price: "₹2999", desc: "Description for product 8" },
    { img: "https://via.placeholder.com/50", name: "Product 9", price: "₹6999", desc: "Description for product 9" },
    { img: "https://via.placeholder.com/50", name: "Product 10", price: "₹7999", desc: "Description for product 10" },
    { img: "https://via.placeholder.com/50", name: "Product 11", price: "₹8999", desc: "Description for product 11" },
    { img: "https://via.placeholder.com/50", name: "Product 12", price: "₹1999", desc: "Description for product 12" }
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = products.slice(start, end);

    const tbody = document.getElementById('productBody');
    tbody.innerHTML = '';

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Image"><img src="${product.img}" alt="${product.name}"></td>
            <td data-label="Product Name">${product.name}</td>
            <td data-label="Price (INR ₹)">${product.price}</td>
            <td data-label="Description">${product.desc}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.ceil(products.length / itemsPerPage)}`;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
}

function nextPage() {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
        currentPage++;
        displayProducts();
    }
}

displayProducts();