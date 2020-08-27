import checkValiate from '~/modules/validate-regexp.js';

export default ({ app }, inject) => {
  inject('check', (name, value) => {
    return checkValiate[name](value);
  });
};
