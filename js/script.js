document.addEventListener('DOMContentLoaded', function() {
    const tempForm = document.getElementById('tempForm');
    const resultOutput = document.getElementById('resultOutput');
    const explanation = document.getElementById('explanation');

    tempForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input value and conversion type
        const temperature = parseFloat(document.getElementById('temperature').value);
        const conversionType = document.querySelector('input[name="conversionType"]:checked').value;
        
        // Validate input
        if (isNaN(temperature)) {
            resultOutput.textContent = 'Masukkan nilai suhu yang valid';
            explanation.textContent = 'Nilai suhu harus berupa angka.';
            return;
        }
        
        // Perform conversion calculation
        let result, originalUnit, convertedUnit, explanationText;
        
        if (conversionType === 'celsiusToFahrenheit') {
            result = (temperature * 9/5) + 32;
            originalUnit = 'Celsius';
            convertedUnit = 'Fahrenheit';
            explanationText = `${temperature}°C × (9/5) + 32 = ${result.toFixed(2)}°F`;
        } else {
            result = (temperature - 32) * 5/9;
            originalUnit = 'Fahrenheit';
            convertedUnit = 'Celsius';
            explanationText = `(${temperature}°F - 32) × (5/9) = ${result.toFixed(2)}°C`;
        }
        
        // Display result
        resultOutput.textContent = `${result.toFixed(2)} °${convertedUnit.charAt(0)}`;
        
        // Create explanation text
        explanation.innerHTML = `
            <p><strong>Konversi dari ${originalUnit} ke ${convertedUnit}:</strong></p>
            <p>${explanationText}</p>
            <p>Rumus konversi ${originalUnit} ke ${convertedUnit}:</p>
            <p>${conversionType === 'celsiusToFahrenheit' ? 
                'Fahrenheit = (Celsius × 9/5) + 32' : 
                'Celsius = (Fahrenheit - 32) × 5/9'}</p>
        `;
    });
    
    // Update result units when conversion type changes
    document.querySelectorAll('input[name="conversionType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const defaultUnit = this.value === 'celsiusToFahrenheit' ? 'F' : 'C';
            if (resultOutput.textContent.includes('--')) {
                resultOutput.textContent = `-- °${defaultUnit}`;
            }
        });
    });
});