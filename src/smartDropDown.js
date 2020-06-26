import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function DropDown(props) {
  const node = useRef();
  const [displayMenu, setDisplayMenu] = useState(false);
  const [selectValue, setSelect] = useState('');
  const [searchTerm, setSearch] = useState('');
  const [size, setSize] = useState(props.size);
  const [add, setAdd] = useState(false);
  let [searchResults, setsearchResults] = React.useState([]);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setDisplayMenu(false);
  };

  const handleSearchTextChange = (e) => {
    setSearch(e.target.value);
  }

  useEffect(()=>{
    if (displayMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[displayMenu])
  
  useEffect(() => {
    let results = [];
    if (searchTerm != "") {
      results = props.countries.filter(country =>
        (country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setsearchResults(results);
  }, [searchTerm]);

  const handleSelect = (event) => {
    setDisplayMenu(false)
    let val = event.target.dataset.value;
    setSelect(val);
  }

  const handleMore = (event) => {
    setSize(props.countries.length);
  }
  const addCountry = () =>{
    setAdd(true);
    props.countries.unshift({name:searchTerm});
  }
  debugger;
  let countries = add ? props.countries : (searchResults.length > 0 ? searchResults : props.countries);
  const countriesList = countries.slice(0, size).map((item, i) => {
    return (
      <div className="li" key={i} data-value={item.name} onClick={handleSelect}>{item.name}</div>
    );
  });
  return (
    <div ref={node} className="dropdown">
      <div className="button" onClick={(e) => setDisplayMenu(!displayMenu)}> {selectValue ? selectValue : "Select Country"}  </div>
      {displayMenu ? (
        <>
          <div className="ul" >
            <input className="searchBox" type="text" placeholder="Search" value={searchTerm}
              onChange={(e) => handleSearchTextChange(e)} />
              {countriesList.length>0 ? countriesList :
              <div className="notFound">{searchTerm} not found 
              {props.role=="admin" ?
              <button className="addBtn" onClick={addCountry}>Add & Select</button> : ''
              }</div>}
               {/* {countriesList} */}
            <button className="moreBtn" type="button" onClick= {handleMore}> {props.countries.length - props.size} more</button>
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