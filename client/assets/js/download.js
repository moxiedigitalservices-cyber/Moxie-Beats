const params = new URLSearchParams(window.location.search);

const token = params.get("token");

const container =
document.getElementById("downloads-container");

if(!token){

    container.innerHTML = `
        <p>Invalid download link.</p>
    `;

}else{

fetch(
`http://localhost:5000/api/download/${token}`
)

.then(res=>res.json())

.then(data=>{

    if(!data.downloads){

        container.innerHTML=`
            <p>
                Download unavailable.
            </p>
        `;

        return;

    }


container.innerHTML="";


data.downloads.forEach(beat=>{

container.innerHTML+=`

<div class="beat-card">

<div class="beat-info">

<h2>${beat.title}</h2>

<p class="artist">
${beat.artist}
</p>

<a
class="download-button"
href="${beat.url}"
download>

⬇ Download MP3

</a>

</div>

</div>

`;

});

})

.catch(()=>{

container.innerHTML=`
<p>
Unable to load downloads.
</p>
`;

});

}