/* eslint-disable no-unused-vars */
import axios from 'axios';
const FormData = require('form-data');

export default ({ app, $axios, store }, inject) => {
  const { CancelToken } = $axios;
  let cancel;

  function get(url, options = undefined, _key = undefined) {
    const opt = {
      headers: {
        common: {}
      },
      progress: false,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      })
    };
    if (options) {
      const o = options;
      if (o.query) {
        const a = [];
        for (const p in o.query) {
          a.push(`${p}=${encodeURIComponent(o.query[p])}`);
        }
        url += '?' + a.join('&');
      }
      if (o.headers) {
        ({ ...opt.headers.common } = o.headers);
      }
      if (o.token) {
        if (_key) {
          opt.headers.common.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.common.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      }
    } else if (!options) {
      if (_key) {
        opt.headers.common.Authorization = 'Bearer ' + _key;
      } else {
        opt.headers.common.Authorization =
          'Bearer ' + app.$localstorage.get('token') || '';
      }
    }
    return new Promise((resolve, reject) => {
      $axios
        .$get(url, opt)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e.response);
          // if (e.response.data.message) {
          //   if (e.response.data.message.includes('Expired')) {
          //     if (app.$localstorage.get('keep-sign-in')) {
          //       resetToken()
          //         .then((r) => {
          //           resolve(get(url, options, process.server ? r : undefined));
          //         })
          //         .catch((e) => {
          //           reject(e.response);
          //         });
          //     } else {
          //       reject(e.response);
          //     }
          //   } else {
          //     reject(e.response);
          //   }
          // } else {
          //   reject(e.response);
          // }
        });
    });
  }

  function post(url, data, options = undefined, _key = undefined) {
    const opt = {
      headers: {
        common: {}
      },
      progress: false,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      })
    };
    if (options) {
      const o = options;
      if (o.headers) {
        ({ ...opt.headers.common } = o.headers);
      }
      if (o.token) {
        if (_key) {
          opt.headers.common.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.common.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      } else if (!o.token) {
        if (_key) {
          opt.headers.common.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.common.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      }
    } else if (!options) {
      if (_key) {
        opt.headers.common.Authorization = 'Bearer ' + _key;
      } else {
        opt.headers.common.Authorization =
          'Bearer ' + app.$localstorage.get('token') || '';
      }
    }
    return new Promise((resolve, reject) => {
      const fData = new FormData();
      for (const i in data) {
        fData.append(i, data[i]);
      }
      $axios
        .$post(url, fData, opt)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e.response);
          // if (e.response.data.message) {
          //   if (e.response.data.message.includes('Expired')) {
          //     if (app.$localstorage.get('keep-sign-in')) {
          //       resetToken()
          //         .then((r) => {
          //           resolve(
          //             post(url, data, options, process.server ? r : undefined)
          //           );
          //         })
          //         .catch((e) => {
          //           reject(e.response);
          //         });
          //     } else {
          //       reject(e.response);
          //     }
          //   } else {
          //     reject(e.response);
          //   }
          // } else {
          //   reject(e.response);
          // }
        });
    });
  }

  function put(url, data, options = undefined, _key = undefined) {
    const CancelToken = axios.CancelToken;
    const opt = {
      headers: {},
      cancelToken: new CancelToken((c) => {
        cancel = c;
      })
    };
    if (options) {
      const o = options;
      if (o.headers) {
        ({ ...opt.headers } = o.headers);
      }
      if (o.token) {
        if (_key) {
          opt.headers.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      } else if (!o.token) {
        if (_key) {
          opt.headers.common.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.common.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      }
    } else if (!options) {
      if (_key) {
        opt.headers.Authorization = 'Bearer ' + _key;
      } else {
        opt.headers.Authorization =
          'Bearer ' + app.$localstorage.get('token') || '';
      }
    }
    return new Promise((resolve, reject) => {
      // const fData = new FormData();
      // for (const i in data) {
      //   fData.append(i, data[i]);
      // }
      axios
        .put(url, data, opt)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e.response);
          // if (e.response.data.message) {
          //   if (e.response.data.message.includes('Expired')) {
          //     if (app.$localstorage.get('keep-sign-in')) {
          //       resetToken()
          //         .then((r) => {
          //           resolve(
          //             put(url, data, options, process.server ? r : undefined)
          //           );
          //         })
          //         .catch((e) => {
          //           reject(e.response);
          //         });
          //     } else {
          //       reject(e.response);
          //     }
          //   } else {
          //     reject(e.response);
          //   }
          // } else {
          //   reject(e.response);
          // }
        });
    });
  }

  function remove(url, data = {}, options = undefined, _key = undefined) {
    const CancelToken = axios.CancelToken;
    const opt = {
      headers: {},
      data,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      })
    };
    if (options) {
      const o = options;
      if (o.headers) {
        ({ ...opt.headers } = o.headers);
      }
      if (o.token) {
        if (_key) {
          opt.headers.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      } else if (!o.token) {
        if (_key) {
          opt.headers.Authorization = 'Bearer ' + _key;
        } else {
          opt.headers.Authorization =
            'Bearer ' + app.$localstorage.get('token') || '';
        }
      }
    } else if (!options) {
      if (_key) {
        opt.headers.Authorization = 'Bearer ' + _key;
      } else {
        opt.headers.Authorization =
          'Bearer ' + app.$localstorage.get('token') || '';
      }
    }
    return new Promise((resolve, reject) => {
      axios
        .delete(url, opt)
        .then((r) => {
          resolve(r);
        })
        .catch((e) => {
          reject(e.response);
          // if (e.response.data.message) {
          //   if (e.response.data.message.includes('Expired')) {
          //     if (app.$localstorage.get('keep-sign-in')) {
          //       resetToken()
          //         .then((r) => {
          //           resolve(
          //             remove(url, data, options, process.server ? r : undefined)
          //           );
          //         })
          //         .catch((e) => {
          //           reject(e.response);
          //         });
          //     } else {
          //       reject(e.response);
          //     }
          //   } else {
          //     reject(e.response);
          //   }
          // } else {
          //   reject(e.response);
          // }
        });
    });
  }

  // function resetToken() {
  //   return new Promise((resolve, reject) => {
  //     $axios
  //       .$post(
  //         '/api/token/reset',
  //         {
  //           refresh_token: app.$localstorage.get('refresh_token')
  //         },
  //         {
  //           credentials: true,
  //           headers: {
  //             common: {
  //               Authorization: app.$localstorage.get('token')
  //             }
  //           }
  //         }
  //       )
  //       .then((r) => {
  //         app.$localstorage.set('token', r.token, true);
  //         resolve(r.token);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // }

  function init(email, password) {
    return new Promise((resolve, reject) => {
      $axios
        .$post(
          '/api/user/login',
          { email, password },
          {
            progress: false
          }
        )
        .then((r) => {
          app.$localstorage.set('token', r.success.token, true);
          $axios
            .$get('/api/user/profile', {
              headers: {
                common: { Authorization: 'Bearer ' + r.success.token }
              }
            })
            .then((r) => {
              resolve(r);
            })
            .catch((e) => {
              reject(e.response);
            });
        })
        .catch((e) => {
          reject(e.response);
        });
    });
  }

  function register(obj) {
    return post('/api/user/register', {
      email: obj.email,
      password: obj.password,
      c_password: obj.password,
      user_role_id: obj.role
    });
  }

  const profile = {
    getUserById: (id) => {
      return get(`/api/user/profile/${id}`, { token: false });
    },
    getUser: () => {
      return get(`/api/user/profile`);
    },
    updateUser: (obj) => {
      return post('/api/user/profile', obj);
    },
    confirm: () => {
      const { ...send } = JSON.parse(JSON.stringify(store.state.data));
      switch (send.role) {
        case 1:
          send.name = `${send.fields.name.value.value} ${send.fields['second-name'].value.value}`;
          break;
        case 2:
          send.name = `${send.fields.name.value.value} ${send.fields['second-name'].value.value}`;
          break;
        case 3:
          send.name = send.fields.title.value.value;
          break;
        case 4:
          send.name = send.fields.title.value.value;
          break;
      }
      delete send.role;
      send.fields.confirmed.value.value = 'true';
      const f = [];
      for (const y in send.fields) {
        if (y !== 'deleted') {
          if (send.fields[y].value.id === null) {
            send.fields[y].value.id = '';
          }
          if (send.fields[y].type === 4) {
            // if (send.fields[y].value.length === 0) {
            //   send.fields[y].value = [{ id: '', value: '' }];
            // }

            if (Array.isArray(send.fields[y].value)) {
              for (const i of send.fields[y].value) {
                if (i.value.substr(0, 4) === 'data') {
                  f.push({
                    id: send.fields[y].id,
                    type: send.fields[y].type,
                    value: i
                  });
                }
              }
            }
          } else if (send.fields[y].type !== 4) {
            if (
              (app.$isEmpty(send.fields[y].value.id) &&
                !app.$isEmpty(send.fields[y].value.value)) ||
              (!app.$isEmpty(send.fields[y].value.id) &&
                app.$isEmpty(send.fields[y].value.value)) ||
              (!app.$isEmpty(send.fields[y].value.id) &&
                !app.$isEmpty(send.fields[y].value.value))
            )
              f.push({
                id: send.fields[y].id,
                type: send.fields[y].type,
                value: send.fields[y].value
              });
          }
        } else {
          for (const i of send.fields[y].value) {
            if (!app.$isEmpty(i.id)) {
              f.push({
                id: send.fields.photos.id,
                type: 4,
                value: {
                  id: i.id,
                  value: ''
                }
              });
            }
          }
        }
      }
      [...send.fields] = f;
      const k = app.$localstorage.get('token');
      return new Promise((resolve, reject) => {
        $axios
          .$post('/api/user/profile', send, {
            headers: {
              common: {
                Authorization: `Bearer ${k}`
              }
            },
            cancelToken: new CancelToken((c) => {
              cancel = c;
            })
          })
          .then((r) => {
            resolve();
          })
          .catch((e) => {
            reject(e.response);
          });
      });
    },
    getTotal: (roleId) => {
      return get(`/api/user/count/by-role/${roleId}`, { token: false });
    },
    getUserByRole: (roleId) => {
      return get(`/api/user/list/by-role/${roleId}`, { token: false });
    },
    getUsersByRole: (roleId, limit, page) => {
      return get(
        `/api/user/full-list/by-role/${roleId}?page=${page}&per_page=${limit}`,
        { token: false }
      );
    },
    getArtists: (limit, page) => {
      return get(
        `/api/user/by-roles?role_ids[]=2&role_ids[]=3&page=${page}&per_page=${limit}`,
        {
          token: false
        }
      );
    },
    getArtistsTotal: () => {
      return get(`/api/user/count/by-roles?role_ids[]=2&role_ids[]=3`, {
        token: false
      });
    },
    addAgentToPerformer(agent, performerId) {
      return new Promise((resolve, reject) => {
        profile
          .getUserById(performerId)
          .then((r) => {
            const d = r.data;
            profile
              .updateUser({
                id: d.id,
                name: d.name,
                email: d.email,
                fields: [
                  {
                    id: d.fields.agent.id,
                    type: d.fields.agent.type,
                    value: {
                      id:
                        d.fields.agent.value.id === null
                          ? ''
                          : d.fields.agent.value.id,
                      value: JSON.stringify({
                        id: agent.id,
                        name: agent.name
                      })
                    }
                  }
                ]
              })
              .then((r) => {
                resolve();
              })
              .catch((e) => {
                reject(e.response);
              });
          })
          .catch((e) => {
            reject(e.response);
          });
      });
    },
    removeAgentFromPerformer(performerId) {
      return new Promise((resolve, reject) => {
        profile
          .getUserById(performerId)
          .then((r) => {
            const d = r.data;
            profile
              .updateUser({
                id: d.id,
                name: d.name,
                email: d.email,
                fields: [
                  {
                    id: d.fields.agent.id,
                    type: d.fields.agent.type,
                    value: {
                      id:
                        d.fields.agent.value.id === null
                          ? ''
                          : d.fields.agent.value.id,
                      value: ''
                    }
                  }
                ]
              })
              .then((r) => {
                resolve();
              })
              .catch((e) => {
                reject(e.response);
              });
          })
          .catch((e) => {
            reject(e.response);
          });
      });
    }
  };

  const order = {
    getByPeriod: (query) => {
      return get(`/api/user/order/get-by-period`, {
        query,
        token: false
      });
    },
    getOrder: (id) => {
      return get(`/api/user/order/show/${id}`, { token: true });
    },
    create: (obj) => {
      return post(`/api/user/order/create`, obj);
    },
    update: (id, obj) => {
      return put(`/api/user/order/update/${id}`, obj);
    },
    status: (id, status) => {
      return put(`/api/user/order/change-status/${id}`, {
        status
      });
    },
    delete: (id) => {
      return remove(`/api/user/order/delete/${id}`);
    }
  };

  inject('init', init);
  inject('register', register);
  inject('profile', profile);
  inject('order', order);
  inject('cancel', () => {
    if (cancel) {
      cancel();
      cancel = undefined;
    }
  });
};
