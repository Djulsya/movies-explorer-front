import React from 'react';
import '../Footer/Footer.css';

function Footer() {

  return (
    <section className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__date'>&#169;2023</p>
        <ul className='footer__links'>
          <li><a className='footer__link simple-link'
          href='https://practicum.yandex.ru/'
          target='_blank'
          rel='noreferrer'>
            Яндекс.Практикум
            </a></li>
          <li><a className='footer__link simple-link'
          href='https://github.com'
          target='_blank'
          rel='noreferrer'>
            Github
            </a></li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;