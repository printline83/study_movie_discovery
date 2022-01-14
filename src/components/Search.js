import React, { useRef } from 'react'
import '../style/Search.scss'
import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import validation, { addKeywords } from '../functions/search';
import { types } from '../data/constant';
import { useDispatch } from 'react-redux';
import { getMovies } from '../modules/movies';

const Search = () => {

  const years = ['Year'];
  for (let y = new Date().getFullYear(); y >= 2000 ; y--) {
    years.push(y)
  }

  const input = useRef(null);
  const [focus, setFocus] = useState(0);
  const [keywords, setKeywords] = useLocalStorage('keywords', []); 
  const [inputs, setInputs] = useState({
    title: '',  
    type: '', 
    year: ''
  });

  const chnageInputGroup = e => setInputs({
    ...inputs, 
    [e.target.name]: e.target.value === 'Year' ? 'All' : e.target.value
  });

  const dispatch = useDispatch();
  const search = () => {
    const [result, msg] = validation(inputs, {
      title: '제목을 입력해주세요.', 
      // type: '장르를 선택해주세요.',
    });
    if (! result) { alert(msg); return; } 
    setKeywords(addKeywords(inputs.title));
    dispatch(getMovies(inputs));
    input.current.blur(); // 검색 시 포커스 아웃
  }

  const moveKeywords = e => {
    if (e.keyCode === 40) {
      setFocus(state => keywords.length > state ? state + 1 : state);
    } else if (e.keyCode === 38) {
      setFocus(state => 0 < state ? state - 1 : state);
    } else if (e.keyCode === 13) {
      search();
    }
  }
 
  return (
    <div className="search">
      <div className="text-field">
        <input 
          type="text" 
          name="title" 
          ref={input}
          value={inputs.title} 
          onChange={chnageInputGroup}
          onFocus={() => setFocus(0)} 
          onKeyDown={moveKeywords}
          placeholder="Search for Movies, Series & more" 
        />
        <div className="keywords">
          <ul>
            {
              keywords.length === 0
              ? null
              : keywords.map((v, i) => (
              <li className={i+1 === focus ? 'focus' : ''} key={i}>
                {i+1 === focus && inputs.title !== v ? setInputs({...inputs, title: v}) : null}
                <input type="text" defaultValue={v} />
              </li>))
            }
          </ul>
        </div>
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
          {years.map((year, idx) => <option key={idx} value={year === 'Year' ? 'All' : year}>{year}</option>)}
        </select>        
      </div>

      <button className="btn" onClick={search}> Apply </button>
    </div>
  )
}

export default Search