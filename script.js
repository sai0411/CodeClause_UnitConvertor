// Conversion factors
const conversionFactors = {
    length: {
      meter: 1,
      cm:100,
      foot: 3.28084,
      inch: 39.3701
    },
    weight: {
      kilogram: 1,
      pound: 2.20462,
      ounce: 35.274
    },
    temperature: {
      celsius: {
        toCelsius: function (value) { return value; },
        toFahrenheit: function (value) { return (value * 9/5) + 32; },
        toKelvin: function (value) { return value + 273.15; }
      },
      fahrenheit: {
        toCelsius: function (value) { return (value - 32) * 5/9; },
        toFahrenheit: function (value) { return value; },
        toKelvin: function (value) { return (value + 459.67) * 5/9; }
      },
      kelvin: {
        toCelsius: function (value) { return value - 273.15; },
        toFahrenheit: function (value) { return (value * 9/5) - 459.67; },
        toKelvin: function (value) { return value; }
      }
    }
  };

  function populateUnitDropdowns() {
    const unitType = document.getElementById('unitType').value;
    const fromUnitDropdown = document.getElementById('fromUnit');
    const toUnitDropdown = document.getElementById('toUnit');
  
    fromUnitDropdown.innerHTML = '';
    toUnitDropdown.innerHTML = '';
  
    for (let unit in conversionFactors[unitType]) {
      const fromOption = document.createElement('option');
      const toOption = document.createElement('option');
  
      fromOption.text = unit;
      toOption.text = unit;
  
      fromUnitDropdown.add(fromOption);
      toUnitDropdown.add(toOption);
    }
  }
  
  function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
  
    let result;
  
    if (unitType === 'temperature') {
      const fromUnitConverter = conversionFactors[unitType][fromUnit];
      result = fromUnitConverter[`to${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`](inputValue);
    } else {
      const fromUnitValue = conversionFactors[unitType][fromUnit];
      const toUnitValue = conversionFactors[unitType][toUnit];
      result = inputValue * (toUnitValue / fromUnitValue);
    }
  
    document.getElementById('result').innerHTML = result.toFixed(2);
  }
  
  document.getElementById('unitType').addEventListener('change', populateUnitDropdowns);
  
  populateUnitDropdowns();
  