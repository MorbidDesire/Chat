const logger = () => (next) => (action) => {
  const result = next(action);
  if (action.type !== 'message/addMessage') {
    return result;
  }
  console.log(result);
  return result;
};

export default logger;
