document.getElementById('search-btn').addEventListener('click', () => {
    const foodItem = document.getElementById('food-input').value;
    if(foodItem.trim() === '') {
        alert('Please enter a food item.');
        return;
    }

    const apiKey = '64eBTRZTssIc7gAqzHkNb2Qb6kjoq7ZoOjF0fzUY';
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodItem}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching the food data:', error);
        });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.foods && data.foods.length > 0) {
        data.foods.forEach(food => {
            const foodDiv = document.createElement('div');
            foodDiv.classList.add('food-item');
            foodDiv.innerHTML = `
                <h3>${food.description}</h3>
                <p><strong>Calories:</strong> ${food.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value} kcal</p>
                <p><strong>Protein:</strong> ${getNutrientValue(food, 'Protein')} g</p>
                <p><strong>Fat:</strong> ${getNutrientValue(food, 'Total lipid (fat)')} g</p>
                <p><strong>Carbohydrates:</strong> ${getNutrientValue(food, 'Carbohydrate, by difference')} g</p>
            `;
            resultsDiv.appendChild(foodDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    }
}

function getNutrientValue(food, nutrientName) {
    const nutrient = food.foodNutrients.find(nutrient => nutrient.nutrientName === nutrientName);
    return nutrient ? nutrient.value : 'N/A';
}
