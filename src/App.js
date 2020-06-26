import React, { useState, useEffect } from 'react';
import './App.css';
import SmartDropDown from './smartDropDown'
// function useFetch(url) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   async function fetchUrl() {
//     const response = await fetch(url);
//     const json = await response.json();
//     setData(json);
//     setLoading(false);
//   }
//   useEffect(() => {
//     fetchUrl();
//   }, []);
//   return [data, loading];
// }

function App() {
  const countriesList = [ 
    {name: 'India', code: 'IND'}, 
    {name: 'United States', code: 'US'}, 
    {name: 'Canada', code: 'CA'}, 
    {name: 'Algeria', code: 'DZ'}, 
    {name: 'Singapore', code: 'SG'}, 
    {name: 'Australia', code: 'AU'}, 
    {name: 'London', code: 'UK'}, 
    {name: 'Switzerland', code: 'SZ'}, 
    {name: 'Malaysia', code: 'ML'}, 
    {name: 'Bangladesh', code: 'BAN'}, 
    {name: 'Sri Lanka', code: 'SL'}, 
    {name: 'France', code: 'FR'}, 
    {name: 'Bahamas', code: 'BS'}, 
    {name: 'Bahrain', code: 'BH'}, 
];

  // const [countries, setCountries] = useState([]);

  // useEffect(()=>{
  //   // fetch('https://jsonplaceholder.typicode.com/users').then(data => {
  //   //   data.json();
  //   //   console.log(data.name, "data")
  //   // }).then(res => setCountries(res));
  //   setCountries(countriesList);
  // },[]);
  
  //console.log(countries, "countries")
  return (
    
    <div className="App">
    <SmartDropDown countries = {countriesList} size={5} role="admin"/>
    </div>
  );
}

export default App;
