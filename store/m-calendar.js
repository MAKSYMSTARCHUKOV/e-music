export const state = () => ({
  select: new Date().toLocaleDateString(),
  day: new Date().getDay()
});

export const getters = {
  getDate: (state) => {
    return state.select;
  }
};

export const mutations = {
  setDate: (state, payload) => {
    state.select = payload[0];
    state.day = payload[1];
  }
};

export const actions = {};
