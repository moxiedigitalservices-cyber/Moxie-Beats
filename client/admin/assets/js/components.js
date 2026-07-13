// ==========================================
// MOXXIE DIGITAL ADMIN COMPONENTS
// components.js
// ==========================================

const navigationItems = [
    {
        title: "Dashboard",
        icon: "📊",
        page: "index.html"
    },
    {
        title: "Beats",
        icon: "🎵",
        page: "beats.html"
    },
    {
        title: "Orders",
        icon: "📦",
        page: "orders.html"
    },
    {
        title: "Customers",
        icon: "👥",
        page: "customers.html"
    },
    {
        title: "Analytics",
        icon: "📈",
        page: "analytics.html"
    },
    {
        title: "Settings",
        icon: "⚙️",
        page: "settings.html"
    }
];

function getCurrentPage() {

    const path = window.location.pathname;

    return path.substring(path.lastIndexOf("/") + 1);

}

function renderSidebar() {

    const currentPage = getCurrentPage();

    let links = "";

    navigationItems.forEach(item => {

        const active =
            currentPage === item.page
                ? "active"
                : "";

        links += `

        <a
            href="${item.page}"
            class="sidebar-link ${active}"
        >

            <span class="icon">
                ${item.icon}
            </span>

            <span>
                ${item.title}
            </span>

        </a>

        `;

    });

    return `

    <aside class="sidebar">

        <div class="sidebar-logo">

            <h2>MOXXIE</h2>

            <p>Digital CMS</p>

        </div>

        <nav class="sidebar-nav">

            ${links}

        </nav>

        <div class="sidebar-footer">

            <button
                id="logout-btn"
                class="logout-btn"
            >

                🚪 Logout

            </button>

        </div>

    </aside>

    `;

}

// ==========================================
// TOPBAR
// ==========================================

function renderTopbar(title = "Dashboard") {

    return `

    <header class="topbar">

        <div class="topbar-left">

            <button
                class="menu-toggle"
                id="menu-toggle"
            >

                ☰

            </button>

            <h1>${title}</h1>

        </div>

        <div class="topbar-right">

            <button
                class="notification-btn"
                title="Notifications"
            >

                🔔

            </button>

            <div class="admin-profile">

                <div class="avatar">

                    M

                </div>

                <div>

                    <h4>Administrator</h4>

                    <small>Moxxie Digital</small>

                </div>

            </div>

        </div>

    </header>

    `;

}

// ==========================================
// MAIN LAYOUT
// ==========================================

function renderLayout(title, content) {

    document.body.innerHTML = `

    <div class="admin-layout">

        ${renderSidebar()}

        <main class="main-content">

            ${renderTopbar(title)}

            <section class="page-content">

                ${content}

            </section>

        </main>

    </div>

    `;

    initializeSidebar();

}

// ==========================================
// SIDEBAR EVENTS
// ==========================================

function initializeSidebar() {

    const menuButton =
        document.getElementById("menu-toggle");

    const sidebar =
        document.querySelector(".sidebar");

    if(menuButton){

        menuButton.addEventListener(
            "click",

            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }

        );

    }

}

// ==========================================
// LOGOUT
// ==========================================

document.addEventListener(

    "click",

    function(e){

        if(

            e.target.id === "logout-btn"

        ){

            if(

                confirm("Log out of Moxxie Digital?")

            ){

                window.location.href =
                    "login.html";

            }

        }

    }

);

// ==========================================
// UI COMPONENTS
// ==========================================

function createStatCard({

    title,

    value,

    icon,

    color = "#00D084",

    change = ""

}){

    return `

    <div class="stat-card">

        <div class="stat-top">

            <div
                class="stat-icon"
                style="background:${color};"
            >

                ${icon}

            </div>

        </div>

        <h3>${value}</h3>

        <p>${title}</p>

        ${
            change
            ?

            `<small class="stat-change">

                ${change}

            </small>`

            :

            ""

        }

    </div>

    `;

}

function createSectionHeader(

    title,

    buttonText = "",

    buttonId = ""

){

    return `

    <div class="section-header">

        <h2>

            ${title}

        </h2>

        ${

            buttonText

            ?

            `

            <button

                class="primary-btn"

                id="${buttonId}"

            >

                ${buttonText}

            </button>

            `

            :

            ""

        }

    </div>

    `;

}

