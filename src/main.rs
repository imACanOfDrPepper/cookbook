use axum::{
    Router,
    body::Body,
    extract::Query,
    http::{StatusCode},
    response::Response,
    routing::get,
};
use tower_http::services::ServeDir;
use std::{
    collections::HashMap,
    fs,
    path::{PathBuf},
    sync::LazyLock,
};

const NAME_KEY: &str = "name";
static RECIPES_PATH: LazyLock<PathBuf> = LazyLock::new(|| PathBuf::from("recipeslist/"));
static THUMBS_PATH: LazyLock<PathBuf> = LazyLock::new(|| PathBuf::from("recipeslist/thumbs/"));

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/v1/get_recipe", get(get_recipe))
        .route("/api/v1/get_thumb", get(get_thumb))
        .fallback_service(ServeDir::new("frontend"));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn get_recipe(Query(params): Query<HashMap<String, String>>) -> Response {
    let result = match params.get(NAME_KEY) {
        Some(v) => {
            let mut path = RECIPES_PATH.join(v);
            path.add_extension("json");
            fs::read_to_string(path)
        }
        None => {
            return Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(Body::from("Recipe name missing in query".to_string()))
                .unwrap();
        }
    };

    match result {
        Ok(v) => {
            return Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "application/json")
                .body(v.into())
                .unwrap();
        }
        Err(_) => {
            return Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body("Recipe not found".into())
                .unwrap();
        }
    };
}

async fn get_thumb(Query(params): Query<HashMap<String, String>>) -> Response {
    let result = match params.get(NAME_KEY) {
        Some(v) => {
            let mut path = THUMBS_PATH.join(v);
            path.add_extension("png");
            fs::read(path)
        }
        None => {
            return Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(Body::from("Recipe name missing in query".to_string()))
                .unwrap();
        }
    };

    match result {
        Ok(v) => {
            return Response::builder()
                .status(StatusCode::OK)
                .header("Content-Type", "image/png")
                .body(v.into())
                .unwrap();
        }
        Err(_) => {
            return Response::builder()
                .status(StatusCode::NOT_FOUND)
                .body("Thumbnail not found".into())
                .unwrap();
        }
    };
}
