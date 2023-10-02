import Titleblock from '../Title/Title';
import '../AboutProject/AboutProject.css';

 function AboutProject() {

  return (
    <section className='about' id='about'>
      <div className='about__container container'>
      <Titleblock text={'О проекте'} />
        <ul className='about__info'>
          <li className='about__project'>
            <h3 className='about__title'>
            Дипломный проект включал 5 этапов
            </h3>
            <p className='about__description'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки
            </p>
          </li>
          <li className='about__project'>
            <h3 className='about__title'>
            На выполнение диплома ушло 5 недель
            </h3>
            <p className='about__description'>
              У каждого этапа были мягкий и жёсткий дедлайны, которые нужно было соблюдать, чтобы успешно защититься
            </p>
          </li>
        </ul>
         <ul className='about__area'>
           <li className='about__table-black'>1 неделя</li>
           <li className='about__table-grey'>4 недели</li>
           <li className='about__table-pale'>Back-end</li>
           <li className='about__table-pale'>Front-end</li>
           </ul>
       </div>
     </section>
   );
 };

 export default AboutProject;