function createStatusBadge(status){

    const color = {

        paid:"#00D084",

        pending:"#F59E0B",

        failed:"#EF4444"

    };

    return `

    <span

        class="status-badge"

        style="background:${

            color[status.toLowerCase()]

            ||

            "#666"

        };"

    >

        ${status}

    </span>

    `;

}

function createEmptyState(

    title,

    subtitle

){

    return `

    <div class="empty-state">

        <div class="empty-icon">

            📂

        </div>

        <h3>

            ${title}

        </h3>

        <p>

            ${subtitle}

        </p>

    </div>

    `;

}

function createLoader(){

    return `

    <div class="loader">

        <div class="spinner">

        </div>

        <p>

            Loading...

        </p>

    </div>

    `;

}

function createCard(content){

    return `

    <div class="admin-card">

        ${content}

    </div>

    `;

}

function createPageTitle(

    title,

    subtitle

){

    return `

    <div class="page-title">

        <h2>

            ${title}

        </h2>

        <p>

            ${subtitle}

        </p>

    </div>

    `;

}

// ==========================================
// UTILITIES
// ==========================================

function formatMoney(amount){

    return "$" +

    Number(amount)

    .toLocaleString(

        undefined,

        {

            minimumFractionDigits:2,

            maximumFractionDigits:2

        }

    );

}

function formatDate(date){

    return new Date(date)

    .toLocaleDateString();

}

window.renderLayout = renderLayout;

// ==========================================
// ADMIN SIDEBAR
// ==========================================

function createSidebar(){

    const currentPage= window.location.pathname;

    return `

    <aside class="sidebar">

        <div>


            <div class="sidebar-logo">

                <h2>
                    MOXIE
                </h2>

                <p>
                    Digital Admin
                </p>

            </div>


            <nav class="sidebar-nav">


                <a class="sidebar-link ${currentPage.endsWith("/admin/") ? "active" : ""}" href="/admin/">

                    <span class="icon">
                        🏠
                    </span>

                    Dashboard

                </a>


                <a class="sidebar-link ${currentPage.includes("beats.html") ? "active" : ""}" href="beats.html">

                    <span class="icon">
                        🎵
                    </span>

                    Beats

                </a>


                <a class="sidebar-link ${currentPage.includes("orders.html") ? "active" : ""}" href="orders.html">

                    <span class="icon">
                        📦
                    </span>

                    Orders

                </a>


                <a class="sidebar-link ${currentPage.includes("customers.html") ? "active" : ""}" href="customers.html">

                    <span class="icon">
                        👥
                    </span>

                    Customers

                </a>


                <a class="sidebar-link ${currentPage.includes("analytics.html") ? "active" : ""}" href="analytics.html">

                    <span class="icon">
                        📈
                    </span>

                    Analytics

                </a>


                <a class="sidebar-link ${currentPage.includes("settings.html") ? "active" : ""}" href="settings.html">

                    <span class="icon">
                        ⚙️
                    </span>

                    Settings

                </a>


            </nav>


        </div>



        <div class="sidebar-footer">

            <button
    class="logout-btn"
    onclick="logout()">

    Logout

</button>

        </div>


    </aside>

    `;

}

function logout(){

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if(!confirmLogout){

        return;

    }

    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminUser");

    window.location.href = "login.html";

}


// ==========================================
// TOPBAR
// ==========================================

function createTopbar(title){


    return `


    <header class="topbar">


        <div class="topbar-left">


            <button class="menu-toggle">

                ☰

            </button>


            <h2>

                ${title}

            </h2>


        </div>



        <div class="topbar-right">


            <button class="notification-btn">

                🔔

            </button>


            <div class="admin-profile">


                <div class="avatar">

                    M

                </div>


                <small>

                    Admin

                </small>


            </div>


        </div>


    </header>


    `;


}




// ==========================================
// PAGE LAYOUT
// ==========================================

function renderLayout(title, content){


    document.getElementById("app").innerHTML = `


    <div class="admin-layout">


        ${createSidebar()}


        <div class="main-content">


            ${createTopbar(title)}


            <main class="page-content">

                ${content}

            </main>


        </div>


    </div>


    `;


}

window.createSidebar = createSidebar;

window.createTopbar = createTopbar;