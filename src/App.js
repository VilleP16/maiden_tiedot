import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountriesBy, setFilterCountriesBy] = useState('')

  const handleFilterChange = (event) => {
    setFilterCountriesBy(event.target.value)
  }

  const showClickedCountry = value => () =>{
    console.log('heiiiii', value)
    setFilterCountriesBy(value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const countriesToShow = countries.filter(function (country) {

    return country.name.common.toLowerCase().includes(filterCountriesBy.toLowerCase())
  })
  
  return (
    <div>
      <FilterCountryList filterCountriesBy={filterCountriesBy} handleFilterChange={handleFilterChange} />
      <CountryList countries={countriesToShow} handleClick={showClickedCountry} />
    </div>
  )
}


const CountryList = ({ countries, handleClick }) => {
  if (countries.length >= 10) {
    return (
      <p>Too many matches, please speficy another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map((country) => {
          console.log(country)
          return <CountryWithDetails
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flag={country.flags.png}
            key={country.name.official} />
        })}
      </div>
    )
  } else {
    return (
      <div>
        {countries.map((country) => {
          console.log(country)
          return <Country name={country.name.common} handleClick = {handleClick} key={country.name.official} />
        })}
      </div>
    )
  }
}
const Country = (props) => {
  return (
    <div>
      {props.name}
      <button onClick={props.handleClick(props.name)}>Show</button>
    </div>
     
  )
}

const CountryWithDetails = (props) => {
  /* for (const [key, value] of Object.entries(props.languages)) {
    console.log(`${key}: ${value}`)
  } */
  //console.log(props.languages)
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Capital: {props.capital}</p>
      <p>Area: {props.area} Square km</p>
      <p>Languages:</p>
      <ul>
        {Object.keys(props.languages).map((key) => {
          return <li key ={key}>{props.languages[key]} </li>
        })}
      </ul>
      <img src={props.flag} alt='Country flag' />
    </div>
  )
}
const FilterCountryList = (props) => {
  return (
    <div>
      <p>Find countries: <input value={props.filterCountriesBy} onChange={props.handleFilterChange} /></p>
    </div>
  )

}

export default App
