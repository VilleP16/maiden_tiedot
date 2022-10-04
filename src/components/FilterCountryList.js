const FilterCountryList = (props) => {
    return (
      <div>
        <p>Find countries: <input value={props.filterCountriesBy} onChange={props.handleFilterChange} /></p>
      </div>
    )
  
  }
  export default FilterCountryList