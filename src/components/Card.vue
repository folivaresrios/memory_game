<template>
  <div class="card">
    <div class="front">
      <img :src="pokemon.sprite" :alt="pokemon.name" width="100%" height="100%" />
    </div>
    <div class="back">BackCard</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["pokemon"],
  methods: {
    //   flipCard(index) {
    //   console.log(
    //     event.target.parentElement.parentElement,
    //     this.$refs[`cards-${index}`][0]._props.pokemon
    //   );
    //   const clickedCard = this.$refs[`cards-${index}`][0]._props.pokemon;
    //   if (this.lockBoard) return;
    //   if (clickedCard === this.firstCard) return;
    //   event.target.parentElement.parentElement.classList.add("flip");
    //   if (!this.hasFlippedCard) {
    //     // first click
    //     this.hasFlippedCard = true;
    //     this.firstCard = clickedCard;
    //     return;
    //   }
    //   // second click
    //   this.secondCard = clickedCard;
    //   this.checkForMatch();
    // },
  },
};
</script>
