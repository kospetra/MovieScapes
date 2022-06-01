import React from "react";
import axios from "axios";
import { baseUrl, urls } from "../../utils/baseUrl";
import { externalUrls } from "../../utils/externalUrl";
import cinema from "../../resources/dark-cinema.jpg";
import "./HomePage.css";
import MovieTableComponent from "../../components/MovieTableComponent";
import { Badge, Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import { GiInfo } from "react-icons/gi";
import WeatherIcon from "react-icons-weather";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      user: "",
      recommendedMovie: {},
      popularMovie: {},
      popularMovieByCountry: {},
      recommendedShows: {},
      popularShows: {},
      popularShowsByCountry: {},
      userCountry: "",
      userCity: "",
      RenderMovies: true,
      MovieIsLoaded: false,
      RecommendedMovieIsLoaded: false,
      RecommendedShowIsLoaded: false,
      PopularMovieIsLoaded: false,
      PopularShowIsLoaded: false,
      PopularByCountryMovieIsLoaded: false,
      PopularByCountryShowIsLoaded: false,
      weatherId: "",
      weatherDescription: "",
      weatherEnable: false,
    };
  }

  componentDidMount() {
    this.getUser();
    this.getRecommendedMovieFromDB();
    this.getPopularMovieFromDB();
    this.getRecommendedShowsFromDB();
    this.getPopularShowFromDB();
    if (!navigator.geolocation) {
      console.log("This browser does not support geolocation!");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("This is latitude: " + position.coords.latitude);
        console.log("This is longitude: " + position.coords.longitude);
        let location =
          position.coords.latitude + "," + position.coords.longitude;
        axios
          .get(externalUrls.getUserCountry, {
            params: {
              key: "RUmF3vWrRfwfiYBbC8D4IVRxQHrIaZiV",
              location: location,
              outFormat: "json",
              thumbMaps: "false",
            },
          })
          .then((response) => {
            let country = response.data.results[0].locations[0].adminArea1;
            let city = response.data.results[0].locations[0].adminArea5;
            console.log("Grad je: " + city);
            console.log("Država je: " + country);
            this.setState({ userCountry: country, userCity: city });
            this.getWeather(city);
            this.getPopularMovieByCountryFromDB(country);
            this.getPopularShowByCountryFromDB(country);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  getUser = () => {
    axios
      .get(baseUrl + urls.getUserByName, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        console.log("autorizacija i info korisnika:");
        console.log(response);
        console.log(response.data);
        this.setState({ user: response.data.fullName });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getWeather = (city) => {
    //TODO: ovdje je potrebno poslat podatke o vremenu prema bazu
    axios
      .get(externalUrls.getWeather, {
        params: {
          q: city,
          appid: "67181c74c28531979d84456960844251",
        },
      })
      .then((res) => {
        console.log("VRIJEME DOHVAĆENO");
        console.log("ID Ikone je: " + res.data.weather[0].id);
        console.log(res.data);
        this.setState({
          weatherId: res.data.weather[0].id,
          weatherEnable: true,
          weatherDescription: res.data.weather[0].description,
        });
      });
  };

  getRecommendedMovieFromDB = () => {
    console.log("ovo je za recomended movies");
    axios
      .get(baseUrl + urls.getRecommendedMovies, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response);
        this.setState({
          recommendedMovie: response.data.records,
          RecommendedMovieIsLoaded: true,
        });
        console.log("predloženi filmovi ------------->");
        console.log(this.state.recommendedMovie);
      }).catch((err) => {
        console.error(err);
      });
  };

  getRecommendedShowsFromDB = () => {
    console.log("ovo je za recomended shows");
    axios
      .get(baseUrl + urls.getRecommendedShows, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((response) => {
        console.log(response.status);
        console.log(response);
        this.setState({
          recommendedShows: response.data.records,
          RecommendedShowIsLoaded: true,
        });
        console.log("predložene serije ------------->");
        console.log(this.state.recommendedShows);
      }).catch((err) => {
        console.error(err);
      });
  };

  getPopularMovieFromDB = () => {
    axios.get(baseUrl + urls.getPopularMovies).then((response) => {
      console.log(response.status);
      console.log(response);
      this.setState({
        popularMovie: response.data.records,
        PopularMovieIsLoaded: true,
      });
      console.log("popularni filmovi ------------->");
      console.log(this.state.popularMovie);
    });
  };

  getPopularShowFromDB = () => {
    axios.get(baseUrl + urls.getPopularShows).then((response) => {
      console.log(response.status);
      console.log(response);
      this.setState({
        popularShows: response.data.records,
        PopularShowIsLoaded: true,
      });
      console.log("popularne serije ------------->");
      console.log(this.state.popularShows);
    });
  };

  getPopularMovieByCountryFromDB = (country) => {
    console.log("dodaj filmove popularne na nekom području");
    console.log("ovo je iz state: " + this.state.userCountry);
    console.log("ovo je predano: " + country);
    axios
      .get(baseUrl + urls.getPopularMovies + "/" + country)
      .then((response) => {
        console.log(response.status);
        console.log(response);
        this.setState({
          popularMovieByCountry: response.data.records,
          PopularByCountryMovieIsLoaded: true,
        });
        console.log("popularni filmovi po državi ------------->");
        console.log(this.state.popularMovieByCountry);
      });
  };

  getPopularShowByCountryFromDB = (country) => {
    console.log("dodaj serije popularne na nekom području");
    console.log("ovo je iz state: " + this.state.userCountry);
    console.log("ovo je predano: " + country);
    axios
      .get(baseUrl + urls.getPopularShows + "/" + country)
      .then((response) => {
        console.log(response.status);
        console.log(response);
        this.setState({
          popularShowsByCountry: response.data.records,
          PopularByCountryShowIsLoaded: true,
        });
        console.log("popularni filmovi po državi ------------->");
        console.log(this.state.popularMovieByCountry);
      });
  };

  getMovieInfo = () => {
    this.setState({ movieInfo: true });
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: "url(" + cinema + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Row>
          <Col md={3}>
            <Card style={{}}>
              {/* width: "18rem" */}
              <Card.Body>
                <Card.Title
                  style={{
                    borderBottom: "1px solid #000",
                    paddingBottom: "4px",
                  }}
                >
                  {this.state.user}
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  style={{ marginTop: "4px" }}
                >
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Col>
                      {this.state.userCountry} - {this.state.userCity}
                    </Col>
                    {this.state.weatherEnable && (
                      <Col style={{ color: "#AB5C02" }}>
                        <WeatherIcon
                          style={{}}
                          name="owm"
                          iconId={this.state.weatherId.toString()}
                          flip="horizontal"
                          rotate="90"
                        />
                        <span style={{}}> {this.state.weatherDescription}</span>
                      </Col>
                    )}
                  </Row>
                </Card.Subtitle>
                <Card.Text
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderTop: "1px solid #dedcd7",
                    paddingTop: "2px",
                  }}
                >
                  <GiInfo />
                  Choose title for more info!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <Row
              style={{
                width: "100%",
                alignSelf: "auto",
                margin: "0",
                marginBottom: "1rem",
              }}
            >
              <Badge bg="dark">
                <Button
                  variant="outline-light"
                  size="lg"
                  active={this.state.RenderMovies}
                  onClick={() => this.setState({ RenderMovies: true })}
                >
                  <h1>Movies</h1>
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  active={!this.state.RenderMovies}
                  onClick={() => this.setState({ RenderMovies: false })}
                >
                  <h1>Tv-shows</h1>
                </Button>
              </Badge>
            </Row>
            <Row>
              {this.state.RenderMovies && (
                <Stack direction="horizontal" gap={3}>
                  {this.state.PopularMovieIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.popularMovie}
                      country={this.state.userCountry}
                      title="popular movies"
                      isThisMovie={true}
                    ></MovieTableComponent>
                  )}

                  {this.state.RecommendedMovieIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.recommendedMovie}
                      country={this.state.userCountry}
                      title="movies for You"
                      isThisMovie={true}
                    ></MovieTableComponent>
                  )}

                  {this.state.PopularByCountryMovieIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.popularMovieByCountry}
                      country={this.state.userCountry}
                      title="popular movies in your country"
                      isThisMovie={true}
                    ></MovieTableComponent>
                  )}
                </Stack>
              )}
              {!this.state.RenderMovies && (
                <Stack direction="horizontal" gap={3}>
                  {this.state.PopularShowIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.popularShows}
                      country={this.state.userCountry}
                      title="popular tv-shows"
                      isThisMovie={false}
                    ></MovieTableComponent>
                  )}

                  {this.state.RecommendedShowIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.recommendedShows}
                      country={this.state.userCountry}
                      title="tv-shows for You"
                      isThisMovie={false}
                    ></MovieTableComponent>
                  )}

                  {this.state.PopularByCountryShowIsLoaded && (
                    <MovieTableComponent
                      movies={this.state.popularShowsByCountry}
                      country={this.state.userCountry}
                      title="popular tv-shows in your country"
                      isThisMovie={false}
                    ></MovieTableComponent>
                  )}
                </Stack>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;
