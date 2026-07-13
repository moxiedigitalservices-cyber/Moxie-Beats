// ==========================================
// BEATS MANAGER
// ==========================================

let editingBeatId = null;
let beatsCache = [];

async function loadBeats(){


    try{


        const beats = await api.get(

            "/beats"

        );

        beatsCache = beats;

        renderBeatsPage(

            beats

        );


    }


    catch(error){


        console.error(

            "Loading beats failed:",

            error

        );


    }


}





function renderBeatsPage(beats){


    const content = `


    <div class="page-header">


        <div>

            <h1>
                Beats
            </h1>

            <p>
                Manage your beat inventory
            </p>

        </div>



        <button 
            class="primary-btn"
            onclick="openBeatModal()">

            + Add Beat

        </button>


    </div>





    <div class="panel">


        <div class="table-wrapper">


        <table class="admin-table">


        <thead>

        <tr>

            <th>
                Title
            </th>

            <th>
                Artist
            </th>

            <th>
                Price
            </th>

            <th>
                Featured
            </th>

            <th>
                Actions
            </th>

        </tr>

        </thead>



        <tbody>


        ${
        beats.map(beat=>`

            <tr>


                <td>
                    ${beat.title}
                </td>


                <td>
                    ${beat.artist}
                </td>


                <td>

                    $${(
                        beat.price / 100
                    ).toFixed(2)}

                </td>


                <td>

                    ${
                        beat.isFeatured
                        ? "✅"
                        : "❌"
                    }

                </td>


                <td>

                    <button
                        class="small-btn"
                        onclick="openBeatModal('${beat._id}')">

                        Edit

                    </button>


                    <button
                        class="danger-btn"
                        onclick="deleteBeat('${beat._id}')">

                        Delete

                    </button>


                </td>


            </tr>

            

            `).join("")

        }


        </tbody>


        </table>


        </div>


        </div>



    <div id="beat-modal" class="modal">


        <div class="modal-card">


            <h2>
                Add New Beat
            </h2>


            ${beatFormHTML()}


            <div class="modal-actions">


                <button 
                class="primary-btn"
                onclick="saveBeat()">

                    Save

                </button>


                <button 
                class="small-btn"
                onclick="closeBeatModal()">

                    Cancel

                </button>


            </div>


        </div>


    </div>



    `;



    renderLayout(

        "Beats",

        content

    );


}





loadBeats();

function beatFormHTML(){

    return `

        <input id="beat-title" placeholder="Beat Title">

        <input id="beat-artist" placeholder="Artist">

        <input id="beat-producer" placeholder="Producer">

        <div class="form-row">

            <input id="beat-genre" placeholder="Genre">

            <input id="beat-subgenre" placeholder="Sub Genre">

        </div>

        <div class="form-row">

            <input id="beat-bpm" type="number" placeholder="BPM">

            <input id="beat-key" placeholder="Key">

        </div>

        <input id="beat-mood" placeholder="Mood">

        <input id="beat-price" type="number" step="0.01" placeholder="Price ($)">

        <input id="beat-cover" placeholder="Cover Art URL">

        <input id="beat-preview" placeholder="Preview URL">

        <input id="beat-full" placeholder="Full Beat URL">

        <textarea
            id="beat-description"
            placeholder="Beat Description"
            rows="4"></textarea>

        <input
            id="beat-tags"
            placeholder="Tags (comma separated)">

<div class="checkbox-row">

    <label>

        <input
        type="checkbox"
        id="beat-featured">

        Featured

    </label>


    <label>

        <input
        type="checkbox"
        id="beat-published"
        checked>

        Published

    </label>

</div>

    `;

}

// ==========================================
// BEAT MODAL
// ==========================================


