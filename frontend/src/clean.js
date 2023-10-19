import filter from 'leo-profanity';

export default (text) => {
  filter.add(filter.getDictionary('ru'));
  return filter.clean(text);
};
