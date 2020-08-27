import Cookies from 'universal-cookie';
let cookie;
export default ({ app, req }, inject) => {
  inject('img', `/images/`);
  inject('storage', (arg) => {
    return `e-m_${arg}`;
  });
  inject('isEmpty', (obj) => {
    if (obj === null) {
      return true;
    }
    if (obj === undefined) {
      return true;
    }
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.length === 0;
      } else if (Object.keys(obj).length === 0) {
        return JSON.stringify(obj) === '{}';
      }
    } else {
      return obj === '';
    }
    return false;
  });
  inject('localstorage', {
    get: (arg) => {
      if (process.browser) {
        cookie = new Cookies();
      } else {
        cookie = new Cookies(req.headers.cookie);
      }
      return cookie.get(app.$storage(arg));
    },
    set: (...arg) => {
      const opt = { path: '/' };
      if (arg[2]) {
        opt.maxAge = 2592000;
      }
      if (arg[3]) {
        for (const i in arg[3]) {
          opt[i] = arg[3][i];
        }
      }
      if (process.browser) {
        cookie = new Cookies();
      } else {
        cookie = new Cookies(req.headers.cookie);
      }
      cookie.set(app.$storage(arg[0]), arg[1], opt);
    },
    remove: (arg) => {
      if (process.browser) {
        cookie = new Cookies();
      } else {
        cookie = new Cookies(req.headers.cookie);
      }
      cookie.remove(app.$storage(arg), { path: '/' });
    }
  });
  inject('logout', () => {
    app.$localstorage.remove('token');
  });
  inject('generator', (times) => {
    return (function* g(times) {
      for (let i = 0; i < times - 1; i++) {
        yield;
      }
    })(times);
  });
};
