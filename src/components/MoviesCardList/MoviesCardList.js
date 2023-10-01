import React from 'react';
import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import {
  MOVIES_DESKTOP_COUNT,
  MOVIES_DESKTOP,
  MOVIES_MOBILE_COUNT,
  MOVIES_MOBILE,
  MOVIES_TABLET_COUNT,
  PAGE_DESKTOP,
  PAGE_TABLET,
} from '../../utils/constants';


function MoviesCardList({
  findSavedMovies,
  movies,
  handleButtonSave,
  saved,
  handleButtonDelete,

  handleSearchMovie,
  errorMessage
}) {

  const localStorageMovies = JSON.parse(localStorage.getItem('searchmovies'));
  const [loading, setLoading] = React.useState(false);
  const [sumRenderCards, setSumRenderCards] = React.useState(0);
  const [cardsToRender, setCardsToRender] = React.useState([]);
  const [maxCards, setMaxCards] = React.useState(0);
  const [moreCards, setMoreCards] = React.useState(3);
  const [isWindowMedium, setIsWindowMedium] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setIsWindowMedium(() => window.innerWidth);
    };
    if (isWindowMedium >= PAGE_DESKTOP) {
      setSumRenderCards(MOVIES_DESKTOP_COUNT);
      setMoreCards(MOVIES_DESKTOP);
    }
    if (isWindowMedium > PAGE_TABLET && isWindowMedium < PAGE_DESKTOP) {
      setSumRenderCards(MOVIES_TABLET_COUNT);
      setMoreCards(MOVIES_MOBILE);
    }
    if (isWindowMedium <= PAGE_TABLET) {
      setSumRenderCards(MOVIES_MOBILE_COUNT);
      setMoreCards(MOVIES_MOBILE);
    }

    window
      .addEventListener('resize', handleResize);
    return () => {
      window
        .removeEventListener('resize', handleResize);
    };
  },
    [isWindowMedium, movies.length]);

  React.useEffect(() => {
    if (!saved) {
      if (localStorageMovies) {
        setCardsToRender(localStorageMovies
          .slice(0, sumRenderCards))
        setMaxCards(localStorageMovies.length)
      };
    };
  },
    []);

  React.useEffect(() => {
    if (!saved) {
      if (movies.length !== 0) {
        setCardsToRender(movies
          .slice(0, sumRenderCards));
        setMaxCards(movies.length)
      } else {
        setCardsToRender([])
      }
    } else {
      setCardsToRender(movies)

      if (findSavedMovies.length > 0) {
        setCardsToRender(findSavedMovies)
      };
    };
  },
    [movies, sumRenderCards, findSavedMovies]);

  const handleButtonMore = () =>
    setSumRenderCards
      (sumRenderCards
        +
        moreCards);

  return (
    <>
      {loading ?
        <Preloader />

        :

        <section className='filmlist'>
          {cardsToRender.length > 0 ? (
            <div className='filmlist__container'>
              <ul className='filmlist__table'> {
                cardsToRender.map(movie => (
                  <MoviesCard
                    key={movie.id || movie.movieId}
                    movie={movie}
                    saved={saved}
                    handleButtonSave={handleButtonSave}
                    handleButtonDelete={handleButtonDelete}
                    handleSearchMovie={handleSearchMovie}
                   // errorMessage={errorMessage}
                  />
                ))
              }
              </ul>
            </div>)

            :

            (<div className='filmlist__empty'>
              {errorMessage}
            </div>)}

          {sumRenderCards < maxCards ? (
            <button
              className='more more__button link'
              type='button'
              name='more'
              onClick={handleButtonMore}>
              Ещё
            </button>
          )

            :

            ''}

        </section>
      };
    </>
  );
};

export default MoviesCardList;
