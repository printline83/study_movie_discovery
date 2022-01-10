import React from 'react'
import '../style/Search.scss'
import { useState } from 'react'
import validationObject from '../functions/validation';
import { types, init } from '../data/constant'

const Search = () => {
  const [inputGroup, setInputGroup] = useState(init);
  const years = []
  for (let y = new Date().getFullYear(); y >= 2000 ; y--) {
    years.push(y)
  }
  const chnageInputGroup = e => {
    setInputGroup({
      ...inputGroup,
      [e.target.name]: e.target.value
    });
  }
  const checkApply = () => {
    const [result, msg] = validationObject(inputGroup, {
      keyword: '키워드를 입력해주세요.', 
      genre: '장르를 선택해주세요.',
      year: '연도를 선택해주세요.'
    });
    if (! result) { 
      alert(msg);
      return;
    }
  }
  return (
    <div className="search">
      <div className="text-field">
        <input 
          type="text" 
          name="keyword" 
          value={inputGroup.keyword} 
          onChange={chnageInputGroup} 
          placeholder="Search for Movies, Series & more" 
        />
      </div>

      <div className="select">
        <select 
          name="genre"
          defaultValue={types[0]} 
          key={inputGroup.genre} 
          defaultValue={inputGroup.genre} 
          onChange={chnageInputGroup}
        >
          {types.map((type, idx) => <option key={idx} value={type.toLowerCase()}>{type}</option>)}
        </select>
      </div>

      <div className="select">
        <select 
          name="year"
          key={inputGroup.year} 
          defaultValue={inputGroup.year} 
          onChange={chnageInputGroup}
        >
          {years.map((year, idx) => <option key={idx} value={year}>{year}</option>)}
        </select>        
      </div>

      <button className="btn" onClick={checkApply}> Apply </button>
    </div>
  )
}

export default Search