let currentPlayer = null;

let currentButton = null;

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