import Titleblock from '../Title/Title';
import '../AboutMe/AboutMe.css';
import photo from '../../images/image_860804150830272095804.gif';
import image from '../../images/free-sticker-plant-10489865.png';

function AboutMe() {

  return (
    <section className='author' id='author'>
      <div className='author__container container'>
        <Titleblock text={'Студент'}></Titleblock>
        <div className='author__about'>
          <h3 className='author__name'>
            Юлия <img className='author__image' src={image} />
          </h3>
          <h4 className='author__info'>
            Студентка курса веб-разработки, 33 года
          </h4>
          <p className='author__story'>
            O себе. Здесь будет краткий рассказ о себе и фото :)
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </p>
          <a className='author__link simple-link' href='https://github.com/Djulsya' target='_blank' rel='noreferrer'>Github</a>
          <img className='author__photo' src={photo} alt='фотография автора'/>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;