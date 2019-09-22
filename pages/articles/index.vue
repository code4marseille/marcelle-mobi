<template>
  <div class="contener-blog">
    <header class="mb-4">
      <h2 class="text-uppercase display-4 text-center text-white">Bon à savoir</h2>
    </header>

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
        v-for="{article, index} in articles"
        :key="index"
        class="mb-4 rounded"
        img-src="https://picsum.photos/600/300/?image=25"
      >
        <b-card-title class="title">title</b-card-title>

        <b-card-sub-title>En région PACA</b-card-sub-title>
        <b-card-text class="small text-lowercase text-right card-text-cat">Mobilité</b-card-text>
      </b-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          id: 'id',
          title: 'title',
          content: 'content',
          img: 'img',
          localisation: 'localisation',
          categorie: ['']
        },
        {
          id: 'id',
          title: 'title',
          content: 'content',
          img: 'img',
          localisation: 'localisation',
          categorie: ['']
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.contener-blog {
  padding: 2vh 5vw;

  body {
    font-size: 1.1em;
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
    border-radius: calc(1rem - 1px);
  }
}
</style>
