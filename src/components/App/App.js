import React, { useEffect } from 'react';
import '../App/App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import { authorization } from '../../utils/auth';

import {
  MAX_DURATION,
  MESSAGE_ERROR_SEARCH
} from '../../utils/constants';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [registerError, setRegisterError] = React.useState();
  const [loginError, setLoginError] = React.useState();

  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [moviesFromSearch, setMoviesFromSearch] = React.useState([]);

  const [shortsIsChecked, setShortsIsChecked] = React.useState(false);

  const errorMessageDefault = localStorage.getItem('errorMessage') ?? '';
  const [errorMessage, setErrorMessage] = React.useState(errorMessageDefault);

  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const location = useLocation();

  function handleMenuPopupOpen() {
    setIsMenuPopupOpen(true);
  };

  function handleMenuPopupClose() {
    setIsMenuPopupOpen(false);
  };

  function handleSearchMovie(text) {
    if (allMovies.length === 0) {
      moviesApi
        .getMovies()
        .then(data => {
          localStorage.setItem('moviesAll', JSON.stringify(data))
          setAllMovies(JSON.parse(localStorage.getItem('moviesAll')))
        })
    }
    var searchArray = allMovies
      .filter(movie => movie.nameRU
        .toLowerCase()
        .includes(text
          .toLowerCase()));

    console.log(shortsIsChecked)

    if (shortsIsChecked) {
      searchArray = searchArray
        .filter(movie => movie.duration < MAX_DURATION)
    }
    setMoviesFromSearch(searchArray);

    localStorage
      .setItem('search-text', JSON
        .stringify(text));

    localStorage
      .setItem('shorts', JSON
        .stringify(shortsIsChecked));

    localStorage
      .setItem('searchmovies', JSON
        .stringify(searchArray));

    if (searchArray.length === 0) {
      setErrorMessage(MESSAGE_ERROR_SEARCH.NO_SEARCH);
      localStorage.setItem('errorMessage', MESSAGE_ERROR_SEARCH.NO_SEARCH);
    } else {
      setErrorMessage('');
      localStorage.setItem('errorMessage', '');
    };
  };

  function handleSignUp({ email, password, name }) {
    authorization
      .register({ email, password, name })
      .then(() => {
        handleSignIn({ email, password });
        setRegisterError();
      })
      .catch((err) => {
        setRegisterError(err);
      });
  };

  function handleSignIn({ email, password }) {
    authorization
      .login({ email, password })
      .then(({ token }) => {
        document.cookie = `jwt=${token}`;
        navigate('/movies', { replace: true });
        setIsLoggedIn(true);
        setLoginError();
        localStorage
          .setItem('jwt', token);
      })
      .catch((err) => {
        setLoginError(err);
      });
  };

  function handleSignOut() {
    navigate('/');
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.clear();
    document.cookie = "jwt=; path=/; max-age=0";
  };

  async function handleEditProfiles(values) {
    try {
      const data = await mainApi
        .setUserInfo(values);
      setCurrentUser(currentUser => ({
        ...currentUser,
        ...data
      }));
      navigate({ replace: false });
      return true;
    } catch (err) {
      handleSignOut()
    }
  }

  function handleButtonSave(movie) {
    if (!savedMovies
      .find(savedMovie => savedMovie.movieId === movie.id)) {
      mainApi
        .addMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie])
        }).catch(() => handleSignOut());
    };
  };

  function handleButtonDelete(movie, saved) {
    if (!saved) {
      mainApi
        .deleteMovie(savedMovies
          .find(savedMovie => savedMovie.movieId === movie.id)._id)
        .then(() => {
          const deleteIndex = savedMovies
            .findIndex((savedMovie => savedMovie.movieId === movie.id));
          setSavedMovies([...savedMovies
            .slice(0, deleteIndex), ...savedMovies
              .slice(deleteIndex + 1)])
        })
        .catch(() => handleSignOut());
    } else {
      mainApi
        .deleteMovie(movie._id)
        .then(() => {
          const deleteIndex = savedMovies
            .indexOf(movie);
          setSavedMovies([...savedMovies
            .slice(0, deleteIndex), ...savedMovies
              .slice(deleteIndex + 1)])
        })
        .catch(() => handleSignOut());
    };
  };

  React.useEffect(() => {
    let path = location.pathname;
    authorization
      .checkToken()
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          navigate(path, { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
    []);

  React.useEffect(() => {
    if (token) {
      setLoading(true);
      mainApi
        .getUserInfo()
        .then((result) => {
          if (result) {
            setIsLoggedIn(true);
            navigate({ replace: false });
          }
        })
        .catch(() => {
          handleSignOut();
        })
        .finally(() => setLoading(false))
    };
  },
    [token]);

  React.useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      mainApi
        .getUserInfo()
        .then((getUserInfoResult) => {
          setCurrentUser(getUserInfoResult);
        })
        .catch(() => handleSignOut())

        .catch(() => handleSignOut())
      mainApi
        .getMovies()
        .then((MainApiGetMoviesResult) => {
          setSavedMovies(MainApiGetMoviesResult.data)
        })
        .catch((err) => {
          handleSignOut()
        })
        .finally(() => setLoading(false))
    };
  },
    [isLoggedIn]);

  const handleCheck = () => {
    setShortsIsChecked(!shortsIsChecked)
  };

  useEffect(() => {
    var text = JSON
      .parse(localStorage.getItem('search-text'));
    if (!!text) { handleSearchMovie(text) }

  },
    [shortsIsChecked]);

  const header = () => {
    const { pathname } = location;
    if (!isLoggedIn) {
      return (pathname === '/'
      )
    } else {
      return ((pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile'
      ));
    };
  };

  const footer = () => {
    const { pathname } = location;
    if (!isLoggedIn) {
      return (pathname === '/'
      )
    } else {
      return ((pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies'
      ));
    };
  };

  return (

    <div className='App'>
      <CurrentUserContext.Provider
        value={{ currentUser, savedMovies }}>

        {header() && <Header
          isLoggedIn={isLoggedIn}
          // onOpen={onOpen}
          header={header}
          onOpen={handleMenuPopupOpen} />}

        <BurgerMenu
          isOpen={isMenuPopupOpen}
          onClose={handleMenuPopupClose} />

        <Routes>
          <Route path='/'
            element={<Main
              isLoggedIn={isLoggedIn}
              onOpen={handleMenuPopupOpen} />} />
          <Route path='/signin'
            element={<Login
              isLoggedIn={isLoggedIn}
              handleSignIn={handleSignIn}
              errorResponse={loginError}
            //onLogin={handleLogin}
            />} />
          <Route path='/signup'
            element={<Register
              isLoggedIn={isLoggedIn}
              handleSignUp={handleSignUp}
              errorResponse={registerError} />} />
          <Route path='/movies'
            element={
              <ProtectedRoute component={Movies}
                isLoggedIn={isLoggedIn}
                handleButtonDelete={handleButtonDelete}
                loading={loading}
                onOpen={handleMenuPopupOpen}
                handleButtonSave={handleButtonSave}
                shortsIsChecked={shortsIsChecked}
                handleCheck={handleCheck}
                handleSearchMovie={handleSearchMovie}
                movies={moviesFromSearch}

                errorMessage={errorMessage}
              />} />
          <Route path='/saved-movies'
            element={
              <ProtectedRoute component={SavedMovies}
                isLoggedIn={isLoggedIn}
                movies={savedMovies}
                handleButtonDelete={handleButtonDelete}
                onOpen={handleMenuPopupOpen}
                loading={loading}
              //  handleSearchMovie={handleSearchMovie}
              //  filterMovies={filterMovies}
              />} />
          <Route path='/profile'
            element={<ProtectedRoute component={Profile}
              isLoggedIn={isLoggedIn}
              handleSignOut={handleSignOut}
              handleEditProfile={handleEditProfiles}
              onOpen={handleMenuPopupOpen}
              loading={loading} />} />
          <Route path='*'
            element={< NotFound />} />

        </Routes>
        {footer() && <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
