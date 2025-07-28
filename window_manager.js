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
}

size();

window.addEventListener('resize', function() {
    size();
});