class Authorization {
constructor({ link }) {
    this._link = link;
  };

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  };

  register({ email, password, name }) {
    return fetch(this._link + '/signup', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(
        {
          "email": `${email}`,
          "password": `${password}`,
          "name": `${name}`,
        }
      )
    })
    .then((res) => this._checkError(res));
  };

  login({ email, password }) {
    return fetch(this._link + '/signin', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(
        {
          "email": `${email}`,
          "password": `${password}`
        }
      )
    }).then((res) => this._checkError(res));
  };

  checkToken(jwt) {
    return fetch(this._link + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }).then((res) => this._checkError(res));
  };

  signout() {
    return fetch(this._link + '/signout', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
    }).then((res) => this._checkError(res));
  };
};

export const authorization = new Authorization({ link: 'http://localhost:4000' });

// const authConfig = {
//   url: 'http://localhost:4000', // https://api.jb.beatfilmmovies.nomoreparties.co http://localhost:4000
//   headers: {
//     //'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
// };

// const authorization = new Authorization(authConfig);

// export default authorization;

