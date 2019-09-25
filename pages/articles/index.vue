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
          <b-button
            v-b-toggle="'collapse-2'"
            class="btn-block item-collapse"
            v-on:click="selectCategory(category)"
            v-for="(category, idx) in categories"
            :key="idx"
          >{{category}}</b-button>
        </b-collapse>
      </div>

      <b-card
        v-for="(article, id) in filteredArticles"
        :key="id"
        class="mb-4 rounded"
        :img-src="article.imgUrl"
      >
        <a :href="article.url" target="_blank" append="true" class="stretched-link">
          <b-card-title class="title">{{article.title}}</b-card-title>

          <b-card-sub-title>{{article.description}}</b-card-sub-title>
          <b-card-sub-title class="small mt-3">Partagé par {{article.publisherName}}</b-card-sub-title>
          <b-card-text class="small text-lowercase text-right card-text-cat">{{ article.category }}</b-card-text>
        </a>
      </b-card>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      categories: ['mobilité', 'politique', 'bons plans', 'écologie', 'tout'],
      selectedCategory: null
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    }
  },
  computed: {
    filteredArticles() {
      if (this.selectedCategory == null || this.selectedCategory == 'tout')
        return this.articles
      else {
        let filteredArticles = []

        for (let article in this.articles) {
          if (this.articles[article].category === this.selectedCategory)
            filteredArticles.push(this.articles[article])
        }
        return filteredArticles
      }
    }
  },

  mounted() {
    this.$axios.$get('/articles').then(response => (this.articles = response))
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

  a:hover,
  a:active {
    text-decoration: none;
  }
}
</style>
