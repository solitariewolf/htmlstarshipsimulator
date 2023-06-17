document.addEventListener("DOMContentLoaded", function() {

    const mainEngine1Control = document.getElementById("main-engine-1-control");
    const mainEngine1Display = document.getElementById("main-engine-1-display");

    const mainEngine2Control = document.getElementById("main-engine-2-control");
    const mainEngine2Display = document.getElementById("main-engine-2-display");

    const auxEngine1Control = document.getElementById("aux-engine-1-control");
    const auxEngine1Display = document.getElementById("aux-engine-1-display");

    const auxEngine2Control = document.getElementById("aux-engine-2-control");
    const auxEngine2Display = document.getElementById("aux-engine-2-display");

    const lockMainEnginesButton = document.querySelector('[data-control="main-engines"]');
    const lockAuxEnginesButton = document.querySelector('[data-control="aux-engines"]');

    function updateDisplay(control, display) {
        display.textContent = `${control.value}%`;
    }

    mainEngine1Control.addEventListener("input", function() {
        updateDisplay(mainEngine1Control, mainEngine1Display);
        if (lockMainEnginesButton.classList.contains('locked')) {
            mainEngine2Control.value = mainEngine1Control.value;
            updateDisplay(mainEngine2Control, mainEngine2Display);
        }
    });

    mainEngine2Control.addEventListener("input", function() {
        updateDisplay(mainEngine2Control, mainEngine2Display);
    });

    auxEngine1Control.addEventListener("input", function() {
        updateDisplay(auxEngine1Control, auxEngine1Display);
        if (lockAuxEnginesButton.classList.contains('locked')) {
            auxEngine2Control.value = auxEngine1Control.value;
            updateDisplay(auxEngine2Control, auxEngine2Display);
        }
    });

    auxEngine2Control.addEventListener("input", function() {
        updateDisplay(auxEngine2Control, auxEngine2Display);
    });

    lockMainEnginesButton.addEventListener("click", function() {
        lockMainEnginesButton.classList.toggle('locked');
    });

    lockAuxEnginesButton.addEventListener("click", function() {
        lockAuxEnginesButton.classList.toggle('locked');
    });

});
