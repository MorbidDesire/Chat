import { loremIpsum } from 'lorem-ipsum';
import Navigation from './Navigation';

const BuildPage = (index) => (
  <>
    <Navigation />
    <h3>Page {index}</h3>
    <div>
      Page {index} content: { loremIpsum({ count: 5 })}
    </div>
  </>
);

export default () => BuildPage(1);
