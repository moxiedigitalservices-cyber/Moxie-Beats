// ==========================================
// ADMIN DASHBOARD
// ==========================================


async function loadDashboard(){


    try{


        const stats = await api.get(
            "/analytics/dashboard"
        );


        renderDashboard(stats);

        loadSalesChart();

    }


    catch(error){


        console.error(
            "Dashboard loading failed:",
            error
        );


    }


}




function renderDashboard(stats){


    const content = `

<div class="page-header">

    <div>

        <h1>Dashboard</h1>

        <p>Overview of your Moxxie Digital store</p>

    </div>

</div>


<div class="stats-grid">

    <div class="stat-card">

        <div class="stat-icon">💰</div>

        <div>

            <h3>Revenue</h3>

            <p>$${(stats.revenue / 100).toFixed(2)}</p>

        </div>

    </div>


    <div class="stat-card">

        <div class="stat-icon">📦</div>

        <div>

            <h3>Orders</h3>

            <p>${stats.totalOrders}</p>

        </div>

    </div>


    <div class="stat-card">

        <div class="stat-icon">🎵</div>

        <div>

            <h3>Beats</h3>

            <p>${stats.totalBeats}</p>

        </div>

    </div>


    <div class="stat-card">

        <div class="stat-icon">⭐</div>

        <div>

            <h3>Featured</h3>

            <p>${stats.featuredBeats}</p>

        </div>

    </div>

</div>



<div class="panel">

    <div class="panel-header">

        <h2>Revenue Overview</h2>

    </div>

    <canvas id="salesChart" height="120"></canvas>

</div>



<div class="panel">

    <div class="panel-header">

        <h2>Recent Orders</h2>

    </div>

    <table class="admin-table">

        <thead>

            <tr>

                <th>Customer</th>

                <th>Amount</th>

                <th>Method</th>

                <th>Status</th>

                <th>Date</th>

            </tr>

        </thead>

        <tbody>

            ${stats.recentOrders.map(order => `

                <tr>

                    <td>${order.customerEmail}</td>

                    <td>$${(order.total / 100).toFixed(2)}</td>

                    <td>${order.paymentMethod}</td>

                    <td>${order.status}</td>

                    <td>${new Date(order.createdAt).toLocaleDateString()}</td>

                </tr>

            `).join("")}

        </tbody>

    </table>

</div>



<div class="panel">

    <div class="panel-header">

        <h2>Top Selling Beats</h2>

    </div>

    <table class="admin-table">

        <thead>

            <tr>

                <th>Title</th>

                <th>Artist</th>

                <th>Sales</th>

                <th>Revenue</th>

            </tr>

        </thead>

        <tbody>

            ${stats.topBeats.map(item => `

                <tr>

                    <td>${item.beat.title}</td>

                    <td>${item.beat.artist}</td>

                    <td>${item.sales}</td>

                    <td>$${(item.revenue / 100).toFixed(2)}</td>

                </tr>

            `).join("")}

        </tbody>

    </table>

</div>

`;



    renderLayout(

        "Dashboard",

        content

    );


}

async function loadSalesChart(){

    try{

        const sales =
        await api.get(
            "/analytics/monthly-sales"
        );

        drawSalesChart(
            sales
        );

    }

    catch(error){

        console.error(error);

    }

}



function drawSalesChart(data){

    const canvas =
    document.getElementById(
        "salesChart"
    );

    if(!canvas){

        return;

    }


    const labels =
    data.map(item=>{

        return `${item._id.month}/${item._id.year}`;

    });


    const revenue =
    data.map(item=>{

        return item.revenue/100;

    });


    new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels,

                datasets:[

                    {

                        label:"Revenue ($)",

                        data:revenue,

                        tension:.35,

                        fill:false

                    }

                ]

            },

            options:{

                responsive:true,
            
                maintainAspectRatio:false,
            
                plugins:{
            
                    legend:{
                        display:true
                    }
            
                }
            
            }

        }

    );

}


loadDashboard();