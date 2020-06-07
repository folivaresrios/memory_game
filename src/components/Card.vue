<template>
  <div class="card">
      <div class="front">
          <img :src="pokemon.sprite" :alt="pokemon.name">
          <span class="name" v-text="pokemon.name"></span>
          <span class="id" v-text="pokemon.id"></span>
      </div>
      <div class="back">a</div>
  </div>
</template>

<script>
export default {
    props: ['pokemon']
}
</script>