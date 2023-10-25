export default (type) => {
  switch (type) {
    case 'login':
      return 'api/v1/login';
    case 'signup':
      return 'api/v1/signup';
    case 'data':
      return 'api/v1/data';
    default:
      break;
  }
  return null;
};
