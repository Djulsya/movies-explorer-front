import { useNavigate, NavLink } from 'react-router-dom';
import '../NotFound/NotFound.css';

function NotFound() {

  const navigate = useNavigate();

  return (

    <section className='notfound'>
      <h1 className='notfound__title'>404</h1>
      <p className='notfound__subtitle'>Страница не найдена</p>
      <NavLink className='notfound__link link'onClick={() => navigate(-1)}>
        Назад
      </NavLink>
    </section>
  );
};

export default NotFound;