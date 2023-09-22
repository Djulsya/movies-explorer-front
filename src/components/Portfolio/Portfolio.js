import '../Portfolio/Portfolio.css';

function Portfolio() {

  const dataPortfolio = [
    { id: 1, 
      portfName: 'Статичный сайт', 
      portfLink: 'https://djulsya.github.io/How-to-learn/' },
    { id: 2, 
      portfName: 'Адаптивный сайт', 
      portfLink: 'https://djulsya.github.io/Russian-travel/' },
    { id: 3, 
      portfName: 'Одностраничное приложение', 
      portfLink: 'https://jules-bo.nomoredomains.xyz' }
  ]

  return (
    <section className='portfolio'>
      <div className='portfolio__container container'>
        <div className='portfolio__container-link'>
          <p className='portfolio__header simple-link' target='_blank' rel='noreferrer'>
            Портфолио
          </p>
        </div>
        <ul className='portfolio__items '>
        {dataPortfolio.map((element) => {
            return (<li key={element.id} className='portfolio__links'>
              <a href={element.portfLink} className='portfolio__link simple-link' target='_blank' rel='noreferrer'>
                <p className='portfolio__text'>{element.portfName}</p>
                <div className='portfolio__arrow'></div>
              </a>
            </li>)
          })}
        </ul>
      </div>
    </section>
  );
};

export default Portfolio;