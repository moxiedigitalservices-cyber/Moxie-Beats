async function loadCart() {
    const beatId = localStorage.getItem("cart");

    const container = document.getElementById("cart-container");

    if (!beatId) {
        container.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    const res = await fetch(`${API_URL}/beats/${beatId}`);
    const beat = await res.json();

    container.innerHTML = `
        <div class="beat-card">
            <h2>${beat.title}</h2>
            <p>${beat.artist}</p>
            <p>$${(beat.price / 100).toFixed(2)}</p>
        </div>
    `;
}

document.getElementById("checkout-btn")
    .addEventListener("click", async () => {

        const beatId = localStorage.getItem("cart");

        const res = await fetch(`${API_URL}/cart/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                beatId
            })
        });

        const data = await res.json();

        window.location.href = data.url;
    });

loadCart();