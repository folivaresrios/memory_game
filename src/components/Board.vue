<template>
  <div class="board">
    <Card
      v-for="(pokemon, index) in pokemons"
      :pokemon="pokemon"
      :key="`${pokemon.id}-${index}`"
      :data-component="pokemon.componentMatch"
      @not-matched="notMatched"
    />
  </div>
</template>

<script>
import Card from "./Card";
import { mapActions, mapState } from 'vuex';

export default {
  name: "Board",
  components: {
    Card,
  },
  data() {
    return {};
  },
  created() {
    this.getRandomPokemon();
  },
  computed: {
    ...mapState(['maxCards', 'countPokemon', 'pokemons', 'isMatched']),
  },
  methods: {
    getRandomPokemon() {
      let maxNumberPokemon = Math.floor(
        Math.random() * (this.countPokemon - Math.pow(this.maxCards, 2) / 2 + 1)
      );
      this.getPokemons(maxNumberPokemon);
    },
    notMatched(pokemonIds) {
      pokemonIds.forEach((pokemon) => {
        this.$el.querySelector(`[data-component='${pokemon}']`).classList.remove('flip');
      });
      if(this.isMatched) {
        this.flip = false;
      }
    },
    findObjectByKey(array, key, value) {
      for (var i = 0; i < array.length; i++) {
          if (array[i][key] === value) {
              return array[i];
          }
      }
      return null;
    },
    ...mapActions([ 'getPokemons']),
  },
};
</script>
