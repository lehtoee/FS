import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ShowableLanguages = ({language}) => {
  return(
    <li>{language}</li>
  )
  
}

const ShowableData = (props) => {

  if(props.includedCountries.length < 11 && props.includedCountries.length > 1){
    
    return(
      <div>{props.includedCountries.map(matchingCountry => <div key={matchingCountry.name.common}>{matchingCountry.name.common}</div>)}</div>
    )
  }
  else if(props.includedCountries.length === 1){
    const languageArray = Object.values(props.includedCountries[0].languages)

    return(
      <div>
        <h1>{props.includedCountries[0].name.common}</h1>
        <div>capital {props.includedCountries[0].capital}</div>
        <div>region {props.includedCountries[0].region}</div>
        <h2>languages</h2>
        <ul>{languageArray.map(language =>
           <ShowableLanguages key={language} language={language}/>)}
        </ul>
        <img src={props.includedCountries[0].flags.png} alt='country flag'></img>
      </div>
    )
  }
  else if(props.search === ''){
    return(
      <div></div>
    )
  }
  else{
      return(
        <div>Too many matches, specify another filter</div>
      )
  }
 
}




function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <form>
        <div>find countries
          <input value={search}
          onChange={handleSearchChange}/>
        </div>
      </form>
      <ShowableData search={search} includedCountries={countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))}/>
    </div>
  )
}

export default App;
