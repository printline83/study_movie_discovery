import * as api from "../api/movies";

const GET_LIKES = "GET_LIKES";
const GET_LIKES_SUCCESS = "GET_LIKES_SUCCESS";
const GET_LIKES_ERROR = "GET_LIKES_ERROR";

// 전체 데이터 가져오기
export const getLikes = () => async dispatch => {
  dispatch({ type: GET_LIKES });
	try {
		const result = await api.apiGetLikes();
    dispatch({ type: GET_LIKES_SUCCESS, data: result.status === 200 ? result.data.movies : [] });
	} catch (e) {
		dispatch({ type: GET_LIKES_ERROR, error: e });
	}
};

const initialState = {
  data: [],
  loading: false,
  error: null,
};
export default function likes(state = initialState, action) {
  switch(action.type) {
    case GET_LIKES:
      state = {
        ...state,
        loading: true,
        error: null
      }
      break;
    case GET_LIKES_SUCCESS:
      state = {
        data: action.data,
        loading: false,
        error: null
      }
      break;
    case GET_LIKES_ERROR:
      state = {
        ...state,
        loading: false,
				error: action.error
        }
      break;
  }
  return state;
}
