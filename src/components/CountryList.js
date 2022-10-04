import Weather from './Weather'

const CountryList = ({ countries, handleClick }) => {
    if (countries.length >= 10) {
      return (
        <p>Too many matches, please speficy another filter</p>
      )
    } else if (countries.length === 1) {
      return (
        <div>
          {countries.map((country) => {
            //console.log(country)
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
            //console.log(country)
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
        <Weather capital = {props.capital[0]}/>
      </div>
    )
  }

  export default CountryList