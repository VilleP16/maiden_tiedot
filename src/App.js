import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  
useEffect(() =>{
  console.log('effect')
  axios
  .get('https://restcountries.com/v3.1/all')
  .then(response => {
    console.log('promise fulfilled')
    console.log(response.data)
    setCountries(response.data)
  })
}, [])
console.log('render', countries.length, 'countries')


  return (
    <div>
      code here
    </div>
  )
}

export default App
