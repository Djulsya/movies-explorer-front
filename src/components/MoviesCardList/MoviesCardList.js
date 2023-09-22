import React from 'react';
import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';


function MoviesCardList({
  findSavedMovies,
  movies,
  handleButtonSave,
  saved,
  handleButtonDelete,
}) {

  const localStorageMovies = JSON.parse(localStorage.getItem('searchmovies'));
  const [loading, setLoading] = React.useState(false);
  const [sumRenderCards, setSumRenderCards] = React.useState(0);
  const [cardsToRender, setCardsToRender] = React.useState([]);
  const [maxCards, setMaxCards] = React.useState(0);
  const [moreCards, setMoreCards] = React.useState(3);
  const [isWindowMedium, setIsWindowMedium] = React.useState(window.innerWidth);

  const WINDOW_WIDTH = 1213;
  const MOBILE_WIDTH = 730;

  React.useEffect(() => {
    const handleResize = () => {
      setIsWindowMedium(() => window.innerWidth);
    };

    if (isWindowMedium <= WINDOW_WIDTH) {
      setSumRenderCards(5);
      setMoreCards(2);
    } else if (isWindowMedium <= MOBILE_WIDTH) {
      setSumRenderCards(8);
      setMoreCards(2);
    } else {
      setSumRenderCards(12);
      setMoreCards(3);
    };

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
      } else {
        setLoading(true)
        moviesApi
          .getMovies()
          .then((allmovies) => setCardsToRender(allmovies))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false))
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
      } else if (localStorageMovies) {
        setCardsToRender(localStorageMovies
          .slice(0, sumRenderCards))
        setMaxCards(localStorageMovies.length)
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

  //const { pathname } = useLocation();

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
                  // isWindowMedium={isWindowMedium}
                  />
                ))
              }
              </ul>
            </div>)

            :

            (<div className='filmlist__empty'>
              Упс... Ничего нет &#128511;
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
