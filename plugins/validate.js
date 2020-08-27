export default ({ app }, inject) => {
  inject('validate', (event, callback) => {
    const t = event.target.closest('form');
    let correct = true;
    const text = t.querySelectorAll('[type="text"],[type="password"]');
    for (const i of text) {
      const val = i.value.trim();
      if (i.hasAttribute('data-validate')) {
        if (i.hasAttribute('required') || !app.$isEmpty(val.trim())) {
          const v = app.$check(i.getAttribute('name'), val);
          if (v !== true) {
            correct = false;
            i.parentElement.querySelector('.message').textContent = v;
            i.parentElement.classList.add('incorrect');
          }
        }
      } else if (!i.hasAttribute('data-validate')) {
        if (i.hasAttribute('required') && app.$isEmpty(val)) {
          correct = false;
          i.parentElement.querySelector('.message').textContent =
            'Заполнить обязательно';
          i.parentElement.classList.add('incorrect');
        }
      }
    }
    if (correct) {
      //   const fd = new FormData(event.target);
      if (callback !== undefined) {
        callback();
      }
    }
    return correct;
  });
};
