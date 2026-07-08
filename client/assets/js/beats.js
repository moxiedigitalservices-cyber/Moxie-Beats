const container = document.getElementById("beats");

async function loadBeats(){

    const res = await fetch(`${API_URL}/beats`);

    const beats = await res.json();

    container.innerHTML = "";

    beats.forEach(beat=>{

        container.innerHTML+=`

        <div class="beat">

        <img
        src="${
            beat.artwork ||
            "assets/images/moxxie-logo.png"
        }">

        <div class="info">

        ${
            beat.isFeatured
            ?
            '<span class="featured">FEATURED</span>'
            :
            ''
        }

        <h3>${beat.title}</h3>

        <p>${beat.artist}</p>

        <p>$${(beat.price/100).toFixed(2)}</p>

        <div class="actions">

        <button>Edit</button>

        <button class="delete">

        Delete

        </button>

        </div>

        </div>

        </div>

        `;

    });

}

loadBeats();