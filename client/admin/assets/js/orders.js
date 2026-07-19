let allOrders = [];

async function loadOrders(){

    try{

        allOrders = await api.get("/admin/orders");

        renderOrders();

    }

    catch(error){

        console.error(error);

    }

}


function renderOrders(){

    if(!allOrders.length){

        renderLayout(

            "Orders",

            `

            <div class="empty-state">

                <h2>No orders yet</h2>

                <p>

                    Orders will appear here after customers complete checkout.

                </p>

            </div>

            `

        );

        return;

    }


    renderLayout(

        "Orders",

        `

        <div class="page-header">

            <h1>Orders</h1>

            <div class="page-actions">

                <input
                    id="order-search"
                    class="search-input"
                    type="text"
                    placeholder="Search customer email...">

                <select
                    id="status-filter"
                    class="filter-select">

                    <option value="all">All</option>

                    <option value="paid">Paid</option>

                    <option value="pending">Pending</option>

                    <option value="failed">Failed</option>

                </select>

            </div>

        </div>


        <div class="panel">

            <table class="admin-table">

                <thead>

                    <tr>

                        <th>Customer</th>

                        <th>Beat(s)</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody id="orders-body"></tbody>

            </table>

        </div>

        `

    );


    renderOrderRows(allOrders);


    document
    .getElementById("order-search")
    .addEventListener("input", filterOrders);


    document
    .getElementById("status-filter")
    .addEventListener("change", filterOrders);

}



function renderOrderRows(orders){

    const tbody =
    document.getElementById("orders-body");

    if(!tbody) return;


    if(!orders.length){

        tbody.innerHTML = `

        <tr>

            <td colspan="5" class="no-results">

                No matching orders found.

            </td>

        </tr>

        `;

        return;

    }


    tbody.innerHTML =
    orders.map(order=>`

        <tr class="order-row" data-id="${order._id}">

            <td>${order.customerEmail}</td>

            <td>

                ${(order.beats || [])

                    .map(beat=>beat.title)

                    .join(", ")}

            </td>

            <td>

                $${(order.total/100).toFixed(2)}

            </td>

            <td>

                <span class="status ${order.status}">

                    ${order.status}

                </span>

            </td>

            <td>

                ${new Date(order.createdAt)

                    .toLocaleDateString()}

            </td>

        </tr>

    `).join("");


    document
    .querySelectorAll(".order-row")
    .forEach(row=>{

        row.addEventListener("click", ()=>{

            const id = row.dataset.id;

            openOrderModal(id);

        });

    });

}



function filterOrders(){

    const search =
    document
    .getElementById("order-search")
    .value
    .toLowerCase();


    const status =
    document
    .getElementById("status-filter")
    .value;


    const filtered =
    allOrders.filter(order=>{

        const matchesSearch =

            (order.customerEmail || "")

            .toLowerCase()

            .includes(search);


        const matchesStatus =

            status === "all"

            ||

            order.status === status;


        return matchesSearch && matchesStatus;

    });


    renderOrderRows(filtered);

}



function openOrderModal(id){

    const order =
    allOrders.find(

        o=>o._id===id

    );


    if(!order) return;


    alert(

`Customer: ${order.customerEmail}

Amount: $${(order.total/100).toFixed(2)}

Status: ${order.status}

Purchased:

${(order.beats || [])

.map(beat=>"- "+beat.title)

.join("\n")}`

    );

}



loadOrders();