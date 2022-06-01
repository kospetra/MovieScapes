import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { baseUrl, urls } from "../utils/baseUrl";
import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { RiHeartsFill, RiKnifeBloodLine } from "react-icons/ri";
import { FaTheaterMasks } from "react-icons/fa";
import {
  GiJesterHat,
  GiPistolGun,
  GiMagicGate,
  GiDevilMask,
  GiWesternHat,
  GiMusicalNotes,
  GiCornerExplosion,
} from "react-icons/gi";
import movieScapeLogo from "../resources/movieScapeNoBack.png";
import movieScapeLogoBackground from "../resources/movieScapeBack.png";

function FacebookLoginComponent() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");
  const [status, setStatus] = useState("");
  const [redirectNow, setRedirectNow] = useState(false);
  const [genres] = useState([]);
  const [disableRomance, setDisableRomance] = useState(false);
  const [disableComedy, setDisableComedy] = useState(false);
  const [disableDrama, setDisableDrama] = useState(false);
  const [disableAction, setDisableAction] = useState(false);
  const [disableMusical, setDisableMusical] = useState(false);
  const [disableThriller, setDisableThriller] = useState(false);
  const [disableFantasy, setDisableFantasy] = useState(false);
  const [disableHorror, setDisableHorror] = useState(false);
  const [disableWestern, setDisableWestern] = useState(false);
  const [chosenGenres, setChosenGenres] = useState(false);

  const responseFacebook = (response) => {
    console.log(response);
    console.log(chosenGenres);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(response);    
    localStorage.setItem("token", response.accessToken);

    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const moveToNewPage = () => {
    //TODO: ovdje je potrebno pozvat bazu i dodat korisnikove zanrove koje zeli
    console.log("moveToNewPage---");
    console.log(genres);
    console.log(data.name);
    console.log(data.accessToken);
    console.log(data.email)

    const user = {
      fullName: data.name,
      email: data.email,
      authToken: data.accessToken,
      favouriteGenres: genres
    };

    console.log(user);
    axios
    .post(baseUrl + urls.registerNewUser, user)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      setStatus(res.status);
      console.log(status);
      setRedirectNow(true);
    })
    .finally((res) => {
      console.log(res);
      console.log("error kod registracije")
        loginUser(user);
        console.log("status greske")
    });

  };

  const loginUser = (user) => {
    let loginUser = {
      email:user.email,
      authToken:user.authToken
    }
    console.log(loginUser)
    axios.post(baseUrl + urls.loginUser, loginUser)
    .then((res) => {
      console.log(res);
      setRedirectNow(true);
      setStatus(res.status);
      console.log(status);
    }).catch((err) => {
      console.error(err);
    })
  }

  const addToList = (res) => {
    genres.push(res);
    setChosenGenres(true);
    console.log(chosenGenres);
    console.log(genres);
    // eslint-disable-next-line default-case
    switch (res) {
      case "Romance":
        setDisableRomance(true);
        break;
      case "Comedy":
        setDisableComedy(true);
        break;
      case "Drama":
        setDisableDrama(true);
        break;
      case "Action":
        setDisableAction(true);
        break;
      case "Musical":
        setDisableMusical(true);
        break;
      case "Thriller":
        setDisableThriller(true);
        break;
      case "Western":
        setDisableWestern(true);
        break;
      case "Horror":
        setDisableHorror(true);
        break;
      case "Fantasy":
        setDisableFantasy(true);
        break;
    }
  };

  return redirectNow ? (
    <Redirect to="/home" />
  ) : (
    <div className="container" style={{ justifyContent: "space-around" }}>
      {!login && (
        <div>
          <h1
            style={{
              color: "#CEC9C9",
              marginBottom: "5%",
            }}
          >
            Login to access{" "}
            <img
              style={{ width: "30%" }}
              src={movieScapeLogo}
              alt="MovieScape logo"
            />
          </h1>
          <FacebookLogin
            appId="431342871683159"
            autoLoad={false}
            fields="name,email,picture"
            scope="public_profile,email,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
          />
        </div>
      )}

      {login && (
        <div>
          <Image
            src={movieScapeLogoBackground}
            style={{ width: "30%", alignSelf: "flex-end" }}
          />

          <div
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Stack
              direction="horizontal"
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "0px",
              }}
              gap={3}
            >
              <div
                className="card-body"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginLeft: "0px",
                }}
              >
                <Stack
                  direction="horizontal"
                  gap={2}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginLeft: "0",
                  }}
                >
                  <img className="rounded" src={picture} alt="Profile" />
                  <Stack direction="vertical" gap={2}>
                    <div style={{ marginTop: "40%" }}>
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">Email: {data.email}</p>
                    </div>
                    <h5 className="card-title" style={{ marginTop: "20%" }}>
                      {" "}
                      Choose preferred genres:{" "}
                    </h5>
                  </Stack>
                </Stack>
              </div>
              <Container fluid="xs">
                <Row className="align-items-md-center">
                  <Badge bg="dark">
                    <Row
                      className="align-items-md-center"
                      style={{
                        rowGap: "20px",
                      }}
                    >
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableRomance}
                          variant={disableRomance ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Romance")}
                        >
                          <RiHeartsFill /> Romance
                        </Button>
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                            background: "white",
                          }}
                          disabled={disableComedy}
                          variant={disableComedy ? "outline-dark" : "light"}
                          size="lg"
                          bg="light"
                          text="dark"
                          onClick={() => addToList("Comedy")}
                        >
                          <GiJesterHat /> Comedy
                        </Button>
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableDrama}
                          variant={disableDrama ? "outline-dark" : "light"}
                          size="lg"
                          bg="light"
                          text="dark"
                          onClick={() => addToList("Drama")}
                        >
                          <FaTheaterMasks /> Drama
                        </Button>
                      </Col>
                    </Row>
                    <Row
                      className="align-items-md-center"
                      style={{
                        rowGap: "20px",
                      }}
                    >
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableAction}
                          variant={disableAction ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Action")}
                        >
                          <GiPistolGun /> Action
                        </Button>{" "}
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableFantasy}
                          variant={disableFantasy ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Fantasy")}
                        >
                          <GiMagicGate /> Fantasy
                        </Button>
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableHorror}
                          variant={disableHorror ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Horror")}
                        >
                          <GiDevilMask /> Horror
                        </Button>
                      </Col>
                    </Row>
                    <Row
                      className="align-items-md-center"
                      style={{
                        rowGap: "20px",
                      }}
                    >
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableWestern}
                          variant={disableWestern ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Western")}
                        >
                          <GiWesternHat /> Western
                        </Button>
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableThriller}
                          variant={disableThriller ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Thriller")}
                        >
                          <RiKnifeBloodLine /> Thriller
                        </Button>
                      </Col>
                      <Col
                        style={{
                          margin: "10px",
                          backgroundColor: "white",
                        }}
                      >
                        {" "}
                        <Button
                          style={{
                            margin: "10px",
                          }}
                          disabled={disableMusical}
                          variant={disableMusical ? "outline-dark" : "light"}
                          size="lg"
                          text="dark"
                          onClick={() => addToList("Musical")}
                        >
                          <GiMusicalNotes /> Musical
                        </Button>
                      </Col>
                    </Row>
                  </Badge>
                </Row>
              </Container>
              <Button
                onClick={moveToNewPage}
                variant="dark"
                disabled={!chosenGenres}
                style={{
                  margin: "10px",
                  marginLeft: "8%",
                  marginRight: "5%",
                }}
              >
                {" "}
                Continue{" "}
              </Button>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacebookLoginComponent;
