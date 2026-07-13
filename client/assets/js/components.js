// ==========================================
// MOXXIE BEAT COMPONENTS
// ==========================================

function createBeatCard(beat){

    const cover =

        beat.coverImage &&
        beat.coverImage.trim() !== ""

            ? beat.coverImage

            : "assets/images/moxxie-logo.png";


    return `

    <div class="beat-card">

        <img
            class="beat-cover"
            src="${cover}"
            alt="${beat.title}">


        <div class="beat-info">


            ${
                beat.isFeatured

                ?

                `<span class="featured-badge">

                    FEATURED

                </span>`

                :

                ""

            }


            <h2>

                ${beat.title}

            </h2>


            <p class="artist">

                ${beat.artist}

            </p>


            <p class="meta">

                ${beat.genre || "Unknown Genre"}

                •

                ${beat.bpm || "--"} BPM

                •

                ${beat.key || "--"}

            </p>


            <h3>

                $${(beat.price / 100).toFixed(2)}

            </h3>



            <div class="wave-player">


                <button

                    class="play-btn"

                    data-id="${beat._id}">

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



            <button

                onclick="addToCart('${beat._id}')">

                Add To Cart

            </button>


        </div>

    </div>

    `;

}