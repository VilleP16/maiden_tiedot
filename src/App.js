import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterCountryList from './components/FilterCountryList'
import CountryList from './components/CountryList'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filterCountriesBy, setFilterCountriesBy] = useState('')
  

  const handleFilterChange = (event) => {
    setFilterCountriesBy(event.target.value)
  }

  const showClickedCountry = value => () =>{
    //console.log('value',value)
    setFilterCountriesBy(value)
  }

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])
  //console.log('render', countries.length, 'countries')

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
export default App
