let allBeats = [];

async function loadBeats() {

    const res = await fetch(`${API_URL}/beats?featured=true`);
    allBeats = await res.json();

    const container = document.getElementById("beats-container");

    container.innerHTML = "";

    renderBeats(allBeats);

}

function addToCart(id){

    localStorage.setItem("cart",id);

    document.getElementById("cart-count").textContent="1";

    alert("Beat added to cart.");

}

window.onload=()=>{

    if(localStorage.getItem("cart")){

        document.getElementById("cart-count").textContent="1";

    }

}

loadBeats();

function renderBeats(beats){

    const container = document.getElementById("beats-container");

    container.innerHTML = "";

    beats.forEach(beat=>{

        const cover =
            beat.coverImage && beat.coverImage.trim() !== ""
                ? beat.coverImage
                : "./images/moxxie-logo.png";

        container.innerHTML += `
        <div class="beat-card">

            <img
                class="beat-cover"
                src="${cover}"
                alt="${beat.title}">

            <div class="beat-info">

                <h2>${beat.title}</h2>

                <p class="artist">${beat.artist}</p>

                <p class="meta">

                    ${beat.genre} • ${beat.bpm} BPM • ${beat.key}

                </p>

                <h3>$${(beat.price/100).toFixed(2)}</h3>

                <audio controls>

                    <source
                        src="${beat.previewUrl}"
                        type="audio/mpeg">

                </audio>

                <button onclick="addToCart('${beat._id}')">

                    Add To Cart

                </button>

            </div>

        </div>
        `;

    });

}

document
.getElementById("search")
.addEventListener("input", e=>{

    const value =
        e.target.value.toLowerCase();

    const filtered =
        allBeats.filter(beat=>

            beat.title.toLowerCase().includes(value)

            ||

            beat.artist.toLowerCase().includes(value)

            ||

            beat.genre.toLowerCase().includes(value)

        );

    renderBeats(filtered);

});