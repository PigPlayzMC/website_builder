const construction_window = document.getElementById("const_window");
const hammer = document.getElementById("hammer");

let mouse_x = 0;
let mouse_y = 0;

let construction_x = 0;
let construction_y = 0;

let relative_mouse_x = 0;
let relative_mouse_y = 0;

let current_action = "none";
let adding = "none";
let history = ["", "", "", "", "", "", "", "", "", ""]; // 10 item list, including current action, located at history[0]

const default_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const insert_before = document.getElementById("insert_before");

let text_boxes_id = [];
let text_box_id_number = 0;

let components = [];
let component = { // Example values, do not use
    id: "EX0",
    content: "!Hola, soy Example Data!", // Could be text or a file or a secret 3rd thing (Might even update this)
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    z_index: 0, // This one *can* actually be left by default.
}

function size() {
    console.log("Window resize detected...");

    const view_width = window.innerWidth;
    const construction_width = view_width * 0.8;

    const percentage_of_normal = construction_width / 1920;
    const construction_height = 1080 * percentage_of_normal;

    const construction_window = document.getElementById("const_window");

    construction_window.style.width = construction_width + "px";
    console.log("Construction width set to " + construction_width + "px");
    construction_window.style.height = construction_height + "px";
    console.log("Construction height set to " + construction_height + "px");

    if (construction_height > window.innerHeight) {
        console.warn("Window height limit reduced beyond minima.");
        alert("The construction window displays at a constant aspect ratio. Please increase the height of the browser window.");
    }

    construction_x = construction_window.offsetLeft;
    construction_y = construction_window.offsetTop;
};

function formatting(style) {
    if (style == 1) {
        // Creating
        construction_window.style.borderColor = "rgba(74, 255, 68, 1)";
        hammer.style.display = "block";
    } else if (style == 2) {
        // Deleting
        construction_window.style.borderColor = "rgba(255, 68, 68, 1)";
        hammer.style.display = "block";
    } else {
        // Idle
        construction_window.style.borderColor = "rgba(0, 0, 0, 1)";
        hammer.style.display = "none";
    }
};

function updateCoords(event) {
    mouse_x = event.pageX;
    mouse_y = event.pageY;

    relative_mouse_x = mouse_x - construction_x;
    relative_mouse_y = mouse_y - construction_y;

    ////console.log("[Absolute] x: " + mouse_x + ", y: " + mouse_y);
    ////console.log("[Relative] x: " + relative_mouse_x + ", y: " + relative_mouse_y);
};

function updateHistory(action) {
    // Applied on a taken action, not when the current action is updated.
    // ie: when a text box is actually added, not when the button is clicked.
    history.pop();
    history.unshift(action);
};

// Adding functions
function addTextBox(text, insert_before, id, mouse_x, mouse_y) {
    const default_textbox = document.createElement("div");
    const default_text = document.createTextNode(text)

    default_textbox.appendChild(default_text);

    default_textbox.setAttribute("id", "TB" + id);

    default_textbox.className = "comp_text_box";

    construction_window.insertBefore(default_textbox, insert_before);

    console.log("Textbox with id: TB" + id +" created!");
};

function addComponent(current_action) {
    console.log("CW: Click registered!");
    if (current_action == "addd") {
        if (adding == "text") {
            // Get ID for new textbox
            text_box_id_number = text_box_id_number + 1;

            // Add text box
            addTextBox(default_text, insert_before, text_box_id_number, 0, 0);
            text_boxes_id.push("TB" + text_box_id_number);

            // Update history
        }
    } else if (current_action == "remo") {
        // Find components overlapping

        // Find highest z index

        // Remove this component
        
        // Update history
    } else {
        // Get components present
    }
};

construction_window.addEventListener("mousemove", updateCoords, false);
construction_window.addEventListener("mouseenter", updateCoords, false);
construction_window.addEventListener("mouseleave", updateCoords, false);

construction_window.addEventListener("click", function() {
    addComponent(current_action);
});

size();

window.addEventListener('resize', function() {
    size();
});

window.addEventListener('text', function() {
    console.log("Creating new text box...");
    current_action = "addd"; // Had to be four letters _/\o.o/\_ Don't blame me, I make the rules but am not taking criticism.
    adding = "text";
    formatting(1);
});

window.addEventListener('none', function() {
    console.log("Deselecting current object...");
    current_action = "none";
    formatting(0);
});

window.addEventListener('remo', function() {
    console.log("Removing objects...");
    current_action = "remo";
    formatting(2);
})

//! DEBUG PWEASE WEMOVE
addTextBox("DEBUG " + default_text, insert_before, text_box_id_number, 0, 0);