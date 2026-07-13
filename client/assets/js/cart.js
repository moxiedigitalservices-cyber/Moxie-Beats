async function loadCart(){

    const cartContainer =
document.getElementById("cart-items");


if(!cartContainer){

    return;

}

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const container = document.getElementById("cart-container");
    const totalElement = document.getElementById("cart-total");

    if(cart.length === 0){

        container.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        totalElement.textContent = "Total: $0.00";

        return;
    }


    let total = 0;

    container.innerHTML = "";


    for(const id of cart){

        const res = await fetch(`${API_URL}/beats/${id}`);

        const beat = await res.json();


        total += beat.price;


        const cover =
            beat.coverImage && beat.coverImage.trim() !== ""
            ? beat.coverImage
            : "assets/images/moxxie-logo.png";


        container.innerHTML += `

        <div class="cart-item">

            <img 
                src="${cover}"
                class="cart-cover">


            <div class="cart-info">

                <h2>${beat.title}</h2>

                <p>${beat.artist}</p>

                <h3>
                    $${(beat.price / 100).toFixed(2)}
                </h3>

                <button 
                    onclick="removeFromCart('${id}')">

                    Remove

                </button>

            </div>

        </div>

        `;

    }


    totalElement.textContent =
        `Total: $${(total / 100).toFixed(2)}`;

}



function removeFromCart(id){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart =
        cart.filter(item => item !== id);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}



const checkoutBtn =
document.getElementById("checkout-btn");


if(checkoutBtn){

    checkoutBtn.addEventListener("click", async ()=>{


        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];


        if(cart.length === 0){

            alert("Your cart is empty.");

            return;

        }


        const email =
        document.getElementById("customer-email").value;


        if(!email){

            alert("Please enter your email.");

            return;

        }


        const res = await fetch(

            `${API_URL}/cart/checkout`,

            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    beats:cart,

                    email

                })

            }

        );


        const data = await res.json();


        if(!data.url){

            alert(
                data.message || "Checkout failed"
            );

            return;

        }


        window.location.href = data.url;


    });

}



if(document.getElementById("cart-items")){

    loadCart();

}