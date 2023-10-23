import { toast } from 'react-toastify';

export default (action, type, translation) => {
  if (type === 'error') {
    toast(translation('toastify.error'), { type: 'error' });
    return;
  }
  switch (action) {
    case 'add': {
      toast(translation('toastify.add'), { type: 'success' });
      break;
    }
    case 'rename': {
      toast(translation('toastify.rename'), { type: 'success' });
      break;
    }
    case 'remove': {
      toast(translation('toastify.remove'), { type: 'success' });
      break;
    }
    default:
      break;
  }
};
