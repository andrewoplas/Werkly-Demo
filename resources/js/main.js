const initializeMobileNavMenu = (query) => {
    new MetisMenu(query).on("shown.metisMenu", function (event) {
        window.addEventListener("click", function mmClick1(e) {
            if (!event.target.contains(e.target)) {
                mm1.hide(event.detail.shownElement);
                window.removeEventListener("click", mmClick1);
            }
        });
    });
};

$(document).ready(function () {
    $(".ui.dropdown").dropdown();
    tippy(".Tooltip", { maxWidth: 160 });

    CKEDITOR.replace("editor1");

    // Force change to position output value
    outputUpdate(0, 0, 20);
});

function outputUpdate(value, minValue, maxValue) {
    var output = document.querySelector("#value");
    output.value = value;

    thumbHalfWidth = 15; // is half of the width of thumb used for slider drag.
    totalInputWidth = $(".Slider").parent().innerWidth(); // is width of input element in pixels.

    const left = ((value - minValue) / (maxValue - minValue)) * (totalInputWidth - thumbHalfWidth - thumbHalfWidth) + thumbHalfWidth;
    const bufferValue = value < 10 ? -5 : -10;
    output.style.left = left + bufferValue + "px";

    if (value == minValue || value == maxValue) {
        $("#value").hide();
    } else {
        $("#value").show();
    }
}
