import axios from "axios";
import React from "react";
import { Image, Modal, Stack } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { baseUrl, urls } from "../utils/baseUrl";

class MovieInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      ShowMovieInfo: true,
      Rating: 0, // initial rating value
      AvarageRating: 0,
      Details: {},
      videoId: "",
    };
  }

  componentDidMount() {
    console.log(this.props.dataAboutMovie);
    this.props.isThisMovie ? this.getMovieDetails() : this.getShowDetails();
  }

  getMovieDetails = () => {
    axios
      .get(
        baseUrl +
          urls.getMovieDetails +
          "/" +
          this.props.dataAboutMovie.movieId +
          "/" +
          this.props.country
      )
      .then((res) => {
        console.log("Detaljne informacije: ");
        console.log(res);
        this.setState({ Details: res.data });
        console.log(this.state.Details);
        this.setState({ videoId: this.props.dataAboutMovie.movieId });
        this.getVideoGrades(this.props.dataAboutMovie.movieId);
      });
  };

  getShowDetails = () => {
    axios
      .get(
        baseUrl +
          urls.getShowDetails +
          "/" +
          this.props.dataAboutMovie.showId +
          "/" +
          this.props.country
      )
      .then((res) => {
        console.log("Detaljne informacije: ");
        console.log(res);
        this.setState({ Details: res.data });
        console.log(this.state.Details);
        this.setState({ videoId: this.props.dataAboutMovie.showId });
        this.getVideoGrades(this.props.dataAboutMovie.showId);
      });
  };

  getVideoGrades = (id) => {
    console.log(id);
    this.getAverage(id);
    this.getUsers(id);
  };

  getAverage = (id) => {
    axios
    .get(baseUrl + urls.averageRatingOfData + "/" + id)
    .then((res) => {
      console.log("average:");
      console.log(res);
      this.setState({ AvarageRating: res.data.rating * 20 });
      console.log(this.state.AvarageRating);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getUsers = (id) => {
    axios
      .get(baseUrl + urls.ratingOfData + "/" + id, {
        headers: {
          Authorization: this.state.token,
        },
      })
      .then((res) => {
        console.log("od korisnika");
        console.log(res);
        this.setState({ Rating: res.data.rating * 20 });
        console.log(this.state.Rating);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Catch Rating value
  handleRating = (rate) => {
    this.setState({ Rating: rate });
    let grade = rate / 20;
    console.log(grade);
    console.log(this.state.token);
    axios
      .post(
        baseUrl + urls.ratingOfData + "/" + this.state.videoId + "/" + grade,
        {},
        {
          headers: {
            Authorization: this.state.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.getAverage(this.state.videoId)
      })
      .catch((error) => {
        console.error(error);
      });
   };

  LgShow = () => {
    this.props.setInfoFalse();
    this.setState({ ShowMovieInfo: false });
  };

  render() {
    return (
      <Modal
        size="lg"
        show={this.state.ShowMovieInfo}
        onHide={() => this.LgShow()}
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          overlay: { background: "#B6ABA9" },
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {this.state.Details.title}, ({this.state.Details.year})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="horizontal" gap={3}>
            <Image
              thumbnail
              style={{
                width: "300px",
              }}
              alt="text slike"
              src={this.props.dataAboutMovie.coverUrl}
            ></Image>
            <Stack direction="vertical" gap={2}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#5e5d59",
                }}
              >
                {this.state.Details.description}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: "#5e5d59",
                  borderBottom: "2px solid #babfbb",
                  marginTop: "6%",
                }}
              >
                <span>Genres: </span>
                {this.props.dataAboutMovie.genres.map((data, id) => (
                  <span id={id}>{data.name} </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "20px" }}>Rate this show:</span>
                <span style={{ paddingLeft: "10px" }}>
                  <Rating
                    onClick={this.handleRating}
                    ratingValue={this.state.Rating} /* Available Props */
                  />
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "20px" }}>Average grade:</span>
                <span style={{ paddingLeft: "10px" }}>
                  <Rating
                    readonly
                    onClick={this.handleRating}
                    ratingValue={this.state.AvarageRating} /* Available Props */
                  />
                </span>
              </div>
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MovieInfoComponent;
