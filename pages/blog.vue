<template>
  <div>
    <header class="mb-4">
      <h2 class="text-uppercase display-4 text-center text-white">Bon à savoir</h2>
    </header>

    <p class="text-white">Marius vous a listé des ressources qui pourraient vous intéresser</p>

    <b-button variant="light" class="text-uppercase btn-block p-3 mb-4 button-categories">Catégories</b-button>

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

<style>
body {
  background-color: rgb(37, 169, 232);
  font-size: 1.1em;
  padding: 2vh 5vw;
}

.button-categories {
  font-weight: bolder;
  color: rgba(37, 169, 232);
  border-radius: 1rem !important;
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
</style>
