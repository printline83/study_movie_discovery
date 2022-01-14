import * as api from "../api/movies";

const GET_LIKES_DETAIL = "GET_LIKES_DETAIL";
const GET_LIKES_DETAIL_SUCCESS = "GET_LIKES_DETAIL_SUCCESS";
const GET_LIKES_DETAIL_ERROR = "GET_LIKES_DETAIL_ERROR";

// 전체 데이터 가져오기
export const getLikesDetail = () => async dispatch => {
  dispatch({ type: GET_LIKES_DETAIL });
  let likes = [];
  try {
		likes = await api.apiGetLikes();
    likes = likes.status === 200 ? likes.data.movies : [];
    if ( likes.length > 0  ) {
      api.apiGetLikesDetail(likes, (response) => {
        const result = response.length === 0 ? [] : response.map(v => v.data)
        dispatch({ type: GET_LIKES_DETAIL_SUCCESS, data: result });
      })
    } else {
      dispatch({ type: GET_LIKES_DETAIL_SUCCESS, data: [] });
    }
	} catch (e) {
		dispatch({ type: GET_LIKES_DETAIL_ERROR, error: e });
	}

};

const initialState = {
  data: [],
  loading: false,
  error: null,
};
export default function likesDetail(state = initialState, action) {
  switch(action.type) {
    case GET_LIKES_DETAIL:
      state = {
        ...state,
        loading: true,
        error: null
      }
      break;
    case GET_LIKES_DETAIL_SUCCESS:
      state = {
        data: action.data,
        loading: false,
        error: null
      }
      break;
    case GET_LIKES_DETAIL_ERROR:
      state = {
        ...state,
        loading: false,
				error: action.error
        }
      break;
  }
  return state;
}
