import axios from 'axios';
import { serializeEvent } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
  event: null,
  isEditMode: false,
};

const getters = {
  // events: (state) =>
  //   state.events.map((event) => {
  //     return {
  //       ...event,
  //       start: new Date(event.start),
  //       end: new Date(event.end),
  //     };
  //   }),
  // event: (state) =>
  //   state.event
  //     ? {
  //         ...state.event,
  //         start: new Date(state.event.start),
  //         end: new Date(state.event.end),
  //         startDate: format(new Date(state.event.start), 'yyyy/MM/dd'),
  //         endDate: format(new Date(state.event.end), 'yyyy/MM/dd'),
  //       }
  //     : null,
  events: (state) => state.events.map((event) => serializeEvent(event)),
  event: (state) => serializeEvent(state.event),
  isEditMode: (state) => state.isEditMode,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, bool) => (state.isEditMode = bool),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data); // mutationを呼び出す
  },
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
