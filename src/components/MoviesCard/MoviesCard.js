import React from 'react';
import '../MoviesCard/MoviesCard.css'
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function MoviesCard({
  handleButtonSave,
  movie,
  saved,
  handleButtonDelete,
}) {
  const { image, trailerLink, nameRU, duration, } = movie;
  const { pathname } = useLocation()
  const { savedMovies } = React.useContext(CurrentUserContext);
  const [ isSaved, setIsSaved ] = React.useState(false);

  const deleteButtonClick = () => {
    handleButtonDelete(movie, saved);
  };

  const saveButtonClick = () => {
    const newSaved = !isSaved;
    handleButtonSave(movie, newSaved);
  };

  React.useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovieCard = savedMovies.filter((obj) => {
        return obj.movieId === movie.id
      })

      if (savedMovieCard.length > 0) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      };
    };
  },
    [pathname, savedMovies, movie.id]);

  function handleDuration(min) {
    return (min / 60 | 0) + 'ч ' + (min % 60) + 'м';
  };

  return (

    <li className='filmcard'>

      <a href={trailerLink}
        target='_blank'
        rel='noreferrer'>
        <img className='filmcard__image'
          src={!saved ? `https://api.nomoreparties.co` + image.url : image}
          alt={nameRU}>
        </img>
      </a>

      {saved ?
        <button className='filmcard__del simple-link'
          onClick={deleteButtonClick}>
          <img alt=''/>
        </button> :

        isSaved ?
          <button className='filmcard__save-on simple-link'
            onClick={deleteButtonClick}>
            <img alt=''/>
          </button>

          :

          <button className='filmcard__save link'
            onClick={saveButtonClick}>
              Сохранить
          </button>
      }

      <div className='filmcard__info'>
        <h2 className='filmcard__name'>
          {nameRU}
        </h2>
        <p className='filmcard__duration'>
          {handleDuration(duration)}
        </p>
      </div>
    </li>
  );
};

export default MoviesCard;