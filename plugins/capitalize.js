export default ({ app }, inject) => {
  inject('capitalize', (word) => {
    let y = word;
    try {
      y = word[0].toUpperCase() + word.substr(1);
    } catch {}
    return y;
  });
};
