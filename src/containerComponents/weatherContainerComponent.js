import React from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import HorizantalScrollCard from "./horizantalscrollingComponent";
import RadioButtonComponent from "../components/radioButtonComponent";

function WeatherContainerComponent(props) {
  return (
    <div className="radioButtonDiv">
      <RadioButtonComponent />
      <CssBaseline />
      <HorizantalScrollCard
        cityName={props.city}
        weatherData={props.weatherData}
        temperatureType={props.radioButtonVaue}
      />
      <CssBaseline />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    radioButtonVaue: state.radioButtonVaue,
    city: state.city,
    weatherData: state.weatherData
  };
};

const mapDispachToProps = dispatch => {
  return {
    upDateWeatherData: responseData => {
      dispatch({ type: "GET_DATA", weatherData: responseData });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(WeatherContainerComponent);
