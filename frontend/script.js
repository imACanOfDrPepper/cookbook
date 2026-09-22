fetch(`/api/get-all-recipes`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            document.getElementById("recipe-list").remove();

            const failMessage = document.createElement("h1");
            failMessage.textContent = "Failed to fetch recipe files.";

            document.body.appendChild(failMessage);
        }
    })
    .then(data => {
        const recipeList = document.getElementById("recipe-list");

        data.forEach(recipe => {
            const a = document.createElement('a');
            const p = document.createElement('p');
            const img = document.createElement('img');

            a.href = "/recipe?name=" + recipe.id;
            a.classList.add("recipe-card");

            img.src = `/api/get-thumb?name=${recipe.id}`;
            img.onerror = () => {
                img.src = "recipe/assets/placeholder.png"
            }

            p.textContent = recipe.name;
            
            a.appendChild(p);
            a.appendChild(img);
            recipeList.appendChild(a);
        })
    });
