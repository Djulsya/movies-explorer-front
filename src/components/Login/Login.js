import React from 'react';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation  from '../../hooks/useFormValidation';

function Login({
  isLoggedIn,
  handleSignIn,
  errorResponse,
}) {

  const {
    values,
    isValid,
    resetForm,
    handleChange
  } = useFormValidation();

  const navigate = useNavigate();
  const [fetchTextError, setFetchTextError] = React.useState('');
  const [errMessage, setErrMessage] = React.useState({});
  const [isDisabled, setIsDisabled] = React.useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (isValid) {
      handleSignIn(values);
    } else {
      return;
    };
    resetForm();
  };

  React.useEffect(() => {

    let formsIsValid = true;

    if (errorResponse == 409) {
      formsIsValid = false;
      setFetchTextError('Такой e-mail уже зарегистрирован (⊙_⊙)')
    } else if (errorResponse == 500) {
      formsIsValid = false;
      setFetchTextError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз (´･ᴗ･ ` )')
    } else if (errorResponse == 429) {
      formsIsValid = false;
      setFetchTextError('Слишком много запросов в минуту ლ(ಠ_ಠ ლ)')
    } else if (errorResponse == 401) {
      formsIsValid = false;
      setFetchTextError('Введены неправильный email или пароль')
      console.log(fetchTextError);
    } else if (errorResponse == '') {
      setFetchTextError('')
    };
    setIsDisabled(!formsIsValid);
  },
  [errorResponse]);

  React.useEffect(() => {

    let formsIsValid = true;

    if
      (!values.email) {
      formsIsValid = false;
      errMessage.email = '';
    } else if
      (!values.email.match
        (/\w+@\w+\.\w+/)) {
      formsIsValid = false;
      errMessage.email = 'Введите e-mail в формате pochta@pochta.abc';
    } else {
      errMessage.email = '';
    }

    if
      (!values.password) {
      formsIsValid = false;
      errMessage.password = '';
    } else if
      (values.password.length < 6) {
      formsIsValid = false;
      errMessage.password = 'Введите не менее 6 символов';
    } else {
      errMessage.password = '';
    };
    setIsDisabled(!formsIsValid);
  },
  [values]);

  return (
    <>
    {isLoggedIn ?
        navigate(-1)
        :
        <section className='auth auth__showcase'>

          <Link className='auth__link-logo simple-link' to='/'>
            <div className='auth__logo logo'></div>
          </Link>

          <h1 className='auth__title'>
          Рады видеть!
          </h1>

          <form className='auth__area inputarea'
            onSubmit={onSubmit}>

            <label className='inputarea__info'>
              E-mail

              <input className='inputarea__input link'
                onChange={handleChange}
                placeholder='Введите E-mail'
                type='email'
                name='email'
                required />

               <span className='inputarea__error_active'>
                {errMessage.email}
              </span>

            </label>

            <label className='inputarea__info'>
              Пароль

              <input className='inputarea__input link'
                onChange={handleChange}
                placeholder='Придумайте пароль'
                type='password'
                name='password'
                required />

               <span className='inputarea__error_active'>
                {errMessage.password}
              </span>

            </label>

            <button className='auth__button link'
              type='submit'
              disabled={isDisabled}>
             Войти
            </button>

            <p className='auth__conflict-error'>{fetchTextError}</p>

            <p className='auth__text'>
            Ещё не зарегистрированы?
              <Link className='auth__link simple-link'
                to='/signup'>
               Регистрация
              </Link>
            </p>

          </form>
        </section>
    }
  </>
  );
};

export default Login;