// ==========================================
// MOXXIE CUSTOMER BEATS PAGE
// ==========================================


let allBeats = [];


const container =
document.getElementById(
    "beats-container"
);



async function loadAllBeats(){

    try{


        allBeats =
        await api.get(
            "/beats"
        );


        renderBeats(
            allBeats
        );


    }

    catch(error){

        console.error(
            "Loading beats failed:",
            error
        );

    }

}




function renderBeats(beats){


    container.innerHTML = "";

const count =
document.getElementById("results-count");

count.innerHTML =

`🎵 Showing <strong>${beats.length}</strong> premium beat${beats.length===1?"":"s"}`;

if(beats.length === 0){

    container.innerHTML = `

        <div class="empty-state">

            <h2>

                No beats found

            </h2>

            <p>

                Try searching by another title,
                artist or genre.

            </p>

        </div>

    `;

    return;

}


    beats.forEach(beat=>{


        container.innerHTML +=
        createBeatCard(beat);


    });



    setTimeout(()=>{


        initializePlayers(
            beats
        );


    },100);


}



loadAllBeats();

// ==========================================
// SEARCH
// ==========================================

const searchInput = document.getElementById("search");

if(searchInput){

    searchInput.addEventListener("input", e=>{

        const value = e.target.value
            .trim()
            .toLowerCase();

        const filtered = allBeats.filter(beat=>

            (beat.title || "")
                .toLowerCase()
                .includes(value)

            ||

            (beat.artist || "")
                .toLowerCase()
                .includes(value)

            ||

            (beat.genre || "")
                .toLowerCase()
                .includes(value)

            ||

            (beat.producer || "")
                .toLowerCase()
                .includes(value)

            ||

            (beat.mood || "")
                .toLowerCase()
                .includes(value)

            ||

            (beat.key || "")
                .toLowerCase()
                .includes(value)

        );

        renderBeats(filtered);

    });

}