class MainApi {
  constructor({ link }) {
    this._link = link;
  };

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status);
  };

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._link + '/users/me', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "GET",
      credentials: 'include',
    }).then((res) => this._checkError(res));
  };

  setUserInfo({ name, email }) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._link + '/users/me', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "PATCH",
      credentials: 'include',
      body: JSON.stringify(
        {
          "email": `${email}`,
          "name": `${name}`,
  })
    }).then((res) => this._checkError(res));
  };

  getMovies() {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._link + '/movies', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "GET",
      credentials: 'include',
    }).then((res) => this._checkError(res));
  };

  addMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._link + '/movies', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        description: movie.description,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        image: `https://api.nomoreparties.co` + movie.image.url,
        thumbnail: `https://api.nomoreparties.co` + movie.image.url,
        year: movie.year,
        movieId: movie.id,
      })
    }).then((res) => this._checkError(res));
  };

  deleteMovie(id) {
    const jwt = localStorage.getItem('jwt');
    return fetch(this._link + '/movies/' + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: "DELETE",
      credentials: 'include',
    }).then((res) => this._checkError(res));
  };
}

export const mainApi = new MainApi({ link: 'http://localhost:4000' })
//https://api.jb.beatfilmmovies.nomoreparties.co  http://localhost:4000