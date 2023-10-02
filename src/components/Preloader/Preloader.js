import '../Preloader/Preloader.css';
//import shark from '../../images/1331556864_preview_shark.gif'

const Preloader = () => {
  return (
    <div className='preloader'>

      <div className='preloader__container'>

        <img className='preloader__gif'/>
        <span className='preloader__round'></span>
        </div>

    </div>
  );
};

export default Preloader;