import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../style/MovieDetail.scss'
import Loader from './Loader'

import { getMovie } from '../modules/movie';
import { setLike } from '../modules/liked';
import { getLikes } from '../modules/likes';


const MovieDetail = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {movie, liked, likes} = useSelector(state => state);
  const {data, loading, error} = movie;
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(getLikes());
  }, []);
  
  if (error) { 
    console.log(error); 
    return; 
  }

  const iLike = () => {
    if (liked.data) return;
    dispatch(setLike(id));
  }

  const likeState = likes.data.indexOf(id) > -1 ? true : false;
  function requestDifferentSizeImage(url, size=700) {
    if (!url) {
      return ""
    }
    const src = url.replace("SX300", `SX${size}`)
    const img = document.createElement('img')
    img.src = src
    img.addEventListener('load', () => {
      if (imageLoading) setImageLoading(false);
    })
    return src
  }

  return (
    <div className="container">
      {
        loading
        
        ?  // 로딩중인 경우
        <div className="skeleton-loader">
          <div className="poster">

          </div>
          <div className="skeletons">
            <div className="skeleton title"></div>
            <div className="skeleton specs"></div>
            <div className="skeleton plot"></div>
            <div className="skeleton etc"></div>
            <div className="skeleton etc"></div>
            <div className="skeleton etc"></div>
          </div>
          <Loader absolute />
        </div>
        
        :  // 로딩이 끝난 경우
        <div className="movie-details">
          <div 
            className="poster"
            style={{ backgroundImage: `url(${requestDifferentSizeImage(data?.Poster)})` }}>
            {
              imageLoading
              ? <Loader scale=".7" absolute />
              : null
            }
            <div className={`like ${liked.data || likeState ? 'noselect liked' : ''}`} onClick={iLike}>
              <span>♥</span>
            </div>
          </div>

          <div className="specs">

            <div className="title">
              {data?.title}
            </div>

            <div className="labels">
              <span>
                {data?.Released}
              </span>
              <span className="dot">·</span>
              <span>
                {data?.Runtime}
              </span>
              <span className="dot">·</span>
              <span>
                {data?.Country}
              </span>
            </div>
            <div className="plot">
              {data?.Plot}
            </div>
            <div className="ratings">
              <h3>Ratings</h3>
              <div className="rating-wrap">
                {
                  data.Ratings !== undefined && data.Ratings.length > 0 
                  ? data.Ratings.map((v, i) => (
                    <div
                      title={v.Source}  
                      className="rating"
                      key={i}>
                      <img
                        src={`/assets/${v.Source}.png`}  
                        alt={v.Source}  
                        height="30" />
                      <span>
                        {v.Value}
                      </span>
                    </div>
                  ))
                  : null
                }
              </div>
            </div>
            <div>
              <h3>Actors</h3>          
              {data?.Actors}
            </div>
            <div>
              <h3>Director</h3>
              {data?.Director}
            </div>
            <div>
              <h3>Production</h3>
              {data?.Production}
            </div>
            <div>
              <h3>Genre</h3>
              {data?.Genre}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default MovieDetail