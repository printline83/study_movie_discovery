export const githubRepository = "https://github.com/printline83/study_movie_discovery"

export const menus = [
  {
    to: '/',
    name: 'Search'
  },
  {
    to: '/recommend',
    name: 'Recommend'
  }
]

export const types = [
  'Movie',
  'Series',
  'Episode'
]

export const init = {
  keyword: '', 
  genre: '',
  year: new Date().getFullYear(),
};

 