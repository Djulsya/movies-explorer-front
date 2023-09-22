import '../Profile/Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';

function Profile({
  handleSignOut,
  handleEditProfile,
}) {

  const {
    values,
    handleChange,
    isValid,
    setValues
  } = useFormValidation();

  const { currentUser } = React.useContext(CurrentUserContext);

  const navigate = useNavigate();

  const [popupState, setPopupState] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const [errMessage, setErrMessage] = React.useState({});
  const [isEdit, setIsEdit] = React.useState(false);
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  React.useEffect(() => {
    setValues({
      name: currentUser.name ? currentUser.name : '',
      email: currentUser.email ? currentUser.email : ''
    });
  }, 
  [currentUser]);

  function onSubmit(event) {
    event.preventDefault();
    if (isValid) {
      handleEditProfile(values,
        setPopupState,
        setIsPopupOpen,
        handleOpenPopup()
      );
    };
  };

  function handleOpenEdit() {
    setIsEdit(true);
  };

  function handleCloseEdit() {
    setIsEdit(false);
  };

  function signout() {
    handleSignOut();
  };

  function handleOpenPopup() {
    setIsPopupOpen(true);
  };

  React.useEffect(() => {

    let formsIsValid = true;

    if (currentUser.name === values.name && currentUser.email === values.email) {
      formsIsValid = false;
    }

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

    setIsActiveButton(formsIsValid);
  }, 
  [values]);

  return (
    <main className='profile'>
      {!isEdit &&
        <>
          <h1 className='profile__title'>
            Привет, {currentUser.name}!
          </h1>
          <div className='profile__container'>
            <p className="profile__text">
              Имя
            </p>
            <p className='profile__user-text'>
              {currentUser.name}
            </p>
            <div className='profile__line'></div>
            <p className="profile__text">
              E-mail
            </p>
            <p className='profile__user-text'>
              {currentUser.email}
            </p>
          </div>
          <a className='profile__edit-button'
            onClick={handleOpenEdit}
          >
            Редактировать
          </a>
          <Link className='profile__logout-button'
            to='/'
            onClick={signout}>
            Выйти из аккаунта
          </Link>
        </>
      }

      {isEdit &&
        <form className='profile__submit-form'
          onSubmit={onSubmit}>
          <label className='profile__form-field profile__form-field_type_name'>
            <input className='profile__input profile__input_type_name'
              value={values.name}
              onChange={handleChange}
              type='text'
              name='name'
              id='name'
              placeholder='Имя'
              required
            />
            <span className='profile__input-error'>
              {errMessage.name}
            </span>
          </label>
          <label className='profile__form-field profile__form-field_type_email'>
            <input className='profile__input profile__input_type_email'
              value={values.email}
              onChange={handleChange}
              type='email' name='email'
              id='email'
              placeholder='E-mail'
              required
            />
            <span className='profile__input-error'>
              {errMessage.email}
            </span>
          </label>
          <input className='profile__submit-button link'
            type='submit'
            value='Сохранить'
            disabled={!isActiveButton}
          />
          <a className='profile__edit-cancel'
            onClick={handleCloseEdit}>
            Назад
          </a>
        </form>
      }

      {isPopupOpen &&
        <div className='profile__popup-success'>
          <p className='profile__popup-text'>
            Изменения успешно сохранены!
          </p>
          <button className='profile__popup-close'
            onClick={() => navigate(0)}
            >
            Вернуться в профиль &#128126;
          </button>
        </div>
      }
    </main>
  );
};

export default Profile;

