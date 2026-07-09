const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendDownloadEmail(
    email,
    downloadUrl,
    beats
) {

    try {

        const result = await resend.emails.send({

            from: process.env.EMAIL_FROM,

            to: email,

            subject: "Your Moxxie Digital Beat Purchase",

            html: `
                <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:30px;background:#111;color:#fff;border-radius:10px;">

                    <h1 style="color:#00d084;">
                        🎵 Moxxie Digital
                    </h1>

                    <p>
                        Thank you for your purchase.
                    </p>

                    <p>
                        Your payment has been confirmed.
                    </p>

                    <h3>Your Purchase</h3>

                    <ul>
                        ${beats.map(beat => `<li>${beat.title}</li>`).join("")}
                    </ul>

                    <p>
                        Click below to download your beat.
                    </p>

                    <p>

                        <a
                            href="${downloadUrl}"
                            style="
                                display:inline-block;
                                padding:14px 28px;
                                background:#00d084;
                                color:#111;
                                text-decoration:none;
                                font-weight:bold;
                                border-radius:8px;
                            "
                        >
                            Download Beat
                        </a>

                    </p>

                    <hr>

                    <p style="font-size:13px;color:#bbb;">
                        Thank you for supporting independent producers.
                    </p>

                </div>
            `

        });

        if (result.error) {

            console.error(result.error);

            return false;

        }

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

module.exports = sendDownloadEmail;