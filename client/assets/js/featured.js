let allBeats = [];

let currentPlayer = null;
let currentButton = null;

async function loadBeats() {

    const res = await fetch(`${API_URL}/beats?featured=true`);
    allBeats = await res.json();

    const container = document.getElementById("beats-container");

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

    const container = document.getElementById("beats-container");

    container.innerHTML = "";

    beats.forEach(beat=>{

        const cover =
            beat.coverImage && beat.coverImage.trim() !== ""
                ? beat.coverImage
                : "assets/images/moxxie-logo.png";

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

    <div class="wave-player">

    <button class="play-btn" data-id="${beat._id}">
        ▶
    </button>

    <div class="waveform-wrapper">

        <div
            class="waveform"
            id="wave-${beat._id}">
        </div>

    </div>

    <span
    class="time"
    id="time-${beat._id}">
    0:00 / 0:00
</span>

</div>

<button onclick="addToCart('${beat._id}')">
    Add To Cart
</button>

            </div>

        </div>
        `;

    });

    setTimeout(() => {
        initializePlayers(beats);
    }, 100);

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

function formatTime(seconds){

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2,"0")}`;

}

function initializePlayers(beats){

    beats.forEach(beat=>{

        const waveform =
            document.getElementById(`wave-${beat._id}`);

        if(!waveform) return;


        const wavesurfer = WaveSurfer.create({

            container: waveform,
        
            waveColor: "#555",
        
            progressColor: "#00d084",
        
            cursorColor: "#00d084",
        
            cursorWidth: 2,
        
            height: 36,
        
            barWidth: 3,
        
            barGap: 2,
        
            barRadius: 3
        
        });
        
        wavesurfer.load(beat.previewUrl);

        wavesurfer.on("ready", () => {

            const duration = wavesurfer.getDuration();
        
            time.textContent =
                `0:00 / ${formatTime(duration)}`;
        
        });


        const button =
            document.querySelector(
                `.play-btn[data-id="${beat._id}"]`
            );

            const time = document.getElementById(`time-${beat._id}`);

        if(!button) return;

        button.onclick = ()=>{

            // Pause the currently playing beat
            if(currentPlayer && currentPlayer !== wavesurfer){
        
                currentPlayer.pause();
        
            }
        
            currentPlayer = wavesurfer;
            currentButton = button;
        
            wavesurfer.playPause();
        
        };
        
        wavesurfer.on("play", ()=>{

            button.textContent = "❚❚";
        
        });
        
        wavesurfer.on("pause", ()=>{
        
            button.textContent = "▶";
        
        });
        
        wavesurfer.on("finish", () => {

            button.textContent = "▶";
        
            const duration = wavesurfer.getDuration();
        
            time.textContent =
                `0:00 / ${formatTime(duration)}`;
        
            if(currentPlayer === wavesurfer){
        
                currentPlayer = null;
                currentButton = null;
        
            }
        
        });

        wavesurfer.on("timeupdate", (currentTime) => {

            const duration = wavesurfer.getDuration();
        
            time.textContent =
                `${formatTime(currentTime)} / ${formatTime(duration)}`;
        
        });


    });

}