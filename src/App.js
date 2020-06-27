import React, { useState, useEffect } from 'react';
import './App.css';
import SmartDropDown from './smartDropDown'
function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

function App() {
  const [countries, loading] =  useFetch("./countries.json");
  return (
    <div className="App">
    <SmartDropDown countries = {countries} size={5} role="admin"/>
    </div>
  );
}

export default App;
