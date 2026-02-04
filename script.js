fetch("recipes/test.json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("title").textContent = data.name;

        const thumbnail = document.getElementById("thumbnail");
        if (data.thumbnail) {
            thumbnail.src = "data:image/png;base64," + data.thumbnail;
        }
        else {
            thumbnail.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqsAAAGAAQMAAACwVrnaAAAABlBMVEX///8AAABVwtN+AAAG7UlEQVR4nO3bS47bNhgHcFIWahUYjJWii0FRxGxXs8wyQIMOEXTRZY7gI8yyiyJhkS56jDmKeoJewUfoMotBVfGhF18mxY9tjfKPiWdMWz/TsvSJlBWESkpKSkpKSkpKSkpK/t00wz/yD7LN/4i98bGSPuVhnzawXyi2/6Pv7Cy2vuqFvJDsHr3SOp3Gtkywr1GH7tYPJLGECpZi/bOf2GoTSwTLbnOweFi1LramW9iWs9Wu01nex7vtbMOFGiEn22xiay40dvZ+M0sF24Kz1SW23cIywRIfy7awmAs0DyuWbO3siw3qADI3+yP/45sNKuYwwcjDfivudrEsRaSaIBeLKRDLnd/4H2/5TRXNkpFdLzmxP/CbyMIgt1pREuTntmSx2OR+FSyJZVs7O9yrBCu63Gxm8fqRkZVdblt9yUtsI4rjBZYAsrVg2w1szX+8bCVAao6dDn8GsZWXrY1F2xsvWznZhrfLTYuZLKmMpsssXyWSpYI1DYKZk204INl1fzjbTizW3wvi+8vJxyJGLEfIiW2Yk70z2i6ynBHtn8t7WF9yWPmfeVnqYqmF3fU9G1nzpcJZPgAe1vtIzFsV89R2MXWQ7Ho/4ixbsGMhmp7FX+fVdvZL9TQb69wh+IKtZInOYmRhp2dxdsdi2Xpk71QfqWynS9a55Yot08FW4tH7NTv1D6v2DWw9smR8eN6mxF+ulSuLiYVtuMxZ8WnTsWMa66o2C5ba2Xc+FndutnKwjWBP/B4b95aZlR19bWfbmWUh7Pyu5V+OssBZbGNb/lOPb8LJOmquZGsHWymWv3VZjueirF7g0cmipxoZR0gysp2fvfWwlZUlYg+minCw9uKYzNpD+M0JW1nK26pNrCTsLJvYegLnWn+ZlQMuvQ2Ln3pkKzh2aK+ZwrawVB8mqOWYPJ43aFxJM2sOc2JYMdlrN7LGSYo1SyZ2rtshbGNha8GSkdWnhCFsbTl+LFi6Zg/9J/7wse/7v7xsZTl117jYvRgv1w/n4RZ/8rHYMkIRAx5EB+3wvGLfiIfVST73OEwsY5aMVrK8px/5/Y+dahRb7K6eOuTJe7PASZZRvuiwFvvnsVGU7mfF7r0sNucXXCCKRUit4Hb6S7E/eVlLCBJFiIz76cySmfUM9H2sEHW2XfQ2OicOVLMAxHKmrW2sZQYTl2ZxlpBMrOXUYSS7GFADsvW8LhdslcySCVyc2Utm5ZlmCs3is8bWIKwMuyZW1b6c7FwjktkqPzvPb5LZWmeTd16DFVsFDNssWfpfZ9GSJaMIxFLJtmh5iEgPkaw4XQLItpKtgdlbyY4zwIss7qdTW96nneUvc1zuzvuA56iok3U3IezQ41D2UZ5D2I2DvQvpz2HsjRoJD73d+cfiMsewl9+p9yUmVZ7z2KtFQuBF7NN+GywTyOPIbnA+5B2GTFG1HAb6HL9YSPjcq8tDP1ya1W0O7vXkeiHv9HF79l0e9/sM5oe+/z24OgWHz/IeQqp0VIJKV3zeZFH5hSIZkqezhy6Hegw7JERmf86hZqoFOXbZXNvWIfKQGJago2ZsMHzJ4okY/4UHvg7yXFV5ydPZ2CFcYLJsBO6vidPiucojJYuv8D7AjSDndXDg+wRUbZzWwYMoNWril5xxHRw7+dt9zUdM9kz+3p1VA8wsWn3zPO8S/q8wAqO+J8fzuGvD9MaMmtItPn8QVh5oloNviL1DfbuyHB44L1CJiNyaDsumDoA9idvlIdf/7VAM+7BogBkuHdG8e4m8hFAR0ifUZ/vTEgOyZs04LiJJTKbxws9Z1CPLoU4lFzbXNGS6rs7m2bjGIzBwor8uD0qmYePXWVSokZcWoIOCnnMW9aoOCq7rIINj3zyTPzDrVRLpW5d1BJ8+C7FdUgtQEU+WNoDyzcym5M3AfmkTwH5rY8/prGVyBLHfWqZyEEcFkwU5hJmbbWKRkWuV6M2pW9dLO5s6wf1K3FK9ObXQPtjZLpH9TtwyrXWXqMriZ+xkMCeVDBZi2mxhuyxs8qqV0U9spFz/52Fhzk0ZLIFh9TfdZWH9V9duZkFOpCGjikNdmKQ5cf9tMZg9AbFa91gWFmpDyMWS1T2QU58mC1RosrF0dQ+o2hoH3i4PS/KwQFVcZ6EqGFvfjb+SP4g1x04wLMzow2CBvoDTWaAdQmdhdgizEoKsXJMFWbkmC7JyLYcDiCsdLOzBbIJgIbprYwG6az3UpnfXyqZ31z4wSL44wc7uUleDYxiTegWYa3SUOJ8GG3TlZttM7F0W9tV9FvbdYxaWPvFbBs3+0uVhUQ4W7/Owz1lYletiaWELe4UsKSzcia/ClpSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUXFn+BiocLXCasZeKAAAAAElFTkSuQmCC"
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
