import React from 'react';
import '../Movies/Movies.css';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  shortsIsChecked,
  handleSearchMovie,
  movies,
  handleButtonSave,
  loading,
  handleButtonDelete,
  handleCheck,
  errorMessage,
}) {

  return (

    <main className="movies">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        isChecked={shortsIsChecked}
        handleCheck={handleCheck}

        //errorMessage={errorMessage}
      />
      {loading ? <Preloader />
        :
        <MoviesCardList
          movies={movies}
          handleButtonSave={handleButtonSave}
          handleButtonDelete={handleButtonDelete}
          errorMessage={errorMessage}
        />
  }
    </main>

  );
};

export default Movies;