
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import '../style/MovieList.scss'
import Loader from './Loader'
import MovieCard from './MovieCard'

const MovieList = () => {
  const {data, loading, error} = useSelector(state => state.movies);
  if (error) { 
    console.log('에러가!!!!!!!!!!!!!!!'); 
    console.log(error); 
    return; 
  }
  return (
    <div className="movie-list">
      {
        loading
        ? <Loader />
        : (
          data.length > 0
          ? <div className="movies">{data.map(v => <MovieCard key={v.imdbID} movie={v} />)}</div>
          : <div className="message">Search for the movie title!</div>
        )
      }
    </div>
  )
}

export default MovieList