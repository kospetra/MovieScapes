import { OverlayTrigger, Popover, Table, Tooltip } from "react-bootstrap";
import MovieInfoComponent from "./MovieInfoComponent";
import React, { createRef, useRef, useState } from "react";
import { GiInfo, GiNachos } from "react-icons/gi";

class MovieTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowMovieInfo: false,
      dataAboutMovie: {},
      rowToHover: null
    };
  }

  setRowToHover = (id) => {
    this.setState({rowToHover: id});
  }

  hideMovieInfo = () => {
    this.setState({ ShowMovieInfo: false });
  };

  getMovieInfo = (data) => {
    this.setState({ ShowMovieInfo: true, dataAboutMovie: data });
  };

  render() {
    return (
      <div>
        <Table
          borderless
          className="movie_table"
          style={{
            color: "white",
            background: "#152424",
          }}
        >
          <thead>
            <tr>
              <th></th>
              <th>Top 10 {this.props.title} </th>
            </tr>
          </thead>
          <tbody style={{ background: "#152424", color: "white" }}>
            {this.props.movies.map((data, i) => (
              <tr key={i}>
                <td style={{ border: "5px solid #152424" }} key={i + 10}>
                  {" "}
                  {i + 1}{" "}
                </td>
                <td
                  style={{
                    border: "5px solid #152424",
                    background: this.state.rowToHover === (i + 10) ? "#A9A9A9" :"#152424",
                  }}
                  onClick={() => this.getMovieInfo(data)}
                  onMouseEnter={() => this.setRowToHover(i+10)}
                  onMouseLeave={ () => this.setRowToHover(null)}
                >
                  {" "}
                  {data.title}{" "}
                </td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </Table>
        {this.state.ShowMovieInfo && (
          <MovieInfoComponent
            dataAboutMovie={this.state.dataAboutMovie}
            setInfoFalse={this.hideMovieInfo.bind()}
            country={this.props.country}
            isThisMovie={this.props.isThisMovie}
          ></MovieInfoComponent>
        )}
      </div>
    );
  }
}
export default MovieTableComponent;
