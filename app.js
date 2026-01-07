/**
 * 3D Printing Cost Calculator Logic
 * Device: Flashforge AD5X
 * Mode: PLA (Avg. 0.09kW consumption)
 * Electricity: 6.00 TL / kWh
 */

function calculate() {
    // Eingabewerte aus dem DOM laden
    const filamentPrice = parseFloat(document.getElementById('filamentPrice').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;
    const labor = parseFloat(document.getElementById('labor').value) || 0;
    const margin = parseFloat(document.getElementById('margin').value) || 0;

    // Konstanten für deine Konfiguration
    const consumptionKW = 0.09; // Durchschnittlicher Verbrauch AD5X bei PLA
    const elecPricePerKwh = 6.00; // Dein Preis pro kWh in TL

    // 1. MATERIALKOSTEN: (Preis pro kg / 1000) * Gramm
    const materialCost = (filamentPrice / 1000) * weight;

    // 2. STROMKOSTEN: Zeit (h) * Verbrauch (kW) * Preis (TL)
    const energyCost = time * consumptionKW * elecPricePerKwh;

    // 3. ARBEITSKOSTEN: Zeit (h) * Stundensatz (TL)
    const laborCost = time * labor;

    // 4. GESAMTKOSTEN
    const totalCost = materialCost + energyCost + laborCost;

    // 5. FINALER VERKAUFSPREIS (Marge aufschlagen)
    const finalPrice = totalCost * (1 + margin / 100);

    // UI UPDATES
    updateUI({
        material: materialCost,
        energy: energyCost,
        labor: laborCost,
        total: totalCost,
        final: finalPrice,
        margin: margin
    });
}

function updateUI(data) {
    document.getElementById('marginLabel').innerText = data.margin + "%";
    document.getElementById('outMaterial').innerText = data.material.toFixed(2) + " TL";
    document.getElementById('outElec').innerText = data.energy.toFixed(2) + " TL";
    document.getElementById('outLabor').innerText = data.labor.toFixed(2) + " TL";
    document.getElementById('outTotalCost').innerText = data.total.toFixed(2) + " TL";
    document.getElementById('outFinalPrice').innerText = data.final.toFixed(2) + " TL";
}

// Event-Listener für automatisches Update bei Eingabe
window.onload = () => {
    // Führt die erste Berechnung aus
    calculate();
    
    // Fügt allen Inputs einen Listener hinzu
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculate);
    });
};
