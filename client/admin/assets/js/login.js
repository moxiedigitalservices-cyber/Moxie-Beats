// ==========================================
// ADMIN LOGIN
// ==========================================


const loginForm = document.getElementById(
    "login-form"
);



loginForm.addEventListener(
    "submit",
    async function(e){


        e.preventDefault();



        const username =
        document.getElementById(
            "username"
        ).value;



        const password =
        document.getElementById(
            "password"
        ).value;



        const message =
        document.getElementById(
            "login-message"
        );



        try{


            const response = await fetch(

                "/api/auth/login",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },

                    body:JSON.stringify({

                        username,

                        password

                    })

                }

            );



            const data =
            await response.json();



            if(!response.ok){

                throw new Error(

                    data.message ||
                    "Login failed"

                );

            }



            localStorage.setItem(

                "adminToken",

                data.token

            );



            localStorage.setItem(

                "adminUser",

                JSON.stringify(
                    data.admin
                )

            );



            window.location.href =
            "index.html";


        }


        catch(error){


            message.textContent =
            error.message;


        }


    }

);