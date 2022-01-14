import * as api from "../api/movies";

const SET_LIKE = "SET_LIKE";
const SET_LIKE_SUCCESS = "SET_LIKE_SUCCESS";
const SET_LIKE_ERROR = "SET_LIKE_ERROR";

// 상세 정보 가져오기
export const setLike = id => async dispatch => {
  dispatch({ type: SET_LIKE });
	try {
		const result = await api.apiSetLike(id);
    dispatch({ type: SET_LIKE_SUCCESS, data: result.status === 200 ? true : false });
	} catch (e) {
		dispatch({ type: SET_LIKE_ERROR, error: e });
	}
};

const initialState = {
  data: false,
  error: null,
};
export default function liked(state = initialState, action) {
  switch(action.type) {
    case SET_LIKE:
      state = {
        ...state,
        error: null
      }
      break;
    case SET_LIKE_SUCCESS:
      state = {
        data: action.data,
        error: null
      }
      break;
    case SET_LIKE_ERROR:
      state = {
        ...state,
        error: action.error
      }
      break;
  }
  return state;
}
