import React from 'react';
import '../Register/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';

function Register({ 
  isLoggedIn,
  handleSignUp, 
  errorResponse, 
}) {

  const { 
    handleChange, 
    isValid, 
    values, 
    resetForm 
  } = useFormValidation();

  const navigate = useNavigate();
  const [errMessage, setErrMessage] = React.useState({});
  const [fetchTextError, setFetchTextError] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (isValid) {
      handleSignUp(values);
    } else {
      return;
    }
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
    } else if (errorResponse == '') {
      setFetchTextError('')
    }
    setIsDisabled(!formsIsValid);
  }, 
  [errorResponse]);

  React.useEffect(() => {

    let formsIsValid = true;

    if
      (!values.name) {
      formsIsValid = false;
      errMessage.name = 'Обязательное поле';
    } else if
      (values.name.length < 2 || values.name.length > 20) {
      formsIsValid = false;
      errMessage.name = 'Введите от 2 до 20 символов';
    } else {
      errMessage.name = '';
    }

    if
      (!values.email) {
      formsIsValid = false;
      errMessage.email = 'Обязательное поле';
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
      errMessage.password = 'Обязательное поле';
    } else if
      (values.password.length < 6) {
      formsIsValid = false;
      errMessage.password = 'Введите не менее 6 символов';
    } else {
      errMessage.password = '';
    }
    setIsDisabled(!formsIsValid);
  }, 
  [values]);

  return (
    <>
      {
        isLoggedIn ?
          navigate(-1)
          :
          <section className='auth auth__showcase'>

            <Link className='auth__link-logo simple-link' to='/'>
              <div className='auth__logo logo'></div>
            </Link>

            <h1 className='auth__title'>
              Добро пожаловать!
            </h1>

            <form className='auth__area inputarea'
              onSubmit={onSubmit}>

              <label className='inputarea__info'>
                Имя

                <input className='inputarea__input link'
                  onChange={handleChange}
                  placeholder='Введите имя'
                  type='text'
                  name='name'
                  //name={formValue.name}
                  required />

                <span className='inputarea__error_active'>
                  {errMessage.name}
                </span> 

              </label>

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
                disabled={isDisabled}
                >
                Зарегистрироваться
              </button>

              <p className='auth__conflict-error'>{fetchTextError}</p>

              <p className='auth__text'>
                Уже зарегистрированы?
                <Link className='auth__link simple-link'
                  to='/signin'>
                  Войти
                </Link>
              </p>

            </form>
          </section>
      }
    </>
  );
};

export default Register;