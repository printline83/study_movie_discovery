import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLikesDetail } from '../modules/likesDetail';

import '../style/Recommend.scss'
import Loader from './Loader';
import MovieCard from './MovieCard'


const Recommend = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLikesDetail());
  }, [])

  return (
    <RecommendBelt/>
  )
}

const RecommendBelt = () => {
  const {data, loading, error} = useSelector(state => state.likesDetail);

  if (error) { 
    console.log(error); 
    return; 
  }
  return (
    <div className="recommend-belt">
      <div className="title">
        정대지가 좋아하는 영화 리스트
      </div>

      <div className="recommend-list">
        {
          loading
          ? <Loader />
          : (
            data.length > 0
            ? data.map(v => <MovieCard key={v.imdbID} movie={v} />)
            : null
          )
        }
      </div>
    </div>
  )
}

export default Recommend