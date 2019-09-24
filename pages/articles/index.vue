<template>
  <div class="contener-blog">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-2 text-center flex-grow-1">Bon à savoir</h2>
    </header>
    <main>
      <p class="text-white">Marius vous a listé des ressources qui pourraient vous intéresser</p>
      <div class="contener-collapse mb-4">
        <b-button
          v-b-toggle="'collapse-2'"
          class="btn-categorie m-1 text-uppercase btn-block p-3"
        >Catégorie</b-button>
        <b-collapse id="collapse-2">
          <b-button v-b-toggle="'collapse-2'" class="btn-block item-collapse">Catégorie 1</b-button>
          <b-button v-b-toggle="'collapse-2'" class="btn-block item-collapse">Catégorie 2</b-button>
          <b-button v-b-toggle="'collapse-2'" class="btn-block item-collapse">Catégorie 3</b-button>
          <b-button v-b-toggle="'collapse-2'" class="btn-block item-collapse">Catégorie 4</b-button>
        </b-collapse>
      </div>

      <nuxt-link to="/articles/zz">
        <b-card
          v-for="(article, id) in articles"
          :key="id"
          class="mb-4 rounded"
          :img-src="article.imgUrl"
        >
          <b-card-title class="title">{{article.title}}</b-card-title>

          <b-card-sub-title>{{article.description}}</b-card-sub-title>
          <b-card-text class="small text-lowercase text-right card-text-cat">Mobilité</b-card-text>
        </b-card>
      </nuxt-link>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: ''
    }
  },
  mounted() {
    this.$axios
      .$get('/articles')
      .then(
        response => (this.articles = response),
        console.log('reponse : ' + this.articles)
      )
    console.log('reponse : ' + this.articles)
  }
}
</script>

<style lang="scss">
.contener-blog {
  body {
    font-size: 1.1em;
  }

  main {
    padding: 70px 7vw 0;
  }

  header {
    color: white;
    background-color: rgb(37, 169, 232);
    position: fixed;
    width: 100vw;
    z-index: 1;
  }

  button.btn.btn-categorie.btn-secondary.collapsed,
  button.btn.btn-categorie.btn-secondary {
    font-weight: bolder;
    background-color: white;
    color: rgba(37, 169, 232);
    border-radius: 1rem !important;
  }

  .item-collapse {
    margin: 0;
    background-color: white;
    color: rgba(37, 169, 232);
  }

  .btn-block + .btn-block {
    margin-top: 0;
  }

  .card-text-cat {
    color: rgba(37, 169, 232);
  }

  .rounded {
    border-radius: 1rem !important;
  }

  .card-img {
    width: 100%;
    max-height: 30vh;
    border-top-left-radius: calc(1rem - 1px);
    border-top-right-radius: calc(1rem - 1px);
  }
}
</style>
