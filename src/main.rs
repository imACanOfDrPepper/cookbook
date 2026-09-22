mod types;

use crate::types::{ApiError, Recipe};

use axum::{
    Router,
    extract::Query,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use serde_json::Value;
use tokio::fs::{self, read_dir};
use tower_http::services::ServeDir;

use std::{collections::HashMap, path::Path};

const NAME_KEY: &str = "name";
const RECIPES_PATH: &str = "recipeslist/";
const THUMBS_PATH: &str = "recipeslist/thumbs/";

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/get-recipe", get(get_recipe))
        .route("/api/get-thumb", get(get_thumb))
        .route("/api/get-all-recipes", get(get_all_recipes))
        .fallback_service(ServeDir::new("frontend"));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_recipe(Query(params): Query<HashMap<String, String>>) -> Result<Response, ApiError> {
    let name = params
        .get(NAME_KEY)
        .ok_or(ApiError::BadRequest("Recipe name missing in query"))?;

    if !name.chars().all(|c| c.is_alphabetic()) {
        return Err(ApiError::NotFound("Recipe not found"));
    }

    let mut path = Path::new(RECIPES_PATH).join(name);
    path.add_extension("json");

    let json = fs::read_to_string(path)
        .await
        .map_err(|_| ApiError::NotFound("Recipe not found"))?;

    Ok((StatusCode::OK, [("Content-Type", "application/json")], json).into_response())
}

async fn get_thumb(Query(params): Query<HashMap<String, String>>) -> Result<Response, ApiError> {
    let name = params
        .get(NAME_KEY)
        .ok_or(ApiError::BadRequest("Recipe name missing in query"))?;

    if !name.chars().all(|c| c.is_alphabetic()) {
        return Err(ApiError::NotFound("Recipe not found"));
    }

    let mut path = Path::new(THUMBS_PATH).join(name);
    path.add_extension("png");

    let image = fs::read(path)
        .await
        .map_err(|_| ApiError::NotFound("Thumbnail not found"))?;

    Ok((StatusCode::OK, [("Content-Type", "image/png")], image).into_response())
}

async fn get_all_recipes() -> Result<Response, ApiError> {
    let mut entries = read_dir(RECIPES_PATH)
        .await
        .map_err(|_| ApiError::Internal)?;

    let mut recipes = Vec::new();

    while let Ok(Some(entry)) = entries.next_entry().await {
        let path = entry.path();

        if !path.is_file() {
            continue;
        }

        let id = path
            .file_stem()
            .ok_or(ApiError::Internal)?
            .to_string_lossy()
            .into_owned();

        let json_str = fs::read_to_string(path)
            .await
            .map_err(|_| ApiError::Internal)?;
        let json_value: Value = serde_json::from_str(&json_str).map_err(|_| ApiError::Internal)?;

        let name = json_value
            .get("name")
            .and_then(|v| v.as_str())
            .ok_or(ApiError::Internal)?
            .to_string();

        let recipe = Recipe { id: id, name: name };

        recipes.push(recipe);
    }

    let recipes_json = serde_json::to_string(&recipes).map_err(|_| ApiError::Internal)?;

    Ok((
        StatusCode::OK,
        [("Content-Type", "application/json")],
        recipes_json,
    )
        .into_response())
}
