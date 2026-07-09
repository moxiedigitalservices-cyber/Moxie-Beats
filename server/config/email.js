const { Resend } = require("resend");

const resend = new Resend(
    process.env.RESEND_API_KEY
);


async function sendDownloadEmail(
    email,
    downloadUrl,
    beats
){

    try {

        const result = await resend.emails.send({

            from: process.env.EMAIL_FROM,

            to: email,

            subject:
            "Your Moxxie Digital Beat Purchase",

            html:`

            <h2>Thank you for your purchase!</h2>

            <p>
                Your beats are ready.
            </p>

            <p>
                Click below to download:
            </p>

            <a 
href="${downloadUrl}"
style="
display:inline-block;
padding:12px 25px;
background:#00d084;
color:#111;
text-decoration:none;
border-radius:8px;
font-weight:bold;
">
Download Beats
</a>


            <h3>Your Purchase:</h3>

            <ul>

            ${
                beats.map(beat =>
                    `<li>${beat.title}</li>`
                ).join("")
            }

            </ul>

            `

        });


        console.log(
            "📧 Download email sent"
        );

        console.log(result);


    } catch(error){

        console.error(
            "Email error:",
            error
        );

    }

}


module.exports = sendDownloadEmail;