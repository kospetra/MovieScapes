//export const baseUrl = "http://localhost:8080";
export const baseUrl = "http://3.70.9.51:8080";

// export const urls = {
//   addNewUser: "/api/users",
//   deleteUserByEmail: "/api/users/deleteByEmail/",
//   addNewLatestMovieFromTmdb: "/api/tmdb",
//   getAllLatestMovies: "/api/tmdb",
//   addNewListOfTraktShows: "/api/traktList",
//   getAllTraktShows: "/api/trakt",
//   getRecommendedMovies: "api/movie/recommendation",
//   getPopularMovies: "/api/movie/popular",
// };

export const urls = {
  registerNewUser: "/api/user/register",
  loginUser: "/api/user/login",
  getUserByName: "/api/user/name",
  getPopularMovies: "/api/movie/popular",
  getRecommendedMovies: "/api/movie/recommendation",
  getMovieDetails: "/api/movie/details",
  getPopularShows: "/api/show/popular",
  getRecommendedShows: "/api/show/recommendation",
  getShowDetails: "/api/show/details",
  ratingOfData: "/api/video/rating",
  averageRatingOfData: "/api/video/rating/average"
}