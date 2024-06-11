// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the elements
    const liquidAmountInput = document.getElementById("liquidAmount");
    const vgSlider = document.getElementById("vgSlider");
    const vgValue = document.getElementById("vgValue");
    const pgSlider = document.getElementById("pgSlider");
    const pgValue = document.getElementById("pgValue");
    const aromaPercentage = document.getElementById("aromaPercentage");
    const aromaValue = document.getElementById("aromaValue");
    const calculateButton = document.getElementById("calculateButton");
    const resultsBlock = document.getElementById("resultsBlock");
    const vgToUse = document.getElementById("vgToUse");
    const pgToUse = document.getElementById("pgToUse");
    const aromaToUse = document.getElementById("aromaToUse");

    // Function to update PG and VG values
    function updatePGAndVGValues() {
        const pgSliderValue = parseInt(pgSlider.value);
        const vgSliderValue = parseInt(vgSlider.value);

        pgValue.textContent = pgSliderValue;
        vgValue.textContent = vgSliderValue;

        // Update the PG value displayed based on the VG slider value
        const updatedPGValue = 100 - vgSliderValue;
        pgValue.textContent = updatedPGValue;
    }

    // Initialize PG and VG values based on initial slider values
    updatePGAndVGValues();

    // Function to calculate values
    function calculateValues(liquidAmount, vgSliderValue, pgSliderValue, aromaPercentageValue) {
        const vgToUseValue = (liquidAmount - (liquidAmount * aromaPercentageValue)) * (vgSliderValue / 100);
        const pgToUseValue = (liquidAmount - (liquidAmount * aromaPercentageValue)) * (pgSliderValue / 100);
        const aromaToUseValue = liquidAmount * aromaPercentageValue;

        vgToUse.textContent = `VG da usare: ${vgToUseValue.toFixed(2)}g`;
        pgToUse.textContent = `PG da usare: ${pgToUseValue.toFixed(2)}g`;
        aromaToUse.textContent = `Aroma da usare: ${aromaToUseValue.toFixed(2)}g`;

        // Show the results block
        resultsBlock.classList.remove("hidden");
    }

    // Event listener for VG slider
    vgSlider.addEventListener("input", function() {
        vgValue.textContent = vgSlider.value;
        updatePGAndVGValues();
        // Move PG slider in opposite direction
        pgSlider.value = 100 - vgSlider.value;
    });

    // Event listener for PG slider
    pgSlider.addEventListener("input", function() {
        pgValue.textContent = pgSlider.value;
        // Move VG slider in opposite direction
        vgSlider.value = 100 - pgSlider.value;
        updatePGAndVGValues();
    });

    // Event listener for aroma percentage slider
    aromaPercentage.addEventListener("input", function() {
        aromaValue.textContent = aromaPercentage.value;
    });

    // Event listener for calculate button
    calculateButton.addEventListener("click", function() {
        let liquidAmount = parseFloat(liquidAmountInput.value);
        let vgSliderValue = parseInt(vgSlider.value);
        let pgSliderValue = parseInt(pgSlider.value);
        let aromaPercentageValue = parseFloat(aromaPercentage.value) / 100;

        // Use placeholder values if input is not filled
        if (isNaN(liquidAmount)) liquidAmount = parseFloat(liquidAmountInput.placeholder);
        if (isNaN(vgSliderValue)) vgSliderValue = parseInt(vgSlider.getAttribute('value'));
        if (isNaN(pgSliderValue)) pgSliderValue = parseInt(pgSlider.getAttribute('value'));
        if (isNaN(aromaPercentageValue)) aromaPercentageValue = parseFloat(aromaPercentage.getAttribute('value')) / 100;

        calculateValues(liquidAmount, vgSliderValue, pgSliderValue, aromaPercentageValue);
    });

    // Event listener for liquid amount input
    liquidAmountInput.addEventListener("input", function() {
        // Hide placeholder when user starts typing
        liquidAmountInput.placeholder = "";
    });

    // Event listener for aroma percentage input
    aromaPercentage.addEventListener("input", function() {
        // Hide placeholder when user starts typing
        aromaPercentage.placeholder = "";
    });
});
