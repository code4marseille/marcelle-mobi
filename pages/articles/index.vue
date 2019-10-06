<template>
  <div class="contener-blog">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-3 text-center flex-grow-1">Bon à savoir</h2>
    </header>
    <main>
      <p class="text-white">Marcelle vous a listé des ressources qui pourraient vous intéresser</p>
      <div class="contener-collapse mb-2">
        <b-button
          v-b-toggle="'collapse-2'"
          class="btn-categorie text-uppercase btn-block p-3"
        >{{selectedCategory || 'Catégories'}}</b-button>
        <b-button @click="resetCategory" v-if="selectedCategory" class="btn-block">
          <span class="small">Revenir sur tous les articles</span>
        </b-button>

        <b-collapse id="collapse-2">
          <b-list-group-item
            v-b-toggle="'collapse-2'"
            class="btn-block item-collapse"
            v-on:click="selectCategory(category)"
            v-for="(category, idx) in categories"
            :key="idx"
          >{{category}}</b-list-group-item>
        </b-collapse>
      </div>
      <b-row class="justify-content-center">
        <b-col cols="12" md="6" lg="4" v-for="(article, id) in filteredArticles" :key="id">
          <b-card class="mb-1 rounded" :img-src="article.imgUrl">
            <a :href="article.url" target="_blank" append="true" class="stretched-link">
              <b-card-title class="title">{{article.title}}</b-card-title>

              <b-card-sub-title>{{article.description}}</b-card-sub-title>
              <b-card-sub-title class="small mt-3">Partagé par {{article.publisherName}}</b-card-sub-title>
              <b-card-text
                class="small text-lowercase text-right card-text-cat"
              >{{ article.category }}</b-card-text>
            </a>
          </b-card>
        </b-col>
        <!--  -->
        <b-col>
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </b-col>
        <!--  -->
        <p v-if="noArticles" class="white py-5 text-center text-white mx-auto">
          Aucun article à afficher dans
          <span class="font-weight-bold">{{selectedCategory}}</span>
          <br />

          <nuxt-link to="/articles/create">
            <b-button variant="primary" class="btn btn-dark-blue my-3">Proposer un article</b-button>
          </nuxt-link>
        </p>
      </b-row>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      categories: ['mobilité', 'écologie', 'politique', 'bons plans'],
      selectedCategory: null,
      page: 1
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category
    },
    resetCategory() {
      this.selectedCategory = null
    },
    async infiniteHandler($state) {
      const data = await this.$axios.$get('/articles', {
        params: { page: this.page }
      })

      this.articles.push(...data.articles)
      if (data.metadata.next) {
        this.page += 1
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },

  computed: {
    filteredArticles() {
      const filteredArticles = this.articles.filter(
        article => article.category == this.selectedCategory
      )
      return this.selectedCategory ? filteredArticles : this.articles
    },
    noArticles() {
      return this.filteredArticles.length === 0
    }
  }
}
</script>

<style lang="scss">
.contener-blog {
  font-size: 1.1em;

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
    color: rgb(37, 169, 232);
    border-radius: 1rem !important;
  }

  .item-collapse {
    background-color: white;
    color: rgb(37, 169, 232);
  }

  .btn-block + .btn-block {
    margin-top: 0;
  }

  .card-text-cat {
    color: rgb(37, 169, 232);
  }

  .rounded {
    border-radius: 1rem !important;
  }

  .card-img {
    width: 100%;
    height: 30vh;
    border-top-left-radius: calc(1rem - 1px);
    border-top-right-radius: calc(1rem - 1px);
  }

  a:hover,
  a:active {
    text-decoration: none;
  }

  .list-group-item {
    border: none;
  }
  .list-group-item:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  .list-group-item:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
</style>
