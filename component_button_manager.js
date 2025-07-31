const text_box = new Event("text");

function newComponent(button) {
    console.log("Button with id " + button + " clicked!");
    if (button == "text") {
        window.dispatchEvent(text_box);
    }
};

const buttons = ["text", "head"];

buttons.forEach(button => {
    document.getElementById(button).addEventListener("click", function() {
        newComponent(button);
    });
});