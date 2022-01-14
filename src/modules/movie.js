import * as api from "../api/movies";

const GET_MOVIE = "GET_MOVIE";
const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";

// 상세 정보 가져오기
export const getMovie = id => async dispatch => {
  dispatch({ type: GET_MOVIE });
	try {
		const result = await api.apiGetMovie(id);
    dispatch({ type: GET_MOVIE_SUCCESS, data: result.data.Response === "True" ? result.data : {} });
	} catch (e) {
		dispatch({ type: GET_MOVIE_ERROR, error: e });
	}
};

const initialState = {
  data: {},
  loading: false,
  error: null,
};
export default function movie(state = initialState, action) {
  switch(action.type) {
    case GET_MOVIE:
      state = {
        ...state,
        loading: true,
        error: null
      }
      break;
    case GET_MOVIE_SUCCESS:
      state = {
        data: action.data,
        loading: false,
        error: null
      }
      break;
    case GET_MOVIE_ERROR:
      state = {
        ...state,
        loading: false,
        error: action.error
      }
      break;
  }
  return state;
}
