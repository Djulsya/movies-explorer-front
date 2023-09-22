class MoviesApi {
  constructor(config) {
    this._moviesUrl = config.url; //moviesUrl
    this._headers = config.headers;
  };

  _checkError(res) {
    if (res.ok) {
      return res.json();
    };
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  };


   getMovies() {
    return fetch(`${this._moviesUrl}`,
       {
        method: 'GET',
         headers: this._headers
      })
       .then((res) => this._checkError(res));
   };
 };


const moviesConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

export const moviesApi = new MoviesApi(moviesConfig);