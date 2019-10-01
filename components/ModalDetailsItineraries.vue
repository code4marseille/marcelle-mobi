<template>
  <div>
    <div class="filterGo">
      <transition name="slide">
        <div v-if="$store.state.marius.seeModal" id="filter" class="container">
          <div class="row justify-content-between mx-0"></div>
          <p class="text-left mb-1">Ce que tu fais actuellement:</p>
          <p class="text-left mb-1">{{$store.getters['marius/getMode']}}</p>
          <p class="text-left mb-1">{{$store.getters['marius/co2current']}}</p>
          <p class="text-left mb-1">{{$store.getters['marius/durationcurrent']}}</p>
          <div></div>
        </div>
      </transition>
      <b-button id="modalTop" @click="$store.commit('marius/TOGGLE_MODAL')" block variant="primary">
        <i class="fas fa-chevron-up"></i>
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  components: {}
}
</script>

<style lang="scss">
#modalTop {
  z-index: 9999;
}

.filterGo {
  width: 100%;
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;

  .active {
    background-color: rgba(187, 231, 255, 0.38);
  }

  #filter {
    z-index: 800;
    text-align: center;
    background-color: aliceblue;
    width: 100%;
    box-shadow: 5px 5px 5px gray;
    transition: transform 0.2s linear;
    max-width: 100%;
  }

  .slide-enter-active,
  .slide-leave-active {
    transform: translateY(200px);
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(200px);
  }
}
</style>
