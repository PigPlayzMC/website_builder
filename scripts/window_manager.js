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
let text_box_id_number = -1; // Added first so the initial value is 0

let components = [];
const component = { // Example values, do not use (I have just learnt this is completely irrelevant but oh well)
    id: "EX0",
    content: "!Hola, soy Example Data!", // Could be text or a file or a secret 3rd thing (Might even update this) [unused]
    class: "", //! This is depricated.
    x: 0,
    y: 0,
    width: 0,
    height: 0, // This may not be known when created
    z_index: 0, // This one *can* actually be left by default.
} //! Styling data depricated. Do not use, leaving because I don't know where it was used previously, if at all?!?

class TextboxStyle { // Following standards? Who knows, but the rest of the code isn't so I wouldn't worry...
    constructor(font_family, font_size, font_colour, background_colour, border_style, border_colour, border_width, border_radius, width) {
        this.font_family = font_family; // css style, then style setting
        this.font_size = font_size;
        this.font_colour = font_colour;

        this.background_colour = background_colour;

        this.border_style = border_style; // This is also whether a border is even present
        this.border_colour = border_colour;
        this.border_width = border_width; // Given in px
        this.border_radius = border_radius;

        this.width = width; // See doc
        // No height.
    }
}

let component_style; // This may be a textbox or something else.

const selected = document.getElementById("selected");
let selected_component; // Not to be confused with component_selected which is local to a function.

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
    const new_textbox = Object.create(component);

    default_textbox.appendChild(default_text);
    ////new_textbox.id = text;

    default_textbox.setAttribute("id", "TB" + id);
    new_textbox.id = "TB" + id;

    // Positioning
    //TODO
    new_textbox.x = mouse_x;
    new_textbox.y = mouse_y;

    new_textbox.width = 600; // Update if CSS default changes.
    
    construction_window.insertBefore(default_textbox, insert_before);

    new_textbox.height = default_textbox.offsetHeight;

    new_textbox.z_index = 0; // Default value.

    // Styling here, after insert so that js can access using the function later
    const added_box = document.getElementById(new_textbox.id);
    added_box.style.fontFamily = "sans-serif";
    added_box.style.fontSize = "medium";
    added_box.style.fontColor = "black";
    added_box.style.backgroundColor = "white";
    added_box.style.borderStyle = "solid";
    added_box.style.borderColor = "black";
    added_box.style.borderWidth = "1px";
    added_box.style.borderRadius = "0px";
    added_box.style.width = "600px";

    console.log("Textbox with id: TB" + id +" created!");

    return new_textbox
};

function addComponent(current_action) {
    console.log("CW: Click registered!");
    if (current_action == "addd") { //TODO Rewrite as switch
        if (adding == "text") {
            // Get ID for new textbox
            text_box_id_number = text_box_id_number + 1;

            // Add text box
            components.push(addTextBox(default_text, insert_before, text_box_id_number, 0, 0));
            text_boxes_id.push("TB" + text_box_id_number);

            // Update history
        }
    } else if (current_action == "remo") { //TODO
        // Find components overlapping

        // Find highest z index

        // Remove this component
        
        // Update history
    } else { // Click to select elements
        // Get components present
        let components_below = [];
        components.forEach(component => {
            if (relative_mouse_x >= component.x && relative_mouse_x <= component.x + component.width) {
                if (relative_mouse_y >= component.y && relative_mouse_y <= component.y + component.height) {
                    components_below.push(component);
                };
            };
        });

        let component_selected;
        if (components_below.length == 0) {
            return // No elements are below the mouse
        } else if (components_below.length == 1) {
            component_selected = components_below[0];
        } else { // Definitely not the most efficient way to do this but it is easy and this will have a lifetime user count of three, if lucky. :(
            let highest_z_index = -1; // Ensures this is always set by something.
            let indexes = [-1]; // Will error if not set.
            let iterator = 0;

            components_below.forEach(component => {
                if (component.z_index > highest_z_index) {
                    highest_z_index = component.z_index;
                    indexes = [iterator];
                } else if (component.z_index == highest_z_index) {
                    indexes.push(iterator);
                };

                iterator += 1;
            });

            component_selected = components_below[indexes[0]]; // First encountered high z-index index will be selected.
        };

        // Component has now been chosen! yaay
        selected_component = document.getElementById(component_selected.id);

        const type_of_component = component_selected.id[0] + component_selected.id[1];

        if (type_of_component == "TB") {
            component_style = getComponentStyle("TB", selected_component);
        };

        selected_component.classList.add("selected");

        // Change selected text
        selected.innerText = "Selected: " + component_selected.id;

        // Reveal relevant options
        if (type_of_component == "TB") { //TODO vers
            configureOptions(1);
        } else if (type_of_component == "PH") {
            configureOptions(2);
        };
    };
};

