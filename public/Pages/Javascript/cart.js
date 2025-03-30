document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Cart Items:", cartItems);

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const discountElement = document.getElementById("discount");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const removeAllBtn = document.getElementById("remove-all");

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p class='text-gray-500 text-center'>Your cart is empty.</p>";
        return;
    }

    let subtotal = 0;
    let discount = 0;
    let tax = 0;
    let total = 0;

    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
        let shortDesc = item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description;
        
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("flex", "items-center", "p-4", "border-b", "rounded-lg", "bg-white", "shadow-sm", "gap-4");

        itemDiv.classList.add(
            "flex", "items-center", "p-4", "border-b", "rounded-lg", 
            "bg-white", "shadow-sm", "gap-4", "flex-col", "md:flex-row"
        );
        
        itemDiv.innerHTML = `
            <div class="flex items-center gap-4 w-full">
                <img src="${item.image}" class="h-16 w-16 object-cover rounded-md border" alt="${item.name}">
                <div class="flex-1">
                    <h3 class="font-semibold text-sm md:text-lg">${item.name}</h3>
                    <p class="text-gray-500 text-xs md:text-sm desc hidden md:block" data-full="${item.description}">
                        ${shortDesc}
                    </p>
                    <p class="text-gray-500 text-xs">Seller: <span class="text-blue-600">Artel Market</span></p>
                </div>
                <button class="text-gray-500 md:hidden">⋮</button>
            </div>
            
            <div class="flex items-center justify-between w-full md:w-auto">
                <div class="flex items-center border rounded px-2">
                    <button class="text-lg px-2">−</button>
                    <span class="px-2">${item.quantity}</span>
                    <button class="text-lg px-2">+</button>
                </div>
                <p class="font-semibold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        

        cartContainer.appendChild(itemDiv);
    });

    // Fix: See More & See Less functionality
    document.querySelectorAll(".see-more").forEach(button => {
        button.addEventListener("click", function () {
            let descElement = this.previousElementSibling;
            let fullText = descElement.dataset.full;
            if (this.textContent === "See More") {
                descElement.textContent = fullText;
                this.textContent = "See Less";
            } else {
                descElement.textContent = fullText.substring(0, 100) + "...";
                this.textContent = "See More";
            }
        });
    });

    // Apply Discounts & Taxes
    discount = subtotal > 100 ? subtotal * 0.05 : 0;
    tax = subtotal * 0.01;
    total = subtotal - discount + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    discountElement.textContent = `-$${discount.toFixed(2)}`;
    taxElement.textContent = `+$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Remove item from cart
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = this.dataset.id;
            cartItems = cartItems.filter(item => item.id != itemId);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            location.reload();
        });
    });

    // Update quantity
    document.querySelectorAll(".quantity-selector").forEach(select => {
        select.addEventListener("change", function () {
            const itemId = this.dataset.id;
            const newQuantity = parseInt(this.value);
            cartItems = cartItems.map(item => item.id == itemId ? { ...item, quantity: newQuantity } : item);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            location.reload();
        });
    });

    // Remove all items
    removeAllBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        location.reload();
    });
});
