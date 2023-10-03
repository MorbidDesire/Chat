import { loremIpsum } from 'lorem-ipsum';
// import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const MainPage = (index) => (
  <>
    <Navigation />
    <h3>Page {index}</h3>
    <div>
      Page {index} content: { loremIpsum({ count: 5 })}
    </div>
  </>
);

export default MainPage;
