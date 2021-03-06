function initializeTableFilterListeners() {
    mainListeners();
    selectFiltersOptionsListeners();
    selectFiltersValueListeners();

    // Initialize datepicker
    const datepicker = $('[data-toggle="datepicker"]')
        .datepicker({ autoHide: true })
        .on("pick.datepicker", function (e) {
            // Get date
            const day = e.date.getDate() + getOrdinalDate(e.date.getDate());
            const month = $(this).datepicker("getMonthName");
            const year = e.date.getFullYear();

            // Set date
            $(this).val(`${day} ${month}, ${year}`);
            e.preventDefault();
        });
    $('[data-toggle="datepicker"]').datepicker("pick");
}

function getOrdinalDate(day) {
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function mainListeners() {
    const tableFilter = $(".TableFilter");

    // Show filters
    const closedText = "All saved filters";
    const openedText = "Back to table";
    tableFilter.find(".show-filters").click(function () {
        const filtersPanel = $(".filters-panel");
        const tablePanel = $(".table-panel");

        tablePanel.toggleClass("d-none");
        filtersPanel.toggleClass("d-none");

        $(this).find(".left-arrow").toggleClass("d-none");
        $(this).find(".right-arrow").toggleClass("d-none");

        const text = $(this).find(".text").text();
        $(this)
            .find(".text")
            .text(text == closedText ? openedText : closedText);
    });

    // Remove added filter
    $(document).on("click", ".TableFilter .filters-list .item .remove", function () {
        $(this)
            .parents(".item")
            .hide(100, function () {
                console.log();
                const filterItemsCount = tableFilter.find(".main .filters-list .item:visible").length;
                actionButtonVisibility(filterItemsCount > 0); // 1 is for the cloneable row
            });
    });

    // Add filter (Display list of filters)
    tableFilter.find(".btn-filter").click(function () {
        showScreen(".select-filters-container");
    });

    // Actions buttons listener - Save
    tableFilter.find(".action-buttons .btn-save").click(function () {
        alert("Save clicked!");
    });

    // Actions buttons listener - Reset
    tableFilter.find(".action-buttons .btn-reset").click(function () {
        tableFilter.find(".main .filters-list .item:visible").hide(100);
        actionButtonVisibility(false);
    });
}

function selectFiltersOptionsListeners() {
    const tableFilter = $(".TableFilter");

    // Select filter (Display conditions)
    tableFilter.find(".select-filters-container .filters .item").click(function () {
        const filterName = $(this).text();
        const type = $(this).attr("type");

        if (type == "text") {
            tableFilter.find(".select-filters-value .options .item").removeClass("d-none");
            tableFilter.find(".select-filters-value .options .item .query-value.text").removeClass("d-none");

            tableFilter.find(".select-filters-value .options .item.date").addClass("d-none");
            tableFilter.find(".select-filters-value .options .item .query-value.date").addClass("d-none");
        } else if (type == "date") {
            tableFilter.find(".select-filters-value .options .item").removeClass("d-none");
            tableFilter.find(".select-filters-value .options .item .query-value.text").addClass("d-none");
            tableFilter.find(".select-filters-value .options .item .query-value.date").removeClass("d-none");
        }

        // Display selected filter name
        tableFilter.find(".select-filters-value .option-selected .title").text(filterName);

        // Reset fields
        tableFilter.find(".select-filters-value .options .item .selector").addClass("d-none");
        tableFilter.find(".select-filters-value .options .item [type='radio']").prop("checked", false);
        tableFilter.find(".select-filters-value .options .item [type='text']").val("");
        tableFilter.find(".select-filters-value .options .item select").prop("selectedIndex", 0);
        $(".ui.dropdown").dropdown("clear");

        showScreen(".select-filters-value");
    });

    // Go back
    tableFilter.find(".select-filters-container .btn-back").click(function () {
        showScreen(".main");
    });
}

function selectFiltersValueListeners() {
    const tableFilter = $(".TableFilter");

    // Select filter condition
    tableFilter.find(".select-filters-value .options .item .choice").click(function () {
        $(this).parents(".options").find(".selector").addClass("d-none");
        $(this).parents(".item").find(".selector").removeClass("d-none");
        $(this).parents(".select-filters-value").find(".btn-apply-filter").show();
    });

    // Go back
    tableFilter.find(".select-filters-value .btn-back").click(function () {
        showScreen(".select-filters-container");
    });

    // Apply
    tableFilter.find(".btn-apply-filter").click(function () {
        const selected = tableFilter.find(".select-filters-value .options .item .choice:checked");

        if (selected.length) {
            const queryValueElement = selected.parents(".item").find(".query-value:not(.d-none)");

            const filterName = tableFilter.find(".select-filters-value .option-selected .title").text();
            const condition = selected.val();

            let value = "";
            if (queryValueElement.hasClass("Select")) {
                value = queryValueElement.dropdown("get value");
            } else {
                value = selected.parents(".item").find(".query-value:not(.d-none)").val();
            }

            if (value) {
                addFilter(filterName, condition, value);
                showScreen(".main");
                actionButtonVisibility(true);
            } else {
                alert("Please input a value first");
            }
        } else {
            alert("Please select an option first!");
        }
    });
}

// Helper functions
function showScreen(screen) {
    const tableFilter = $(".TableFilter");

    tableFilter.find(".screen").addClass("d-none");
    tableFilter.find(screen).removeClass("d-none");
}

function addFilter(filterName, condition, value) {
    const tableFilter = $(".TableFilter");

    const cloneableRow = tableFilter.find(".main .filters-list .cloneable-row");
    const row = cloneableRow.clone();

    row.removeClass("cloneable-row");
    row.find(".filter-name").text(filterName);
    row.find(".condition").text(condition);
    row.find(".value").text(value);

    tableFilter.find(".main .filters-list").append(row);
}

function getOrdinalDate(day) {
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function actionButtonVisibility(isVisible) {
    const tableFilter = $(".TableFilter");

    if (isVisible) {
        tableFilter.find(".main .action-buttons").show();
    } else {
        tableFilter.find(".main .action-buttons").hide();
    }
}
