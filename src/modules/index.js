import { combineReducers } from 'redux';
import movies from './movies';
import movie from './movie';
import liked from './liked';
import likes from './likes';
import likesDetail from './likesDetail';

const rootReducer = combineReducers({
  movies,
  movie,
  liked,
  likes,
  likesDetail
});

export default rootReducer;