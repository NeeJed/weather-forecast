import './App.css';
import { Component } from 'react';

const PLACES = [
  { name: "Zalzburg", zip: "94060" },
  { name: "San Francisco", zip: "94102" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <header>
          {PLACES.map((place, index) => (
            <button
              key = {index}
              onClick = {() => {
                this.setState({ activePlace: index });
              }}
          >
            {place.name}
          </button>
          ))}
        </header>

        <div className="WeatherContainer">
        <WeatherDisplay
          key = {activePlace} 
          zip = {PLACES[activePlace].zip} 
        />
        </div>
      </div>
    );
  }
}

class WeatherDisplay extends Component {

  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    zip +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Загрузка...</div>
    const weather = weatherData.weather[0];
    const iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png";
  
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src = {iconURL} alt = {weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    )
  }
}

export default App;