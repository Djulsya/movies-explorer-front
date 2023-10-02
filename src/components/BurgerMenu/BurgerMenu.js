import '../BurgerMenu/BurgerMenu.css';
import { NavLink } from 'react-router-dom';

function BurgerMenu({ isOpen, onClose }) {

  return (
    <section className={isOpen ? 'burger burger_open' : 'burger'}>
      <div className='burger__container'>
        <button
          className='burger__closebutton link'
          onClick={onClose}>
        </button>

        <ul className='burger__links'>
          <li className='burger__link-list'>
            <NavLink
              className='burger__link burger__link_activeline'
              to="/"
              onClick={onClose}>
              Главная
            </NavLink>

          </li>
          <li className='burger__link-list'>
            <NavLink
              className='burger__link burger__link_activeline'
              to="/movies"
              onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li className='burger__link-list'>
            <NavLink
              className='burger__link burger__link_activeline'
              to="/saved-movies"
              onClick={onClose}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className='burger__account'>
          <NavLink
            className='burger__button simple-link'
            to="/profile"
            onClick={onClose} >
            Аккаунт
            <div className='burger__icon'></div>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default BurgerMenu;