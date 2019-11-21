import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {connect} from "react-redux";

function radioButtonComponent(props){	
	function radioButtonHandler(e){		
		props.updateTemparatureType(e.target.value);		
	}
	return (		
			<FormControl component="fieldset">
				<RadioGroup aria-label="position" name="position" value={props.radioButtonVaue} onChange={radioButtonHandler} row>
					<FormControlLabel
		          		value="celcius"
				        control={<Radio color="primary"  />}
				        label="Celcius"
				        labelPlacement="end"
		        	/>
		        	<FormControlLabel
		          		value="fahrenheit"
				        control={<Radio color="primary" />}
				        label="Fahrenheit"
				        labelPlacement="end"
		        	/>						
				</RadioGroup>
			</FormControl>
		);
}

const mapStateToProps=(state)=>{
  return {    
    radioButtonVaue:state.radioButtonVaue    
  }
}

const mapDispachToProps =(dispatch)=>{
 return {
    updateTemparatureType:(temparatureType)=>{
      dispatch({ type:"UPDATE_TEMPARATURE_TYPE", data:temparatureType});
    }
 }
}

export default connect(mapStateToProps,mapDispachToProps)(radioButtonComponent)