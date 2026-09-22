# Cookbook

This is a cookbook website made in Rust using Axum.

## Usage

Run it using `cargo r` while having Cargo installed.

## Adding recipes

Add a `.json` file to `recipeslist/` using this format:

```json
{
  "name":"Recipe name",
  "ingredients": [
    {
      "name":"an ingredient",
      "amount":"An amount of"
    },
    {
      "name":"a different ingredient",
      "amount":"A different amount of"
    }
  ],
  "steps": [
    "This is step 1",
    "And this is step 2"
  ]
}
```

Make sure the filename is unique and includes only letters.

Next, include an image file in `recipeslist/thumbs/`. Make sure the filename exactly matches that of the `.json`.
