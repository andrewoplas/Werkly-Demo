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

function initializeButtonsInputs() {
    $(document).ready(function () {
        $(".ui.dropdown").dropdown();
        tippy(".Tooltip", { maxWidth: 160 });

        CKEDITOR.replace("editor1");

        // Force change to position output value
        outputUpdate(0, 0, 20);
    });
}

function initializeDataTables() {
    // Clone rows in basic table 1
    for (let i = 0; i < 100; i++) {
        const row = $("#basictable-checkbox-1 .clone-for-demo").clone();
        row.removeClass("clone-for-demo");
        row.appendTo($("#basictable-checkbox-1 tbody"));
    }

    // Clone rows in basic table 2
    for (let i = 0; i < 100; i++) {
        const row = $("#basictable-checkbox-2 .clone-for-demo").clone();
        row.removeClass("clone-for-demo");
        row.appendTo($("#basictable-checkbox-2 tbody"));
    }

    $(".Datatable table").DataTable({
        ordering: false,
        pagingType: "full_numbers",
        language: { search: "" },
        columnDefs: [
            {
                orderable: false,
                className: "Checkbox",
                targets: 0,
            },
        ],
        select: {
            style: "os",
            selector: "td:first-child",
        },

        initComplete: function (element) {
            const wrapper = $(element.nTableWrapper);
            const input = wrapper.find(".dataTables_filter input").unbind();
            const self = this.api();

            const $searchButton = $(
                '<button class="Button secondary icon ml-2">' +
                    '<img src="./resources/images/icon-white.svg" alt="icon" height="13" width="13" />' +
                    "</button>"
            ).click(function () {
                self.search(input.val()).draw();
            });

            input.addClass("Input search");
            input.prop("placeholder", "Search ...");
            input.change(function () {
                if (input.val().length == 0) {
                    self.search("").draw();
                }
            });

            wrapper.find(".dataTables_filter").append($searchButton);
        },
    });

    const checkboxOnchange = function (tableName) {
        const table = $(tableName);
        table.find('th [type="checkbox"]').on("change", function () {
            const isChecked = $(this).is(":checked");
            const name = $(this).attr("name");
            table.find('tbody [name="' + name + '"]').prop("checked", isChecked);
        });
    };

    checkboxOnchange("#basictable-checkbox-1");
    checkboxOnchange("#basictable-checkbox-2");
    checkboxOnchange("#minitable-checkbox-1");
    checkboxOnchange("#minitable-checkbox-2");

    $("#btn-add-new-row").click(function () {
        const table = $("#minitable-checkbox-2");
        const tbody = table.find("tbody");
        const row = table.find("tr.cloneable-row").clone();

        row.find("input").val("").prop("checked", false);
        row.removeClass("cloneable-row");
        row.appendTo(tbody);
    });
}
