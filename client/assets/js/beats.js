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