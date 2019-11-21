import React from "react";
import moment from "moment";
import Slider from '@material-ui/core/Slider';

export default function TimeSliderComponent(props){
	let forecastDataLength=props.forecastData.forecast.length;
	const min = new Date(props.forecastData.forecast[0].dt_txt);
	const max = new Date(props.forecastData.forecast[forecastDataLength-1].dt_txt);

	const minSliderValue=moment(props.forecastData.forecast[0].dt_txt).format("H");
	const maxSliderValue=moment(props.forecastData.forecast[forecastDataLength-1].dt_txt).format("H");
	const minSlider=min.setHours(minSliderValue, 0, 0, 0);	
	const maxSlider=max.setHours(maxSliderValue, 50, 50, 50);
	let marksList=[];
	function setTimeSliderMarks(){
		props.forecastData.forecast.forEach((record)=>{
			let timeLabel=moment(record.dt_txt).format("ha");
			let time=moment(record.dt_txt).format("H");
			marksList.push({value:min.setHours(time, 0, 0, 0), label:timeLabel})
		});
	}
	let time=moment(props.forecastData.forecast[forecastDataLength-1].dt_txt).format("H");
	setTimeSliderMarks();
	marksList.push({value:min.setHours(time, 50, 50, 50), label:""});

	return (
		<Slider key={props.forecastData.forecast.dt_txt}
		    value={props.timeSliderValue}				        		        
	        aria-labelledby="continuous-slider"				        
	        marks={marksList}
	        step={null}
	        min={minSlider}
	        max={maxSlider}	
	        onChangeCommitted={props.onclickHandler}		       
		/>	
	);


}