<template>
  <div id="pageArticle">
    <header class="px-3 py-2">
      <i class="fas fa-bars"></i>
      <span class="small text-lowercase d-flex align-items-center">Mobilité</span>
    </header>
    <article>
      <h3 class="display-4">-400 euros pour l'achat d'un vélo à assistance électrique</h3>

      <p
        class="mt-3"
      >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </article>
    <img src="https://i.goopics.net/RN3dv.png" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#pageArticle {
  .fa-bars {
    font-size: 2em;
  }
  header {
    color: white;
    background-color: rgb(37, 169, 232);
    display: flex;
    justify-content: space-between;
  }
  article {
    padding: 1vh 10vw 2vh 5vw;
    background-color: white;
  }

  article p {
    width: 90%;
  }
  img {
    min-width: 100vw;
  }
}
</style>
