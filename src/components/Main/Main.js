import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import { Route, Routes } from 'react-router-dom';

function Main() {


  return (
    <main className="Main">
      <Routes>
        <Route
        path='/'
          element={
            <div className='main-page'>

              <Promo>

              </Promo>
              <AboutProject>

              </AboutProject>
              <Techs>

              </Techs>
              <AboutMe>

              </AboutMe>
              <Portfolio>

              </Portfolio>

            </div>
          } />
      </Routes>
    </main>
  );
};

export default Main;