import React from 'react';
import '../SearchForm/SearchForm.css'
import useFormValidation from '../../hooks/useFormValidation';

function SearchForm({
  handleSearchMovie,
  isChecked,
  saved,
  handleSavedMovie,
  handleCheck,
}) {

  const [searchError, setSearchError] = React.useState(false);
  function resetSearchError(){
    setSearchError('')
  }

  const {
    values,
    handleChange,
    isValid,
    setValues
  } = useFormValidation();

  function onSubmit(event) {
    event
      .preventDefault();

    if (saved) {
      handleSavedMovie(values.text)
    }else if (isValid) {
      handleSearchMovie(values.text)
    } else {
      setSearchError('Нужно ввести ключевое слово')
    };
  };

  React.useEffect(() => {
    if (!saved) {
      setValues({
        text: JSON
          .parse(localStorage
            .getItem('search-text'))
      })
    };
  },
    []);

  return (

    <section className='search'>

      <form className='search__request'
        onSubmit={onSubmit}
        noValidate>

        <div className='search__group'>
          <div className='search__container container'>
            <span className='search__lupa'></span>
            <input
              className='search__input link'
              value={values.text || ''}
              checked={values.text || ''}
              onChange={handleChange}
              type="text"
              name='text'
              placeholder='Поиск...&#128253;'
              required
              onFocus={resetSearchError}
            />
          </div>
        </div>

        <div className='search__shorts'>

          <button
            className='search__discover link'
            type="submit"
          >
            Найти
          </button>


          <div className='search__slidergroup' >

            <input
              className='search__sliderbutton simple-link'
              checked={isChecked}
              onChange={handleCheck}
              type="checkbox" />

            <p className='search__text'>
              Короткометражки
            </p>

          </div>
        </div>
      </form>
      <p className='search__errortext'>
        {searchError}
      </p>

    </section>
  );
};

export default SearchForm;