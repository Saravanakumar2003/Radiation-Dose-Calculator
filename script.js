
var calculationHistory = [];

function calculateDose() {
    try {
        var exposureTime = parseFloat(document.getElementById('exposureTime').value);
        var distance = parseFloat(document.getElementById('distance').value);
        var sourceStrength = parseFloat(document.getElementById('sourceStrength').value);

        // Validate input values
        if (isNaN(exposureTime) || exposureTime <= 0) {
            throw new Error("Exposure time must be a positive number.");
        }

        if (isNaN(distance) || distance <= 0) {
            throw new Error("Distance must be a positive number.");
        }

        if (isNaN(sourceStrength) || sourceStrength <= 0) {
            throw new Error("Source strength must be a positive number.");
        }

        // Convert units to common units (seconds, meters, becquerels)
        var exposureTimeUnit = document.getElementById('exposureTimeUnit').value;
        var distanceUnit = document.getElementById('distanceUnit').value;
        var sourceStrengthUnit = document.getElementById('sourceStrengthUnit').value;

        if (exposureTimeUnit === "minutes") {
            exposureTime *= 60; // Convert minutes to seconds
        }

        if (distanceUnit === "feet") {
            distance *= 0.3048; // Convert feet to meters
        }

        if (sourceStrengthUnit === "curies") {
            sourceStrength *= 3.7e10; // Convert curies to becquerels
        }

        // Calculation logic
        var doseRate = sourceStrength / (4 * Math.PI * Math.pow(distance, 2));
        var radiationDose = doseRate * exposureTime;

        // Convert radiation dose to additional units
        var doseGray = radiationDose * 100; // 1 Gray = 100 Sieverts
        var doseRad = radiationDose * 100; // 1 Rad = 100 Sieverts
        var doseRem = radiationDose * 1000; // 1 Rem = 1000 Sieverts

        // Display results
        document.getElementById('result').innerHTML = "The radiation dose is: " + 
            radiationDose.toFixed(6) + " Sieverts";

        // Add calculation to history
        calculationHistory.push({
            exposureTime: exposureTime,
            distance: distance,
            sourceStrength: sourceStrength,
            radiationDose: radiationDose
        });

        updateHistory();

    } catch (error) {
        showError(error.message);
    }
}

function updateHistory() {
    var historyList = document.getElementById('history');
    historyList.innerHTML = ""; // Clear previous history

    calculationHistory.forEach(function(calculation, index) {
        var listItem = document.createElement('li');
        listItem.textContent = "Calculation " + (index + 1) + ": " + 
                               "Exposure Time: " + calculation.exposureTime + "s, " +
                               "Distance: " + calculation.distance + "m, " +
                               "Source Strength: " + calculation.sourceStrength + "Bq, " +
                               "Radiation Dose: " + calculation.radiationDose.toFixed(6) + " Sv";
        historyList.appendChild(listItem);
    });
}

function clearHistory() {
    calculationHistory = [];
    updateHistory();
}

function showError(message) {
    document.getElementById('result').innerHTML = "<span style='color: red;'>" + message + "</span>";
}
