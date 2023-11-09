import filter from 'leo-profanity';
import { FilterContext } from './index';

const FilterProvider = ({ children }) => {
  const dictionary = filter.add(filter.getDictionary('ru'));
  return (
    <FilterContext.Provider value={dictionary}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
