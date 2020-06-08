<template>
  <div class="board">
    <Card
      v-for="(pokemon, index) in pokemons"
      :pokemon="pokemon"
      :key="`${pokemon.id}-${index}`"
      @click.native="flipCard(index)"
      :ref="`cards-${index}`"
    />
  </div>
</template>

<script>
import Card from "./Card";
import PokemonService from "../services/PokemonService"

export default {
  name: "Board",
  components: {
    Card,
  },
  data() {
    return {
      countPokemon: 802,
      pokemons: [],
      maxCards: 4,
      hasFlippedCard: false,
      lockBoard: false,
      firstCard: { id: null, name: null, sprite: null },
      secondCard: { id: null, name: null, sprite: null },
      firstElement: null,
      secondElement: null,
    };
  },
  created() {
    this.getRandomPokemon();
  },
  methods: {
    getRandomPokemon() {
      let maxNumberPokemon = Math.floor(
        Math.random() * (this.countPokemon - Math.pow(this.maxCards, 2) / 2 + 1)
      );
      this.getPokemon(maxNumberPokemon);
    },
    async getPokemon(number) {
      for (var i = number; i < number + Math.pow(this.maxCards, 2) / 2; i++) {
        PokemonService
          .get(`/pokemon/${i}`)
          .then((response) => {
            let pokemon = {
              id: response.data.id,
              name: response.data.name,
              sprite: response.data.sprites.front_default,
            };
            this.pokemons.push(pokemon);
            this.pokemons.push(pokemon);
          })
          .then(() => {
            this.randomOrder();
            this.pokemons = this.pokemons.reverse();
            this.randomOrder();
          });
      }
    },
    randomOrder() {
      let newPos, temp;
      for (let i = this.pokemons.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = this.pokemons[i];
        this.pokemons[i] = this.pokemons[newPos];
        this.pokemons[newPos] = temp;
      }
    },
    flipCard(index) {
      const clickedCard = this.$refs[`cards-${index}`][0]._props.pokemon;

      if (this.lockBoard) return;
      if (clickedCard.id === this.firstCard.id) return;
      console.log(event.target.parentElement, event.target.currentElement)
      this.firstElement = event.target.parentElement;
      event.target.parentElement.classList.add("flip");

      if (!this.hasFlippedCard) {
        // first click
        this.hasFlippedCard = true;
        this.firstCard = clickedCard;

        return;
      }
      this.secondElement = event.target.parentElement;
      this.secondCard = clickedCard;
      console.log(this.secondElement, this.firstElement);

      this.checkForMatch();
    },
    checkForMatch() {
      let isMatch = this.firstCard.id === this.secondCard.id;
        console.log(isMatch);
      isMatch ? this.disableCards() : this.unflipCards();
    },
    disableCards() {
    //   this.firstCard.removeEventListener('click', this.flipCard);
    //   this.secondElement.removeEventListener('click', this.flipCard);
      this.resetBoard();
    },
    unflipCards() {
      this.lockBoard = true;

      setTimeout(() => {
        this.firstElement.classList.remove("flip");
        this.secondElement.classList.remove("flip");
        this.resetBoard();
      }, 1500);
    },
    resetBoard() {
      [this.hasFlippedCard, this.lockBoard] = [false, false];
      [this.firstCard, this.secondCard] = [
        { id: null, name: null, sprite: null },
        { id: null, name: null, sprite: null },
      ];
    },
  },
};
</script>
