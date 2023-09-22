import '../Techs/Techs.css';
import Titleblock from '../Title/Title';

function Techs() {

  return (
    <section className='techs' id='techs'>
      <div className='techs__container container'>
        <Titleblock text={'Технологии'} />
        <h2 className='techs__title'>
          7 технологий
        </h2>
        <p className='techs__about'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте
        </p>
        <ul className='techs__skills'>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/HTML' target='_blank' rel='noreferrer'><p>HTML</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/CSS' target='_blank' rel='noreferrer'><p>CSS</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/JavaScript' target='_blank' rel='noreferrer'><p>JS</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/React' target='_blank' rel='noreferrer'><p>React</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/Git' target='_blank' rel='noreferrer'><p>Git</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/Express_(%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)' target='_blank' rel='noreferrer'><p>Express.js</p></a></li>
          <li className='techs__skills-box link'><a className='wiki' href='https://ru.wikipedia.org/wiki/MongoDB' target='_blank' rel='noreferrer'><p>mongoDB</p></a></li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;