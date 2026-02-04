fetch("recipes/test.json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("title").textContent = data.name;
        document.getElementById("thumbnail").src = "data:image/png;base64," + data.thumbnail;

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
