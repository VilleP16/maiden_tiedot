import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) =>{
    const api_key = process.env.REACT_APP_API_KEY
    const [capitalWeather, setCapitalWeather] = useState()
    
    useEffect(() => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}`)
        .then(response =>{
          //console.log('response data',response.data)
          setCapitalWeather(response.data)
          //console.log('Capital weather state', capitalWeather)
                 
        })
    }, [])
  
    if(!capitalWeather){
      console.log('palautti nullin')
      return null
    }else{
      console.log('palautti tiedot')
      return(
        <div>
          <h2>Weather in {props.capital}</h2>
          <p>Temperature: {(capitalWeather.main.temp - 273.15).toFixed(2) } Celcius</p>
          <p>Wind speed: {capitalWeather.wind.speed} m/s</p>
          <p>Weather conditions: <b>{capitalWeather.weather[0].description}</b></p>
          <img src={`http://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} alt="weather icon"/>
        </div> 
      )
    } 
  }
  export default Weather