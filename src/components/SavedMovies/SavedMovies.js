import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  movies,
  handleButtonDelete,
  handleSavedMovie,
  loading,
  findSavedMovies,
}) {


  return (

    <main className='saved-movies'>

      <SearchForm
        saved={true}
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