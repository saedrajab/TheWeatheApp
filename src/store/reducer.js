const initialState = {
  initialLoad: true,
  radioButtonVaue: "fahrenheit",
  city: "Munich",
  weatherData: ""
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        initialLoad: false,
        weatherData: action.data
      };
    case "UPDATE_TEMPARATURE_TYPE":
      return {
        ...state,
        radioButtonVaue: action.data
      };
    default:
      return state;
  }
};

export default reducer;