function openBeatModal(id = null){

    document
        .getElementById("beat-modal")
        .style.display = "flex";


    if(id){

        const beat = beatsCache.find(b => b._id === id);

        editingBeatId = id;

        document.getElementById("beat-title").value = beat.title || "";
        document.getElementById("beat-artist").value = beat.artist || "";
        document.getElementById("beat-producer").value = beat.producer || "";
        
        document.getElementById("beat-genre").value = beat.genre || "";
        document.getElementById("beat-subgenre").value = beat.subGenre || "";
        
        document.getElementById("beat-bpm").value = beat.bpm || "";
        document.getElementById("beat-key").value = beat.key || "";
        
        document.getElementById("beat-mood").value = beat.mood || "";
        
        document.getElementById("beat-price").value =
        beat.price
        ? (beat.price / 100).toFixed(2)
        : "";
        
        document.getElementById("beat-cover").value = beat.coverArt || "";
        
        document.getElementById("beat-preview").value = beat.previewUrl || "";
        document.getElementById("beat-full").value = beat.fullUrl || "";
        
        document.getElementById("beat-description").value =
            beat.description || "";
        
        document.getElementById("beat-tags").value =
            (beat.tags || []).join(", ");
        
            document.getElementById("beat-featured").checked =
            !!beat.isFeatured;
        
        document.getElementById("beat-published").checked =
            beat.isPublished !== false;

        document.querySelector("#beat-modal h2").textContent =
            "Edit Beat";

    }else{

        editingBeatId = null;

        document.getElementById("beat-title").value = "";
        document.getElementById("beat-artist").value = "";
        document.getElementById("beat-price").value = "";
        document.getElementById("beat-preview").value = "";
        document.getElementById("beat-full").value = "";
        document.getElementById("beat-featured").checked = false;
        document.getElementById("beat-producer").value = "";
        document.getElementById("beat-genre").value = "";
        document.getElementById("beat-subgenre").value = "";
        document.getElementById("beat-bpm").value = "";
        document.getElementById("beat-key").value = "";
        document.getElementById("beat-mood").value = "";
        document.getElementById("beat-cover").value = "";
        document.getElementById("beat-description").value = "";
        document.getElementById("beat-tags").value = "";
        document.getElementById("beat-published").checked = true;
        

        document.querySelector("#beat-modal h2").textContent =
            "Add New Beat";

    }

}



function closeBeatModal(){

    editingBeatId = null;

    document
        .getElementById("beat-modal")
        .style.display = "none";

}




async function saveBeat(){

    const beat = {

        title:
        document.getElementById("beat-title").value,

        artist:
        document.getElementById("beat-artist").value,

        price:
        Math.round(
            Number(
                document.getElementById("beat-price").value
            ) * 100
        ),

        previewUrl:
        document.getElementById("beat-preview").value,

        fullUrl:
        document.getElementById("beat-full").value,

        isFeatured:
        document.getElementById("beat-featured").checked,

        producer:
        document.getElementById("beat-producer").value,
        
        genre:
        document.getElementById("beat-genre").value,
        
        subGenre:
        document.getElementById("beat-subgenre").value,
        
        bpm:
        Number(document.getElementById("beat-bpm").value),
        
        key:
        document.getElementById("beat-key").value,
        
        mood:
        document.getElementById("beat-mood").value,
        
        coverArt:
        document.getElementById("beat-cover").value,
        
        description:
        document.getElementById("beat-description").value,
        
        tags:
        document.getElementById("beat-tags")
        .value
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
        
        isPublished:
        document.getElementById("beat-published").checked

    };


    try{

        if(editingBeatId){

            await api.put(

                "/admin/beats/" + editingBeatId,

                beat

            );

            alert(
                "Beat updated successfully"
            );

        }

        else{

            await api.post(

                "/admin/beats",

                beat

            );

            alert(
                "Beat added successfully"
            );

        }


        closeBeatModal();

        loadBeats();


    }

    catch(error){

        console.error(error);

        alert(
            "Failed to save beat"
        );

    }

}

async function deleteBeat(id){

    const confirmed = confirm(

        "Delete this beat?\n\nThis cannot be undone."

    );

    if(!confirmed){

        return;

    }


    try{

        await api.delete(

            "/admin/beats/" + id

        );

        alert(

            "Beat deleted successfully"

        );

        loadBeats();

    }

    catch(error){

        console.error(error);

        alert(

            "Failed to delete beat"

        );

    }

}