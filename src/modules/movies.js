import * as api from "../api/movies";

const GET_MOVIES = "GET_MOVIES";
const GET_STATUS_SUCCESS = "GET_STATUS_SUCCESS";
const GET_STATUS_ERROR = "GET_STATUS_ERROR";

// 전체 데이터 가져오기
export const getMovies = title => async dispatch => {
  dispatch({ type: GET_MOVIES });
	try {
		const result = await api.apiGetMovies(title);
    dispatch({ type: GET_STATUS_SUCCESS, data: result.data.Response === "True" ? result.data.Search : [] });
	} catch (e) {
		dispatch({ type: GET_STATUS_ERROR, error: e });
	}
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default function movies(state = initialState, action) {
  switch(action.type) {
    case GET_MOVIES:
      state = {
        ...state,
        loading: true,
        errr: null
      }
      break;
    case GET_STATUS_SUCCESS:
      state = {
        data: action.data,
        loading: false,
        errr: null
      }
      break;
  }
  return state;
}
