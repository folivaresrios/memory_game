<template>
  <div class="board">
    <Card
      v-for="(pokemon, index) in pokemons"
      :pokemon="pokemon"
      :key="`${pokemon.id}-${index}`"
      :data-match="pokemon.id"
    />
  </div>
</template>

<script>
import Card from "./Card"
import axios from "axios";

export default {
  name: "Board",
  components: {
    Card
  },
  data() {
    return {
      countPokemon: 802,
      pokemons: [],
      maxCards: 4
    };
  },
  created() {
      this.getRandomPokemon();
  },
  methods: {
    getRandomPokemon() {
        let maxNumberPokemon = Math.floor(Math.random() * (this.countPokemon - (Math.pow(this.maxCards, 2) / 2) + 1));
        this.getPokemon(maxNumberPokemon);
    },
    async getPokemon(number) {
        for(var i = number; i < (number + (Math.pow(this.maxCards, 2) / 2)); i++) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`).then((response) => {
                let pokemon = {
                        id: response.data.id,
                        name: response.data.name,
                        sprite: response.data.sprites.front_default
                    };
                this.pokemons.push(pokemon);
                this.pokemons.push(pokemon);
            }).then(() => this.randomOrder());
        }
    },
    randomOrder(){
        let newPos, temp;
        for(let i = this.pokemons.length - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = this.pokemons[i];
            this.pokemons[i] = this.pokemons[newPos];
            this.pokemons[newPos] = temp;
        }
    }
  },
};
</script>
