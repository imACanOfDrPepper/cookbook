mod error;

use crate::error::ApiError;

use axum::{
    Router,
    extract::Query,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::get,
};
use tokio::fs;
use tower_http::services::ServeDir;

use std::{collections::HashMap, path::Path};

const NAME_KEY: &str = "name";
static RECIPES_PATH: &str = "recipeslist/";
static THUMBS_PATH: &str = "recipeslist/thumbs/";

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/get-recipe", get(get_recipe))
        .route("/api/get-thumb", get(get_thumb))
        .fallback_service(ServeDir::new("frontend"));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_recipe(Query(params): Query<HashMap<String, String>>) -> Result<Response, ApiError> {
    let name = params
        .get(NAME_KEY)
        .ok_or(ApiError::BadRequest("Recipe name missing in query"))?;

        let mut path = Path::new(RECIPES_PATH).join(name);
        path.add_extension("json");

        let json = fs::read_to_string(path)
            .await
            .map_err(|_| ApiError::NotFound("Recipe not found"))?;
        
        Ok((
            StatusCode::OK,
            [("Content-Type", "application/json")],
            json,
        )
            .into_response())
}

async fn get_thumb(Query(params): Query<HashMap<String, String>>) -> Result<Response, ApiError> {
    let name = params
        .get(NAME_KEY)
        .ok_or(ApiError::BadRequest("Recipe name missing in query"))?;

        let mut path = Path::new(THUMBS_PATH).join(name);
        path.add_extension("png");

        let image = fs::read(path)
            .await
            .map_err(|_| ApiError::NotFound("Thumbnail not found"))?;
        
        Ok((
            StatusCode::OK,
            [("Content-Type", "image/png")],
            image,
        )
            .into_response())
}
