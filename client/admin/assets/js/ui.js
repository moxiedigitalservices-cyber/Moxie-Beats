// ============================================
// MOXXIE DIGITAL UI LIBRARY
// ui.js
// ============================================

const UI = {};

UI.Button = function({

    text,

    icon = "",

    type = "primary",

    id = "",

    onclick = ""

}){

    return `

        <button

            id="${id}"

            class="btn btn-${type}"

            ${onclick ? `onclick="${onclick}"` : ""}

        >

            ${icon}

            <span>

                ${text}

            </span>

        </button>

    `;

};

UI.Card = function(content){

    return `

        <div class="ui-card">

            ${content}

        </div>

    `;

};

UI.Section = function(

    title,

    content,

    button = ""

){

    return `

        <section class="ui-section">

            <div class="ui-section-header">

                <h2>

                    ${title}

                </h2>

                ${button}

            </div>

            ${content}

        </section>

    `;

};

UI.Badge = function(status){

    const colours = {

        paid:"green",

        pending:"orange",

        failed:"red",

        published:"green",

        draft:"grey"

    };

    return `

        <span

            class="badge badge-${

                colours[status.toLowerCase()]

                ||

                "grey"

            }"

        >

            ${status}

        </span>

    `;

};

UI.Empty = function(

    icon,

    title,

    text

){

    return `

        <div class="empty">

            <div class="empty-icon">

                ${icon}

            </div>

            <h3>

                ${title}

            </h3>

            <p>

                ${text}

            </p>

        </div>

    `;

};

UI.Loader = function(){

    return `

        <div class="loader">

            <div class="spinner"></div>

            <p>

                Loading...

            </p>

        </div>

    `;

};

UI.Divider = function(){

    return `

        <hr class="divider">

    `;

};

UI.PageTitle = function(

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

};

// ============================================
// INPUT
// ============================================

UI.Input = function({

    id = "",

    type = "text",

    label = "",

    placeholder = "",

    value = ""

}){

    return `

        <div class="form-group">

            ${

                label

                ?

                `<label for="${id}">${label}</label>`

                :

                ""

            }

            <input

                id="${id}"

                type="${type}"

                class="ui-input"

                placeholder="${placeholder}"

                value="${value}"

            >

        </div>

    `;

};

UI.Select = function({

    id = "",

    label = "",

    options = []

}){

    return `

        <div class="form-group">

            ${

                label

                ?

                `<label for="${id}">${label}</label>`

                :

                ""

            }

            <select

                id="${id}"

                class="ui-select"

            >

                ${

                    options.map(option =>

                        `

                        <option>

                            ${option}

                        </option>

                        `

                    ).join("")

                }

            </select>

        </div>

    `;

};

UI.Table = function({

    headers,

    rows

}){

    return `

        <table class="ui-table">

            <thead>

                <tr>

                    ${

                        headers.map(header =>

                            `<th>${header}</th>`

                        ).join("")

                    }

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    `;

};

UI.Modal = function({

    id,

    title,

    body,

    footer = ""

}){

    return `

        <div

            class="modal"

            id="${id}"

        >

            <div class="modal-content">

                <div class="modal-header">

                    <h2>

                        ${title}

                    </h2>

                    <button

                        class="modal-close"

                        data-close="${id}"

                    >

                        ×

                    </button>

                </div>

                <div class="modal-body">

                    ${body}

                </div>

                <div class="modal-footer">

                    ${footer}

                </div>

            </div>

        </div>

    `;

};

UI.Toast = {

    show(message, type = "success"){

        const container =
            document.getElementById("toast-container");

        if(!container) return;

        const toast =
            document.createElement("div");

        toast.className =
            `toast ${type}`;

        toast.textContent =
            message;

        container.appendChild(toast);

        requestAnimationFrame(()=>{

            toast.classList.add("show");

        });

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },3000);

    },

    success(message){

        this.show(message,"success");

    },

    error(message){

        this.show(message,"error");

    },

    warning(message){

        this.show(message,"warning");

    },

    info(message){

        this.show(message,"info");

    }

};

UI.Confirm = function(message){

    return confirm(message);

};

UI.Currency = function(amount){

    return "$" +

    Number(amount)

    .toLocaleString(

        undefined,

        {

            minimumFractionDigits:2,

            maximumFractionDigits:2

        }

    );

};

UI.Date = function(date){

    return new Date(date)

    .toLocaleDateString();

};

UI.Number = function(number){

    return Number(number)

    .toLocaleString();

};

window.UI = UI;