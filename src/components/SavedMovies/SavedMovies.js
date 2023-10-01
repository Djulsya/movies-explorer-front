import React from 'react';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import {
  MAX_DURATION
} from '../../utils/constants';

function SavedMovies({
  movies,
  handleButtonDelete,
  loading,
}) {

  const [findSavedMovies, setFindSavedMovies] = React.useState([]);
  const [findText, setFindText] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [shortsIsChecked, setShortsIsChecked] = React.useState(false);

  const handleCheck = () => {
    setShortsIsChecked(!shortsIsChecked)
  };

  function handleSavedMovie(text) {
    if(!text) {text = ''}
    setFindText(text);

    var searchArray = movies
        .filter(movies => movies.nameRU
          .toLowerCase()
          .includes(text
            .toLowerCase()));
      console.log(shortsIsChecked)

      if(shortsIsChecked){
        searchArray = searchArray
        .filter(movie => movie.duration < MAX_DURATION)
      }

      setFindSavedMovies(searchArray);
  };

   React.useEffect(() =>
   {
     handleSavedMovie(findText)
   },
     [shortsIsChecked])


  React.useEffect(() => {
    handleSavedMovie(findText)
  }, [movies])

  return (

    <main className='saved-movies'>

      <SearchForm
        saved={true}
        isChecked={shortsIsChecked}
        handleCheck={handleCheck}
        handleSavedMovie={handleSavedMovie}
        handleButtonDelete={handleButtonDelete}
       // filterMovies={filterMovies}
      />

      {loading ? <Preloader />

        :

        <MoviesCardList
          saved={true}
          movies={movies}
          handleButtonDelete={handleButtonDelete}
          handleSavedMovie={handleSavedMovie}
        //  filterMovies={filterMovies}
          findSavedMovies={findSavedMovies}
        />}

    </main>
  );
};

export default SavedMovies;