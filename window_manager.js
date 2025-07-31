const construction_window = document.getElementById("const_window");
let mouse_x = 0;
let mouse_y = 0;

let construction_x = 0;
let construction_y = 0;

let relative_mouse_x = 0;
let relative_mouse_y = 0;

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
}

function formatting(style) {
    if (style == 1) {
        // Creating
        construction_window.style.borderColor = "rgba(74, 255, 68, 1)";
    } else if (style == 2) {
        // Deleting
        construction_window.style.borderColor = "rgba(255, 68, 68, 1)";
    } else {
        // Idle
        construction_window.style.borderColor = "rgba(0, 0, 0, 1)";
    }
}

function updateCoords(event) {
    mouse_x = event.pageX;
    mouse_y = event.pageY;

    relative_mouse_x = mouse_x - construction_x;
    relative_mouse_y = mouse_y - construction_y;

    console.log("[Absolute] x: " + mouse_x + ", y: " + mouse_y);
    console.log("[Relative] x: " + relative_mouse_x + ", y: " + relative_mouse_y);
}

construction_window.addEventListener("mousemove", updateCoords, false);
construction_window.addEventListener("mouseenter", updateCoords, false);
construction_window.addEventListener("mouseleave", updateCoords, false);

size();

window.addEventListener('resize', function() {
    size();
});

window.addEventListener('text', function() {
    console.log("Creating new text box...")
    formatting(1);
})