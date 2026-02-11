fetch("/recipeslist/test.json")
    .then(res => res.json())
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
