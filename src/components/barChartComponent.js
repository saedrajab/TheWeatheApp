import React from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import moment from "moment";
import {connect} from "react-redux";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function WeatherBarChart(props){
	const barChartDataArray=props.barChartConfigData.forecastData;	

	function setBarchartdatapoints(){
		let dataPoints=[];
		barChartDataArray.forecast.forEach((record)=>{
			let timeLabel=moment(record.dt_txt).format("h A");			
			let averageValue="";
			if(props.temperatureType !== "fahrenheit"){
				let min_cel=Math.round((record.main.temp_min-32)/1.8);
				let max_cel=Math.round((record.main.temp_max-32)/1.8);
				averageValue= Math.round(min_cel+max_cel);				
			}else{
				averageValue= Math.round(record.main.temp_min+record.main.temp_max);
			}
			averageValue=averageValue/2;			
			dataPoints.push({label:timeLabel, y:Math.round(averageValue)})
		});		
		return dataPoints;
	}
	let unit=(props.radioButtonVaue === 'fahrenheit')?'°F':'°C';	
	const options = {
			title: {
				text: props.barChartConfigData.titleDate,
				horizontalAlign:"center",
				fontColor:"#00ff00"
			},
			height: 500,
			axisY: {
			    gridThickness: 0,
			    tickLength:0,
			     lineThickness:0,
			     valueFormatString:" "
			},
			axisX:{		       
		       tickLength: 0,		       
		       lineThickness:0		       
		     },
		     toolTip:{
			   content:"{label} : {y}"+unit ,
			 },
			animationEnabled: true,
			data: [
			{				
				type: "column",
				dataPoints: setBarchartdatapoints()
			}
			]
		}

		return (
			<div>				
				<CanvasJSChart options = {options} 					
				/>				
			</div>
		);
}

const mapStateToProps=(state)=>{
	return {radioButtonVaue:state.radioButtonVaue}
}

export default connect(mapStateToProps)(WeatherBarChart)