function configureOptions(setting) {
    const textbox_options = document.getElementById("textbox_options");

    if (setting == 0) {
        textbox_options.style.display = "none";
        selected.innerText = "Selected: ";
    } else if (setting == 1) { // Textbox
        textbox_options.style.display = "block";

        if (component_style.border_width != "0px") { // Border
            toggleBorderSettings(1);
        } else { // No border
            toggleBorderSettings(0);
        }
    } else {
        // In the event of accidental incorrect value.
        configureOptions(0);
    };
};

function clearSelection() {
    configureOptions(0);
    try {
        selected_component.classList.remove("selected");
    } catch {
        console.warn("Unneeded use of clearSelection function. Please reconsider your choices.");
        console.log("^^Massive overreaction, this function is called when any button is clicked, sorry about him.^^");
    }
};

function getComponentStyle(type, selected_component) {
    switch(type) {
        case "TB":
            let return_data = new TextboxStyle;

            return_data.font_family = selected_component.style.fontFamily;
            return_data.font_size = selected_component.style.fontSize;
            return_data.font_colour = selected_component.style.fontColor;

            return_data.background_colour = selected_component.style.backgroundColor;

            return_data.border_style = selected_component.style.borderStyle;
            return_data.border_colour = selected_component.style.borderColor;
            return_data.border_width = selected_component.style.borderWidth;
            return_data.border_radius = selected_component.style.borderRadius;

            return_data.width = selected_component.style.width;

            console.log(return_data);

            return return_data
    }
};

function toggleBorderSettings(on_off) {
    const tb_border_box = document.getElementById("textbox_border");
    const border_options = document.getElementById("border_options");

    if (on_off == 1) { // Display border settings
        border_options.style.display = "block";
        tb_border_box.checked = "true";
    } else {
        border_options.style.display = "none";
        tb_border_box.checked = "false";
    }
}

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
    clearSelection();
});

window.addEventListener('none', function() {
    console.log("Deselecting current object...");
    current_action = "none";
    formatting(0);
    clearSelection();
});

window.addEventListener('remo', function() {
    console.log("Removing objects...");
    current_action = "remo";
    formatting(2);
    clearSelection();
});

// Options for editing textboxs listeners
const tb_border_box = document.getElementById("textbox_border");
tb_border_box.addEventListener("change", () => {
    const border_options = document.getElementById("border_options");

    if (tb_border_box.checked) {
        border_options.style.display = "block";
    } else {
        border_options.style.display = "none";
    };
});

// Final config for editing mode
configureOptions(0);

//! DEBUG PWEASE WEMOVE (Or disable)
const debug = true;
if (debug) {
    text_box_id_number = text_box_id_number + 1;
    components.push(addTextBox("DEBUG " + default_text, insert_before, text_box_id_number, 0, 0));
    text_boxes_id.push("TB" + text_box_id_number);

    text_box_id_number = text_box_id_number + 1;
    components.push(addTextBox("DEBUG2 " + default_text, insert_before, text_box_id_number, 0, 0));
    text_boxes_id.push("TB" + text_box_id_number);
};