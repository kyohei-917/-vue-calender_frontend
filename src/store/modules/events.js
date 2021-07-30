import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
  event: null,
};

const getters = {
  events: (state) => state.events.map((event) => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    };
  }),
  event: state => state.event ? {
    ...state.event,
    state: new Date(state.event.start),
    end: new Date(state.event.end),
  } : null,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
