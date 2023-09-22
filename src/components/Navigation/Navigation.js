import './Navigation.css';
import menuBtnImg from '../../images/burger-start-button.svg';
import miniman from '../../images/miniman.svg';
import { NavLink } from 'react-router-dom';


function Navigation({ onOpen, isOpen, onClose }) {
  

  return (
    <>
      <nav className={isOpen ? 'navigate navigate_active' : 'navigate'}>

        <ul className='navigate__list'>

          <li className='navigate__links'>
            <NavLink className='navigate__link disabled link'
              to='/'
              onClick={onClose}>
              Главная
            </NavLink>
          </li>

          <li className='navigate__links'>
            <NavLink className='navigate__link link'
              to='/movies'
              onClick={onClose}>
              Фильмы
            </NavLink>
          </li>

          <li className='navigate__links'>
            <NavLink className='navigate__link link'
              to='/saved-movies'
              onClick={onClose}>
              Сохраненные фильмы
            </NavLink>
          </li>

        </ul>

        <NavLink className='navigate__profile simple-link'
          to='/profile'
          onClick={onClose}>

          <p className='navigate__text'>
            Аккаунт
          </p>

          <img
            className='navigate__image'
            src={miniman}
            alt='Aватар'>
          </img>

        </NavLink>

      </nav>

      <button className='navigate__button link'
        onClick={onOpen}
        onClose={onClose}>

        <img
          className='navigate__img link'
          src={menuBtnImg} alt='Кнопка меню'>
        </img>

      </button>
    </>
  );
};

export default Navigation;