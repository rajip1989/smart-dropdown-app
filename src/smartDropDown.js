import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function DropDown(props) {
  const node = useRef();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectValue, setSelect] = useState('');
  const [searchTerm, setSearch] = useState('');
  const [size, setSize] = useState(props.size);
  const [add, setAdd] = useState(false);
  const [searchResults, setsearchResults] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  let countries = [], countriesList = [];

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDisplayMenu(false);
  };

  const handleSearchTextChange = (e) => {
    setAdd(false);
    setSearch(e.target.value);
    console.log(searchTerm, "searchterm");
    setIsSearch(true);
  }

  useEffect(() => {
    if (displayMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setIsSearch(false);
      setSearch('');
      setsearchResults([]);
      countries=[];
      countriesList=[];
      setSize(props.size);
    };
  }, [displayMenu])

  useEffect(() => {
    let results = [];
    if (searchTerm != "") {
      results = props.countries.filter(country =>
        (country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setsearchResults(results);
  }, [searchTerm]);

  const sortDataByKey = (arr, key, sortType = 'ASC') => {
    return arr.sort(function (a, b) {
      if (a[key].toLowerCase() < b[key].toLowerCase())
        return (sortType == 'ASC') ? -1 : 1;
      if (a[key].toLowerCase() > b[key].toLowerCase())
        return (sortType == 'ASC') ? 1 : -1;
      return 0;
    })
  }

  const handleSelect = (event) => {
    setDisplayMenu(false)
    let val = event.target.dataset.value;
    setSelect(val);
  }

  const handleMore = (event) => {
    setSize(props.countries.length);
  }
  const addCountry = () => {
    setAdd(true);
    props.countries.unshift({ name: searchTerm });
    setSelect(searchTerm);
    setIsSearch(false);
  }

  if (isSearch) {
    countries = searchResults.length > 0 ? searchResults : (add ? props.countries : '')
    if(searchTerm == '')
      countries = props.countries;
  }
  else
    countries = props.countries;
  if (countries.length > 0) {
    countriesList = sortDataByKey(countries, "name").slice(0, size).map((item, i) => {
      return (
        <div className="li" key={i} data-value={item.name} onClick={handleSelect}>{item.name}</div>
      );
    });
  }
  return (
    <div ref={node} className="dropdown">
      <div className="button" onClick={(e) => setDisplayMenu(!displayMenu)}> {selectValue ? selectValue : "Select Country"}  </div>
      {displayMenu ? (
        <>
          <div className="ul" >
            <input className="searchBox" type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => handleSearchTextChange(e)} />
            {countriesList.length > 0 ? countriesList : (searchTerm == '') ? props.countries :
              <div className="notFound">{searchTerm.toUpperCase()} not found
              {props.role == "admin" ?
                  <button className="addBtn" onClick={addCountry}>Add & Select</button> : null
                }</div>}
            { (searchTerm == '') ?
              <button className="moreBtn" type="button" onClick={handleMore}> {props.countries.length - size == 0 ? '' : `${props.countries.length - size} more` }</button>
            :  (isSearch && searchResults == 0) ? null :
            <button className="moreBtn" type="button" onClick={handleMore}> {props.countries.length - size == 0 ? '' : `${props.countries.length - size} more` }</button>
            }
          </div>
        </>
      ) :
        (
          null
        )
      }

    </div>

  );

}