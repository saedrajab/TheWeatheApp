import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import TimeSliderComponent from "./timeSliderComponent";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import moment from "moment";
import { connect } from "react-redux";

const useStyles = makeStyles({
  card: {
    maxWidth: 400
  },
  media: {
    height: 150
  }
});

function WeatherCard(props) {
  const classes = useStyles();
  let forecastDataLength = props.forecastData.forecast.length;
  const max = new Date(
    props.forecastData.forecast[forecastDataLength - 1].dt_txt
  );
  const maxSliderValue = moment(
    props.forecastData.forecast[forecastDataLength - 1].dt_txt
  ).format("H");
  const maxSlider = max.setHours(maxSliderValue, 50, 50, 50);
  const [timeSliderValue, setTimeSliderValue] = React.useState(maxSlider);
  let selectedTimeSlot = props.cardTimeSlot;
  let selectedCardDateTitle = moment(props.cardDate).format("D MMMM YY");
  if (timeSliderValue !== maxSlider) {
    selectedTimeSlot = timeSliderValue;
    selectedCardDateTitle = moment(timeSliderValue).format("D MMMM YY, h A");
  }

  function getDayAverageTemprature(data) {
    let averageValue = "";
    if (props.radioButtonVaue === "fahrenheit") {
      averageValue = data.reduce((average, vaue) => {
        return Math.round(average + vaue.main.temp_min + vaue.main.temp_max);
      }, 0);
    } else {
      averageValue = data.reduce((average, vaue) => {
        let min_cel = Math.round((vaue.main.temp_min - 32) / 1.8);
        let max_cel = Math.round((vaue.main.temp_max - 32) / 1.8);
        return Math.round(average + min_cel + max_cel);
      }, 0);
    }

    let divisinValue = data.length * 2;
    return Math.round(averageValue / divisinValue);
  }

  function getTimeSlotAverageTemprature(data) {
    let averageValue = 1;
    if (props.radioButtonVaue === "fahrenheit") {
      averageValue = Math.round(data.main.temp_min + data.main.temp_max);
    } else {
      let min_cel = Math.round((data.main.temp_min - 32) / 1.8);
      let max_cel = Math.round((data.main.temp_max - 32) / 1.8);
      averageValue = Math.round(min_cel + max_cel);
    }

    return Math.round(averageValue / 2);
  }

  function getSelectedTimeSlotData(data, selectedTimeSlot) {
    let selectedData = "";
    let selectedTimeSlotStr = moment(selectedTimeSlot).format("H");
    for (let i = 0; i < data.length; i++) {
      let dateStr = moment(data[i].dt_txt).format("H");
      if (selectedTimeSlotStr === dateStr) {
        selectedData = data[i];
      }
    }

    return selectedData;
  }

  function getDayAverageHumidity(data) {
    let averageValue = data.reduce((average, vaue) => {
      return Math.round(average + vaue.main.humidity);
    }, 0);
    let divisinValue = data.length;
    return Math.round(averageValue / divisinValue);
  }
  function getDayAverageWind(data) {
    let averageValue = data.reduce((average, vaue) => {
      return Math.round(average + vaue.wind.speed);
    }, 0);
    let divisinValue = data.length;
    return Math.round(averageValue / divisinValue);
  }
  function getTempratureUnit() {
    return props.radioButtonVaue === "fahrenheit" ? "°F" : "°C";
  }

  function getTempratureValue() {
    let value = "";
    if (selectedTimeSlot === "day") {
      value = getDayAverageTemprature(props.forecastData.forecast);
    } else {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      value = getTimeSlotAverageTemprature(selectedData);
    }
    let textUnit = getTempratureUnit();
    return value + textUnit;
  }
  function getHumidityValue() {
    let value = 0;
    if (selectedTimeSlot === "day") {
      value = getDayAverageHumidity(props.forecastData.forecast);
    } else {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      value = selectedData.main.humidity;
    }

    return `${value}%`;
  }

  function getSeaLevel() {
    let value = 0;
    if (selectedTimeSlot === "day") {
      value = getDayAverageHumidity(props.forecastData.forecast);
    } else {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      value = selectedData.main.sea_level;
    }

    return `${value}%`;
  }

  function getWindValue() {
    let value = 0;
    let unit = props.radioButtonVaue === "fahrenheit" ? "mph" : "meter/sec";
    if (selectedTimeSlot === "day") {
      value = getDayAverageWind(props.forecastData.forecast);
    } else {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      value = Math.round(selectedData.wind.speed);
    }
    return value + " " + unit;
  }

  function getWeatherDescription() {
    let descrption = "";
    if (selectedTimeSlot !== "day") {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      descrption = selectedData.weather[0].description;
    }
    return descrption;
  }
  function getWatherIcon() {
    let iconId = "804";
    if (selectedTimeSlot === "day") {
      iconId = props.forecastData.forecast[0].weather[0].id;
    } else {
      let selectedData = getSelectedTimeSlotData(
        props.forecastData.forecast,
        selectedTimeSlot
      );
      iconId = selectedData.weather[0].id;
    }
    return iconId;
  }
  const tempratureValue = getTempratureValue();
  const humidityValue = getHumidityValue();
  const windValue = getWindValue();
  const tempratureDescriptionText = getWeatherDescription();
  const weatherIconId = getWatherIcon();
  const sea_level = getSeaLevel();

  const timeSliderChange = (event, newValue) => {
    setTimeSliderValue(newValue);
  };

  return (
    <div className={props.className}>
      <Card className={classes.card}>
        <CardActionArea>
          <div className="weatherCardHeader">
            <span className="weatherCardHeaderDate">
              {moment(props.cardDate).format("dddd")}
            </span>
            <span className="weatherCardHeaderDate">
              {selectedCardDateTitle}
            </span>
          </div>
          <CardContent
            onClick={() => {
              props.cardOnClickHandler({
                cityName: props.cityName,
                forecastData: props.forecastData,
                titleDate: props.cardDate,
                seletedItem: props.cardNumber,
                timeSlot: selectedTimeSlot
              });
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              <span style={{ color: "rgb(29, 123, 123)", fontWeight: "bold" }}>
                {props.cityName}{" "}
              </span>
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ color: "#545151", fontSize: "46px" }}>
                  {" "}
                  {tempratureValue}
                </h1>
              </div>
              <div>
                <i
                  className={`weatherIcon wi wi-owm-${weatherIconId} main-icon`}
                />
              </div>
            </div>
            <CssBaseline />
            <div>
              <div>
                Humidity: <span>{humidityValue}  {tempratureDescriptionText} </span>
              </div>
              <div>
                <br/>Wind: <span> {windValue} </span>
              </div>
              <div>
			  <br/>Sea Level: <span>{sea_level}</span>
              </div>
            </div>
            <CssBaseline />
            <TimeSliderComponent
              timeSliderValue={timeSliderValue}
              forecastData={props.forecastData}
              onclickHandler={timeSliderChange}
            />
          </CardContent>
          <CssBaseline />
        </CardActionArea>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    radioButtonVaue: state.radioButtonVaue
  };
};

export default connect(mapStateToProps, null)(WeatherCard);
