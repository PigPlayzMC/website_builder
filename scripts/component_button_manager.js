const text_box = new Event("text");
const header = new Event("head");
const deselect = new Event("none");
const remove = new Event("remo");

function newComponent(button) {
    console.log("Button with id " + button + " clicked!");
    if (button == "text") { //TODO Rewrite as switch
        window.dispatchEvent(text_box);
    } else if (button == "head") {
        window.dispatchEvent(header);
    } else if (button == "none") {
        window.dispatchEvent(deselect);
    } else if (button == "remo") {
        window.dispatchEvent(remove)
    } else {
        // Not possible hopefully
        console.error("Unknown button pressed. Please report this incident.");
        alert("Unknown button pressed. Please report this incident.");
    }
};

const buttons = ["text", "head", "none", "remo"];

buttons.forEach(button => {
    document.getElementById(button).addEventListener("click", function() {
        newComponent(button);
    });
});