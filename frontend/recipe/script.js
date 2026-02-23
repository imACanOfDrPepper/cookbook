const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const params = Object.fromEntries(urlParams.entries());

fetch(`/api/v1/get_recipe?name=${params.name}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById("recipe").remove();

            const failMessage = document.createElement("h1");
            failMessage.textContent = "Failed to read JSON file.";

            document.body.appendChild(failMessage);
        }
    })
    .then(data => {
        document.getElementById("title").textContent = data.name;

        const thumbnail = document.getElementById("thumbnail");
        if (data.thumbnail) {
            thumbnail.src = "data:image/png;base64," + data.thumbnail;
        }
        else {
            thumbnail.src = "/assets/placeholder.png"
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
