const products = {
    "T-Shirt": 400,
    "Hoodie": 900,
    "Cap": 200,
    "Shoes": 1200,
    "Bag": 700
};

const productsContainer = document.getElementById("productsContainer");

function addProduct() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("product-select");
    wrapper.innerHTML = `
        <select class="product-name">
          <option value="">-- Select Product --</option>
          ${Object.entries(products).map(([name, price]) =>
        `<option value="${name}">${name} - ₹${price}</option>`
    ).join('')}
        </select>
        <input type="number" placeholder="Quantity" class="product-qty" min="1" />
      `;
    productsContainer.appendChild(wrapper);
}

function validateInputs() {
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    document.getElementById("nameError").textContent = name ? "" : "Name is required.";
    document.getElementById("phoneError").textContent = /^\d{10}$/.test(phone) ? "" : "Enter valid 10-digit number.";
    document.getElementById("emailError").textContent = /^\S+@\S+\.\S+$/.test(email) ? "" : "Invalid email.";
    document.getElementById("addressError").textContent = address ? "" : "Address is required.";

    if (!name || !/^\d{10}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email) || !address) {
        isValid = false;
    }

    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();
    if (!validateInputs()) return false;

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    const productSelects = document.querySelectorAll(".product-select");
    let productDetails = "";
    let total = 0;
    productSelects.forEach(select => {
        const product = select.querySelector(".product-name").value;
        const qty = parseInt(select.querySelector(".product-qty").value);
        if (product && qty > 0) {
            const price = products[product];
            const subtotal = price * qty;
            productDetails += `<p>${product} x ${qty} = ₹${subtotal}</p>`;
            total += subtotal;
        }
    });

    // Show receipt
    document.getElementById("receiptName").textContent = name;
    document.getElementById("receiptPhone").textContent = phone;
    document.getElementById("receiptEmail").textContent = email;
    document.getElementById("receiptAddress").textContent = address;
    document.getElementById("receiptDate").textContent = new Date().toLocaleString();
    document.getElementById("receiptProducts").innerHTML = productDetails || "No valid products selected.";
    document.getElementById("receiptTotal").textContent = total;
    document.getElementById("receiptBox").style.display = "block";
}

// Load one product input by default
addProduct();

















// Disable certain key combinations
document.addEventListener("keydown", function (e) {
    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Ctrl+Shift+I / J / C
    if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
        e.preventDefault();
    }

    // Ctrl+U
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
    }

    // Ctrl+S (Prevent Save Page)
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
    }
});

// Disable right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
