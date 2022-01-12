import axios from "axios";
 
export const apiGetMovies = async inputs => {
  const params = inputs;
	const response = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/movie/list`, {
      params,
      headers: {
        'x-api-key': process.env.REACT_APP_API_KEY
      }
    }
  );
	return response;
};
 