import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/47tv.gif';
import Navigation from '../Navigation/Navigation';
import '../Header/Header.css';

function Header({
  isLoggedIn,
  header,
  isOpen,
  onOpen,
}) {

  return (

    <header className='header'>

      <NavLink to='/'
        className='header__logo simple-link'>
        <img
          className='header__logo'
          src={logo} />
      </NavLink>

      {isLoggedIn ?

        (<Navigation
          onOpen={onOpen}
          isOpen={isOpen}
          isLoggedIn={isLoggedIn}
          header={header}
        />)

        :

        (<div className='header__menu'>
          <ul className='header__container'>
            <li>
              <NavLink to='/signup'
                className='header__signup-link'>
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink to='/signin'
                className='header__signin-link'>
                <div className='header__signin-button'
                  type='button'>
                  <p className='header__signin-text'>
                    Войти
                  </p>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>)}

    </header>
  );
};

export default Header;