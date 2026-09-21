fetch(`/api/get-all-recipes`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById("recipe").remove();

            const failMessage = document.createElement("h1");
            failMessage.textContent = "Failed to fetch recipe files.";

            document.body.appendChild(failMessage);
        }
    })
    .then(data => {
        const recipeList = document.getElementById("recipe-list");

        data.forEach(recipe => {
            const li = document.createElement("li");
            const a = document.createElement('a');

            a.href = "/recipe?name=" + recipe.id;
            a.textContent = recipe.name;

            li.appendChild(a);
            recipeList.appendChild(li);
        })
    });
