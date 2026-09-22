const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const params = Object.fromEntries(urlParams.entries());

fetch(`/api/get-recipe?name=${params.name}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById("recipe").remove();

            const recipeContainer = document.getElementById("recipe-container");

            const failMessage = document.createElement("h1");
            failMessage.textContent = "Failed to read JSON file.";

            recipeContainer.appendChild(failMessage);
        }
    })
    .then(data => {
        document.getElementById("title").textContent = data.name;

        const thumbnail = document.getElementById("thumbnail");
        thumbnail.src = `/api/get-thumb?name=${params.name}`;

        thumbnail.onerror = () => {
            thumbnail.src = "assets/placeholder.png"
        }

        const ingredientsList = document.getElementById("ingredients");

        data.ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient.amount + " " + ingredient.name;
            ingredientsList.appendChild(li);
        });

        const stepsList = document.getElementById("steps");

        data.steps.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            stepsList.appendChild(li);
        });
    });
