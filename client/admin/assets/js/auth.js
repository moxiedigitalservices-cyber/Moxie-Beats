// ==========================================
// ADMIN AUTH GUARD
// ==========================================

(function(){

    const token = localStorage.getItem(
        "adminToken"
    );

    const page =
    window.location.pathname;

    const isLoginPage =
    page.endsWith("login.html");

    // No token → send to login
    if(!token && !isLoginPage){

        window.location.href =
        "login.html";

        return;

    }

    // Already logged in → don't show login page
    if(token && isLoginPage){

        window.location.href =
        "index.html";

    }

})();