import React, { useState } from "react";
import $ from "jquery";
import moment from "moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { connect } from "react-redux";
import WeatherBarChart from "../components/barChartComponent";
import WeatherCard from "../components/weatherCardComponent";

function HorizantalScrollCard(props) {
  const weatherData = props.weatherData.list;
  const barChartConfig = {};
  //const [cardLoadConfig, setLoadCardConfig]=useState({timeSlot:"day", seletedItem:"cardNumber_0"});
  const cardLoadConfig = { timeSlot: "day", seletedItem: "cardNumber_0" };
  const formatedData = {};
  const formatedDataArray = [];
  weatherData.forEach(data => {
    let weatherDate = moment(data.dt_txt).format("DD-MMM-YYYY");
    if (formatedData[weatherDate]) {
      formatedData[weatherDate].forecast.push(data);
    } else {
      formatedData[weatherDate] = { forecast: [] };
      formatedData[weatherDate].forecast.push(data);
      formatedDataArray.push({ weatherDate: formatedData[weatherDate] });
    }
  });

  function cardOnClickHandler(data) {
    setBarChartOptions(data);
    //setLoadCardConfig({timeSlot:data.timeSlot,seletedItem:data.seletedItem});
  }

  function scroll(direction) {
    var maxRange = $(".card-container").width();
    let far = ($(".card-container").width() / 2) * direction;
    let pos = $(".card-container").scrollLeft() + far;
    $(".card-container").animate({ scrollLeft: pos }, 1000);
    if (pos === 0) {
      $(".prev").hide();
      $(".next").show();
    } else if (pos >= maxRange) {
      $(".next").hide();
      $(".prev").show();
    } else {
      $(".next").show();
      $(".prev").show();
    }
  }
  let cardList = [];
  let i = 0;
  for (const key of Object.keys(formatedData)) {
    if (i === 0) {
      barChartConfig.cityName = props.cityName;
      barChartConfig.forecastData = formatedData[key];
      barChartConfig.titleDate = key;
    }
    cardList.push(
      <WeatherCard
        key={key}
        cityName={props.cityName}
        className="card"
        forecastData={formatedData[key]}
        cardDate={key}
        cardTimeSlot={cardLoadConfig.timeSlot}
        cardNumber={`cardNumber_${i}`}
        seletedItem={cardLoadConfig.seletedItem}
        temperatureType={props.temperatureType}
        cardOnClickHandler={cardOnClickHandler}
      />
    );
    i++;
  }

  const [barChartOptions, setBarChartOptions] = useState(barChartConfig);
  return (
    <div className="cardMainDiv">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span
            className="prev"
            style={{ display: "none" }}
            onClick={() => {
              scroll(-2);
            }}
          >
            <i className="material-icons rotateCalss prevNextIcon">
              arrow_right_alt
            </i>
          </span>
        </div>
        <div>
          <span
            className="next"
            onClick={() => {
              scroll(2);
            }}
          >
            <i className="material-icons prevNextIcon">arrow_right_alt</i>
          </span>
        </div>
      </div>
      <div className="wrapper">
        <div className="card-container">{cardList}</div>
      </div>
      <CssBaseline />
      <WeatherBarChart
        barChartConfigData={barChartOptions}
        temperatureType={props.radioButtonVaue}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    radioButtonVaue: state.radioButtonVaue
  };
};

export default connect(mapStateToProps, null)(HorizantalScrollCard);
