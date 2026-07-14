let allBeats = [];

const container =
document.getElementById("beats-container");


async function loadBeats(){

    const res =
    await fetch(`${API_URL}/beats?featured=true`);

    allBeats =
    await res.json();

    renderBeats(allBeats);

}


function renderBeats(beats){

    container.innerHTML = "";

    beats.forEach(beat=>{

        container.innerHTML +=
        createBeatCard(beat);

    });

    setTimeout(()=>{

        initializePlayers(beats);

    },100);

}


document.addEventListener("DOMContentLoaded", ()=>{

    updateCartCount();

});


loadBeats();