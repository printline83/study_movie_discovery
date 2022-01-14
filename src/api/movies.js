import axios from "axios";
 
const options = {
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY
  }
}

export const apiGetMovies = async inputs => {
	return await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/movie/list`, {
      ...options,
      params: inputs
    }
  );
};

export const apiGetMovie = async id => {
	return await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/movie/detail`, {
      ...options,
      params: {id}
    }
  );
};
 
export const apiSetLike = async id => {
	return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/movie/like`,  
    {
      userId: process.env.REACT_APP_API_USER, 
      movieId: id
    },
    options,
  );
};

export const apiGetLikes = async () => {
	return await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/movie/like`, {
      ...options,
      params: {
        userId: process.env.REACT_APP_API_USER, 
      }
    }
  );
};
 
export const apiGetLikesDetail = async (ids, callback) => {
  if (ids.length === 0) return [];
  await axios.all(
    ids.map( v => 
      axios.get(`${process.env.REACT_APP_API_ENDPOINT}/movie/detail?id=${v}`,{...options})
    )
  ).then(axios.spread((...response) => {  
    callback(response);
  })).catch((error) => {
      console.error(error)
  })
};
 