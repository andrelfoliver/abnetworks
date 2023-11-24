document.addEventListener("DOMContentLoaded", function () {
  const qtsTubes = parseInt(document.body.dataset.qtsTubes);
  console.log(qtsTubes);

  // Call the function to create tube fields
  createTubeFields(qtsTubes);
});

// Function to create tube and fiber input fields
function createTubeFields(qtsTubes) {
  const maxTubes = qtsTubes;
  const maxFibers = 12;

  const fiberContainer = document.getElementById("fibers-form");
  // Clear previous content in fiberContainer
  fiberContainer.innerHTML = "";

  // Create a container for each row
  for (let row = 1; row <= Math.ceil(maxTubes / 4); row++) {
    const contHor = document.createElement("div");
    contHor.className = "row align-items-right";

    // Create a container for each tube within the row
    for (let col = 1; col <= Math.min(4, maxTubes - (row - 1) * 4); col++) {
      const tubeDiv = document.createElement("div");
      tubeDiv.className = "col";
      const tubeNumber = (row - 1) * 4 + col;
      const tubeLabel = document.createElement("p");
      tubeLabel.textContent = "Tube " + tubeNumber + ":";
      tubeDiv.appendChild(tubeLabel);

      // Create fibers within the tube container
      for (let i = 1; i <= maxFibers; i++) {
        const fiberRow = document.createElement("div");
        fiberRow.className = "fiber-row d-flex";
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = [
          "blue",
          "orange",
          "green",
          "brown",
          "gray",
          "white",
          "red",
          "black",
          "yellow",
          "violet",
          "pink",
          "aqua",
        ][i - 1];
        const fiberInput = document.createElement("input");
        fiberInput.className = "fiber-input";
        fiberInput.type = "text";
        fiberInput.placeholder = "Enter fiber number";
        fiberInput.name = "tube_" + tubeNumber + "_fiber_" + i + "_color";

        fiberRow.appendChild(colorBox);
        fiberRow.appendChild(fiberInput);
        tubeDiv.appendChild(fiberRow);
      }

      // Add the tube container to the row
      contHor.appendChild(tubeDiv);
    }

    // Add the row to the main container
    fiberContainer.appendChild(contHor);
  }
}
