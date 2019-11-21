import React, { Component } from "react";
import "./App.css";
import {
  CssBaseline,
  Container,
  Box
} from "@material-ui/core";
import ContainerComponent from "./containerComponents/containerComponent";
import axios from "axios";
import { connect } from "react-redux";
class App extends Component {
  async getApiData() {
    const apiUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40";
    await axios.get(apiUrl).then(res => {
      const responseData = res.data;
      this.props.upDateWeatherData(responseData);
    });
  }
  componentDidMount() {
    //setTimout laoding screen few secconds
    setTimeout(() => {
      this.getApiData();
    }, 3000);
  }
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container>
          <Box my={2}>{<ContainerComponent state={this.props} />}</Box>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialLoad: state.initialLoad,
    weatherData: state.weatherData
  };
};

const mapDispachToProps = dispatch => {
  return {
    upDateWeatherData: responseData => {
      dispatch({ type: "GET_DATA", data: responseData });
    }
  };
};
export default connect(mapStateToProps, mapDispachToProps)(App);
