<template>
  <div class="container-form">
    <header class="mb-4 d-flex justify-content-between">
      <i class="fas fa-bars"></i>
      <h2 class="text-uppercase display-4 text-center text-white mr-5">Votre article</h2>
    </header>

    <form class="px-3">
      <div class="title mb-4 form-group">
        <label class="text-white mb-1">TITRE</label>
        <input type="text" class="form-control" placeholder="Titre de votre article" />
      </div>

      <div class="description mb-4 form-group">
        <label class="text-white mb-1">DESCRIPTION</label>
        <input type="text" class="form-control" placeholder="Description de votre article" />
      </div>

      <div class="link mb-4 form-group">
        <label class="text-white mb-1">LIEN URL</label>
        <input type="url" class="form-control" placeholder="https://example.com" />
      </div>

      <div class="categorie mb-4">
        <label class="text-white mb-1">CATEGORIE</label>
      </div>

      <button type="submit" class="btn btn-dark-blue">Valider votre article</button>
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
body {
  font-size: 1.1em;
}

.container-form {
  padding: 2vh 5vw;
}

.fa-bars {
  font-size: 2em;
  color: white;
}
</style>
