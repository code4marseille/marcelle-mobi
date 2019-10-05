<template>
  <div class="d-flex flex-column justify-content-between" id="validatePage">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-3 text-center flex-grow-1">Envoyé</h2>
    </header>
    <div class="text-uppercase w-75 mx-auto">
      <p>La création de votre article a bien été prise en compte !</p>

      <p>Notre équipe le publiera dès que possible !</p>
    </div>

    <img src="~/assets/images/paper-plane.svg" alt="paper plane" />
    <div>
      <nuxt-link to="/articles/create">
        <b-button variant="primary" class="btn btn-dark-blue mb-3">Proposer un autre article</b-button>
      </nuxt-link>
      <nuxt-link to="/articles">
        <b-button variant="primary" class="btn btn-dark-blue mb-3">Retourner sur le blog</b-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#validatePage {
  height: 100vh;

  div {
    color: white;
    text-align: center;
  }

  .fa-bars {
    font-size: 2em;
  }

  header {
    color: white;
    background-color: rgb(37, 169, 232);
    display: flex;
    justify-content: space-between;
  }

  .fa-paper-plane {
    font-size: 50%;
  }

  img {
    width: 20%;
    margin: 0 auto 10vh auto;
  }
}
</style>
