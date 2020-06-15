const initializeMobileNavMenu = (query) => {
    if ($(query).length) {
        new MetisMenu(query);
    }
};

function initializePage() {
    initializeMobileNavMenu(".mobile-nav #menu");
    initializeMobileNavMenu(".page-header-mobile #page-header-menu");

    $(".nav-item-dropdown").each(function () {
        const mainList = $(this).find(".main-list");

        if (mainList.length) {
            const id = mainList.attr("id");
            initializeMobileNavMenu(".nav-item-dropdown #" + id);
        }
    });

    $(window).scroll(function () {
        const height = $(".Header .logo-container").outerHeight();
        const pageHeader = $(".Header .page-header");
        const pageHeaderInternal = $(".Header .menu");
        const pageHeaderExternal = $(".Header .page-header-external");
        const scroll = $(window).scrollTop();

        if (scroll >= height) {
            if (pageHeaderInternal.length) {
                pageHeaderInternal.addClass("fixed");
            }

            if (pageHeaderExternal.length) {
                pageHeaderExternal.prev().addClass("spacing");
                pageHeaderExternal.addClass("fixed");
            }

            if (pageHeader.length) {
                pageHeader.addClass("fixed");
            }
        } else {
            if (pageHeaderInternal.length) {
                pageHeaderInternal.removeClass("fixed");
            }

            if (pageHeaderExternal.length) {
                pageHeaderExternal.prev().removeClass("spacing");
                pageHeaderExternal.removeClass("fixed");
            }

            if (pageHeader.length) {
                pageHeader.removeClass("fixed");
            }
        }
    });

    const activeIconSrc = "./resources/images/icon-green.svg";
    const inactiveIconSrc = "./resources/images/icon-white.svg";
    $(".menu .nav-pages .nav-link").click(function () {
        $(".menu .nav-pages .nav-link").removeClass("active");
        $(".menu .nav-pages .nav-link img").attr("src", inactiveIconSrc);
        const active = $(this).addClass("active");
        active.find("img").attr("src", activeIconSrc);
    });
}

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

        $(".ButtonCluster .item").click(function () {
            $(this).parents(".ButtonCluster").find(".item").removeClass("selected");
            $(this).addClass("selected");
        });
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

function initializeLayout1() {
    $(document).ready(function () {
        $(".ui.dropdown").dropdown();
        tippy(".Tooltip", { maxWidth: 160 });

        CKEDITOR.replace("editor1");

        // Switch display value
        $(".Switch input").on("change", function () {
            const isChecked = $(this).is(":checked");
            $("#switch-value").text(isChecked ? "On" : "Off");
        });

        $(".ButtonCluster .item").click(function () {
            $(this).parents(".ButtonCluster").find(".item").removeClass("selected");
            $(this).addClass("selected");
        });
    });
}

function initializePageBuilder() {
    $(document).ready(function () {
        tippy(".Tooltip", { maxWidth: 160 });

        $(".ButtonCluster .item").click(function () {
            $(this).parents(".ButtonCluster").find(".item").removeClass("selected");
            $(this).addClass("selected");
        });

        $(document).on("click", ".btn-delete", function () {
            const container = $(this).parents(".ContentBox");

            if (container.find(".Builder").length == 1) {
                alert("There should be one builder that must remain.");
            } else {
                $(this).parents(".Builder").remove();
            }
        });

        $(document).on("click", ".btn-new-row", function () {
            const cloneableRow = $(".cloneable-row").first();
            const row = cloneableRow.clone();
            row.insertBefore($(this));
            tippy(".Tooltip", { maxWidth: 160 });
        });

        $(".btn-new-block").click(function () {
            const cloneableRow = $(".cloneable-block").first();
            const row = cloneableRow.clone();
            row.insertBefore($(this));
            tippy(".Tooltip", { maxWidth: 160 });
        });
    });
}

function initializeDashboard() {
    $(".btn-hide").click(function () {
        $(".SetupWizard").hide(300);
    });

    $(".SetupWizard .checklist input").change(function () {
        const isChecked = $(this).is(":checked");
        if (isChecked) {
            $(this).parents(".checklist").addClass("done");
        } else {
            $(this).parents(".checklist").removeClass("done");
        }
    });

    const width = 13;
    const bar = new ProgressBar.Circle("#progress", {
        color: "#0D2C54",
        strokeWidth: width,
        trailWidth: width,
        trailColor: "rgba(13,44,84, 0.5)",
        easing: "easeInOut",
        duration: 1400,
        from: { color: "#0D2C54", width },
        to: { color: "#0D2C54", width },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText("");
            } else {
                circle.setText("<p class='value'>" + value + "%</p>" + "<p class='complete-text'>COMPLETE</p>");
            }
        },
    });

    bar.animate(0.75);
}
