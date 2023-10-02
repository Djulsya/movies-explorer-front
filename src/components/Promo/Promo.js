import '../Promo/Promo.css';

function Promo() {

  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__image'></div>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки
        </h1>
      </div>
      <nav className='promo__navbar'>
        <ul className='promo__navigate'>
          <li><a className='promo__navigate-text simple-link' href='#about'>O проекте</a></li>
          <li><a className='promo__navigate-text simple-link' href='#techs'>Технологии</a></li>
          <li><a className='promo__navigate-text simple-link' href='#author'>Студент</a></li>
        </ul>
      </nav>
    </section>
  );
};

export default Promo;