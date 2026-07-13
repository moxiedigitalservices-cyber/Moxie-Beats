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

async function loadAllBeats(){


    try{


        const beats =
        await api.get(
            "/beats"
        );


        renderBeats(
            beats
        );


    }


    catch(error){

        console.error(error);

    }


}




function renderBeats(beats){


    const container =
    document.getElementById(
        "beats-container"
    );


    container.innerHTML =


    beats.map(beat=>`


    <div class="beat-card">


        <img 
        src="${beat.coverArt}"
        >


        <h3>

            ${beat.title}

        </h3>


        <p>

            ${beat.artist}

        </p>

<div 
class="waveform"
id="wave-${beat._id}">
</div>

        <p>

            $${(
                beat.price/100
            ).toFixed(2)}

        </p>


        <button>

            Preview

        </button>


        <button>

            Add To Cart

        </button>


    </div>


    `).join("");


}

beats.forEach(beat=>{

    createWavePlayer(
        `wave-${beat._id}`,
        beat.previewUrl
    );

});

loadAllBeats();