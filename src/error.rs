use axum::{http::StatusCode, response::IntoResponse};

pub enum ApiError {
    BadRequest(&'static str),
    NotFound(&'static str),
    Internal,
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        match self {
            ApiError::BadRequest(msg) => (
                StatusCode::BAD_REQUEST,
                msg,
            )
                .into_response(),

            ApiError::NotFound(msg) => (
                StatusCode::NOT_FOUND,
                msg,
            )
                .into_response(),

            ApiError::Internal => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "Internal server error",
            )
                .into_response()
        }
    }
}
