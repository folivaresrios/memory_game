<template>
  <div class="card" v-on.native="!isMatch ? { click: () => flipCard() } : {}">
    <div class="front">
      <img
        :src="pokemon.sprite"
        :alt="pokemon.name"
        width="100%"
        height="100%"
      />
    </div>
    <div class="back">
        <div class="pokeball"></div>
    </div>
  </div>
</template>

<script>
import { mapState,  mapActions } from 'vuex';

export default {
  name: "Card",
  props: ["pokemon"],
  data() {
    return {
      isMatch: false
    };
  },
  computed: {
    ...mapState(['firstCard', 'secondCard', 'isLockBoard', 'hasFlippedCard', 'isMatched']),
  },
  methods: {
    flipCard() {
      if (this.isLockBoard) return;
      if (this.pokemon.id === this.firstCard.id && this.pokemon.componentMatch === this.firstCard.componentMatch) return;

      this.$el.classList.add('flip');

      if (!this.hasFlippedCard) {
        // first click
        this.setFlippedCard(true);
        this.setFirstCard(this.pokemon);
        return;
      }
      // second click
      this.setSecondCard(this.pokemon);
      this.checkForMatch();
    },
    checkForMatch() {
      let match = this.firstCard.id === this.secondCard.id;
      match ? this.disableCard() : this.unflipCards();
    },
    disableCard() {
      this.isMatch = true;
      this.setMatchedCard(true);
      this.resetBoard();
    },
    resetBoard() {
      this.unlockBoard();
      this.setFlippedCard(false);
      this.resetCards();
    },
    unflipCards() {
      this.lockBoard();
      setTimeout(() => {
        this.$emit('not-matched', [this.firstCard.componentMatch, this.secondCard.componentMatch]);
        this.resetBoard();
      }, 1000);
    },
    ...mapActions(['lockBoard', 'unlockBoard','setFlippedCard', 'setFirstCard', 'setSecondCard',  'resetCards', 'setMatchedCard']),
  },
};
</script>
