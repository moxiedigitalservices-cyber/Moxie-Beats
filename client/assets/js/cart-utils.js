// ==========================================
// MOXXIE CART UTILITIES
// ==========================================

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}



function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



function updateCartCount(){

    const badge =
    document.getElementById("cart-count");


    if(!badge){

        return;

    }


    badge.textContent =
        getCart().length;

}



function addToCart(id){

    const cart =
        getCart();


    if(cart.includes(id)){

        alert(
            "This beat is already in your cart."
        );

        return;

    }


    cart.push(id);

    saveCart(cart);

    updateCartCount();

    alert(
        "Beat added to cart."
    );

}



// Make available globally
window.getCart = getCart;
window.saveCart = saveCart;
window.updateCartCount = updateCartCount;
window.addToCart = addToCart;