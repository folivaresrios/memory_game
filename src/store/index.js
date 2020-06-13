import Vue from "vue";
import Vuex from "vuex";
import PokemonService from "../services/PokemonService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countPokemon: 802,
    pokemons: [],
    maxCards: 4,
    firstCard: { id: null, name: null, sprite: null, componentMatch: null },
    secondCard: { id: null, name: null, sprite: null, componentMatch: null },
    isLockBoard: false,
    hasFlippedCard: false,
    isMatched: false,
  },
  mutations: {
    SET_POKEMONS: (state, pokemons) => {
      state.pokemons = pokemons;
    },
    REVERSE_POKEMONS: (state) => {
      state.pokemons = state.pokemons.reverse();
    },
    ADD_POKEMON: (state, pokemon) => {
      state.pokemons.push(pokemon);
    },
    SET_FIRST_CARD: (state, card) => {
      state.firstCard = card;
    },
    SET_SECOND_CARD: (state, card) => {
      state.secondCard = card;
    },
    SET_LOCK_BOARD: (state, lock) => {
      state.isLockBoard = lock;
    },
    SET_FIRST_CLICK: (state, hasFlippedCard) => {
      state.hasFlippedCard = hasFlippedCard;
    },
    RANDOM_ORDER: (state) => {
      let newPos, temp;
      for (let i = state.pokemons.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = state.pokemons[i];
        state.pokemons[i] = state.pokemons[newPos];
        state.pokemons[newPos] = temp;
      }
    },
    SET_MATCHED_CARD: (state, value) => {
      state.isMatched = value;
    },
  },
  actions: {
    lockBoard({ commit }) {
      commit("SET_LOCK_BOARD", true);
    },
    unlockBoard({ commit }) {
      commit("SET_LOCK_BOARD", false);
    },
    setFirstCard({ commit }, payload) {
      commit("SET_FIRST_CARD", payload);
    },
    setSecondCard({ commit }, payload) {
      commit("SET_SECOND_CARD", payload);
    },
    getPokemons({ commit, state }, number) {
      for (
        let i = number, component = 2;
        i < number + Math.pow(state.maxCards, 2) / 2;
        i++, component += 2
      ) {
        PokemonService.get(`/pokemon/${i}`)
          .then((response) => {
            let pokemon = {
              id: response.data.id,
              name: response.data.name,
              sprite: response.data.sprites.front_default,
              componentMatch: component,
            };
            commit("ADD_POKEMON", pokemon);
            var pokemon2 = { ...pokemon };
            pokemon2.componentMatch = pokemon2.componentMatch - 1;
            commit("ADD_POKEMON", pokemon2);
          })
          .then(() => {
            commit("RANDOM_ORDER");
            commit("REVERSE_POKEMONS");
            commit("RANDOM_ORDER");
          });
      }
    },
    setFlippedCard({ commit }, value) {
      commit("SET_FIRST_CLICK", value);
    },
    resetCards({ commit }) {
      const obj = { id: null, name: null, sprite: null, componentMatch: null };
      commit("SET_FIRST_CARD", obj);
      commit("SET_SECOND_CARD", obj);
    },
    setMatchedCard({ commit }, value) {
      commit("SET_MATCHED_CARD", value);
    },
  },
  getters: {},
  modules: {},
});
