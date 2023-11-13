// script.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fiberContainer = document.getElementById("fibers-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Retrieve the value of qts_tubes from the HTML
        const qtsTubes = parseInt(document.querySelector("#qts_tubes_value").textContent);

        // Call the function to create tube fields
        createTubeFields(qtsTubes);
    });

    // Function to create tube and fiber input fields
    function createTubeFields(qtsTubes) {
        const maxTubes = qtsTubes;
        const maxFibers = 12; // Número máximo de fibras por tubo

        // Clear previous content in fiberContainer
        fiberContainer.innerHTML = "";

        for (let tubeCount = 1; tubeCount <= maxTubes; tubeCount++) {
            const tubeDiv = document.createElement("div");
            const tubeLabel = document.createElement("p");
            tubeLabel.textContent = "Tube " + tubeCount + ":";
            tubeDiv.appendChild(tubeLabel);

            for (let i = 1; i <= maxFibers; i++) {
                const fiberRow = document.createElement("div");
                const colorBox = document.createElement("div");
                const fiberInput = document.createElement("input");

                fiberRow.className = "fiber-row";
                colorBox.className = "color-box";
                colorBox.style.backgroundColor = ['blue', 'orange', 'green', 'brown', 'gray', 'white', 'red', 'black', 'yellow', 'violet', 'pink', 'aqua'][i - 1];
                fiberInput.className = "fiber-input";
                fiberInput.type = "text";
                fiberInput.placeholder = "Enter fiber number";
                fiberInput.name = "tube_" + tubeCount + "_fiber_" + i + "_color";

                fiberRow.appendChild(colorBox);
                fiberRow.appendChild(fiberInput);
                tubeDiv.appendChild(fiberRow);
            }

            fiberContainer.appendChild(tubeDiv);
        }
    }
});

