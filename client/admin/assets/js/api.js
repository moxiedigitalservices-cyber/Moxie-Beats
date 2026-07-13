// ==========================================
// MOXXIE DIGITAL ADMIN API
// ==========================================


const API_URL = window.location.origin + "/api";



function authHeaders(){

    const token = 
    localStorage.getItem("adminToken");


    return {

        "Content-Type":"application/json",

        "Authorization":
        "Bearer " + token

    };

}




const api = {


    async get(endpoint){

        const response = await fetch(

            API_URL + endpoint,

            {

                headers: authHeaders()

            }

        );


        if(!response.ok){

            throw new Error(
                await response.text()
            );

        }


        return await response.json();

    },





    async post(endpoint,data){

        const response = await fetch(

            API_URL + endpoint,

            {

                method:"POST",

                headers: authHeaders(),

                body:JSON.stringify(data)

            }

        );


        if(!response.ok){

            throw new Error(
                await response.text()
            );

        }


        return await response.json();

    },





    async put(endpoint,data){

        const response = await fetch(

            API_URL + endpoint,

            {

                method:"PUT",

                headers: authHeaders(),

                body:JSON.stringify(data)

            }

        );


        if(!response.ok){

            throw new Error(
                await response.text()
            );

        }


        return await response.json();

    },





    async delete(endpoint){

        const response = await fetch(

            API_URL + endpoint,

            {

                method:"DELETE",

                headers: authHeaders()

            }

        );


        if(!response.ok){

            throw new Error(
                await response.text()
            );

        }


        return await response.json();

    }


};