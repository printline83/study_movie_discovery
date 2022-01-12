import React from 'react'
import '../style/Search.scss'
import { useState } from 'react'
import validationObject from '../functions/validation';
import { types } from '../data/constant';
import { useDispatch } from 'react-redux';
import { getMovies } from '../modules/movies';

const Search = () => {

  const years = []
  for (let y = new Date().getFullYear(); y >= 2000 ; y--) {
    years.push(y)
  }

  const [inputs, setInputs] = useState({
    title: '',  
    type: '', 
    year: new Date().getFullYear()
  });

  const chnageInputGroup = e => setInputs({
    ...inputs, 
    [e.target.name]: e.target.value
  });

  const dispatch = useDispatch();
  const checkApply = () => {
    const [result, msg] = validationObject(inputs, {
      title: '제목을 입력해주세요.', 
      // type: '장르를 선택해주세요.',
      // year: '연도를 선택해주세요.'
    });
    if (! result) { alert(msg); return; } 
    dispatch(getMovies(inputs));
  }

  return (
    <div className="search">
      <div className="text-field">
        <input 
          type="text" 
          name="title" 
          value={inputs.title} 
          onChange={chnageInputGroup} 
          placeholder="Search for Movies, Series & more" 
        />
      </div>

      <div className="select">
        <select 
          name="type"
          key={inputs.type} 
          defaultValue={inputs.type} 
          onChange={chnageInputGroup}
        >
          {types.map((type, idx) => <option key={idx} value={type.toLowerCase()}>{type}</option>)}
        </select>
      </div>

      <div className="select">
        <select 
          name="year"
          key={inputs.year} 
          defaultValue={inputs.year} 
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