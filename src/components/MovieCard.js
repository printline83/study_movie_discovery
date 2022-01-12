import React from 'react'
import { Link } from 'react-router-dom'

import '../style/MovieCard.scss'
import Loader from './Loader'


const MovieCard = ({movie}) => {
  let imageLoading = true

  if (movie?.Poster === 'N/A') {
    imageLoading = false
  } else {
    const img = document.createElement('img')
    img.src = movie?.Poster
    img.addEventListener('load', () => {
      imageLoading = false
    })
  }

  return (
    <Link to={`/movie/${movie?.imdbID}`} className="movie">
        {
          imageLoading
          ? <Loader scale=".5" absolute />
          : null
        }
      <div className="poster" style={{ backgroundImage: `url(${movie?.Poster})` }}>
        {
          movie?.Poster === 'N/A'
          ?
          <>
          OMDbAPI<br />
          N/A
          </>
          : null
        }
      </div>
      <div className="info">
        <div  className="poster" style={{ backgroundImage: `url(${movie?.Poster})` }}>
        </div>
        <div className="year">{movie?.Year}</div>
        <div className="title">{movie?.Title}</div>
      </div>
    </Link>
  )
}

export default MovieCard