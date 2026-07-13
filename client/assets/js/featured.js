let allBeats = [];

const container = document.getElementById("beats-container");

async function loadBeats() {

    const res = await fetch(`${API_URL}/beats?featured=true`);
    allBeats = await res.json();

    container.innerHTML = "";

    renderBeats(allBeats);

}

function addToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Don't add duplicates
    if(cart.includes(id)){

        alert("This beat is already in your cart.");
        return;

    }

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Beat added to cart.");

}

function updateCartCount(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.getElementById("cart-count").textContent = cart.length;

}

window.onload = () => {

    updateCartCount();

};

loadBeats();

function renderBeats(beats){

    container.innerHTML = "";

    beats.forEach(beat=>{
    
        container.innerHTML += createBeatCard(beat);
    
    });
    
    setTimeout(()=>{
    
        initializePlayers(beats);
    
    },100);

}

document
.getElementById("search");

