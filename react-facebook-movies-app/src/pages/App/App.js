import "./App.css";
import React from "react";
import FacebookLoginComponent from "../../components/FacebookLogin";
import cinema from "../../resources/people-in-cinema.jpg";
import { Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      redirectNow: false,
    };
  }
  componentDidMount() {
    const tmp = this.state.token === null ? false : true;
    console.log({ tmp });
    console.log(this.state.token);
    this.setState({ redirectNow: tmp });
  }

  render() {
    return this.state.redirectNow ? (
      <Redirect to="/home" />
    ) : (
      <div
        className="App"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundImage: "url(" + cinema + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FacebookLoginComponent />
      </div>
    );
  }
}

export default App;
