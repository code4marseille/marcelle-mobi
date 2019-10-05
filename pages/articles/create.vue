<template>
  <div id="createArticlePage">
    <header class="px-3 py-2 d-flex justify-content-center">
      <h3 class="text-uppercase pt-3">Ajouter un article</h3>
    </header>
    <div class="form-contener pb-5">
      <b-input-group id="input-group-1" label="Lien url" label-for="input-3" class="label mt-3">
        <b-form-input
          id="input-3"
          v-model="form.url"
          type="text"
          required
          label="Photo"
          placeholder="URL de votre article"
          class="mb-2 inputFormCreateArticle"
        ></b-form-input>
        <b-input-group-append append="OK">
          <b-button
            class="d-flex"
            variant="primary"
            style="height:38px;border-radius:0px 5px 5px 0px;"
            @click="fetchPreview"
          >OK</b-button>
        </b-input-group-append>
      </b-input-group>
      <p class="text_message_error">{{errorMessage}}</p>

      <!-- SECOND PART -->
      <template v-if="previewLoaded">
        <b-form-group id="input-group-1" label="Photo" label-for="input-1" class="label">
          <img v-if="form.imgUrl" :src="form.imgUrl" class="img-fluid" />
        </b-form-group>

        <b-form-group id="input-group-1" label="Titre" label-for="input-1" class="label">
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            required
            placeholder="Titre de votre article"
            class="mb-4 inputFormCreateArticle"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Description" label-for="input-2" class="label">
          <b-form-input
            id="input-2"
            v-model="form.description"
            type="text"
            required
            placeholder="Courte description"
            class="mb-4 inputFormCreateArticle"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Nom" label-for="input-3" class="label">
          <b-form-input
            id="input-4"
            v-model="form.publisherName"
            type="text"
            required
            placeholder="Votre nom"
            autocomplete="first_name"
            class="mb-4 inputFormCreateArticle"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Mail" label-for="input-3" class="label">
          <b-form-input
            id="input-5"
            v-model="form.publisherEmail"
            type="email"
            autocomplete="email"
            required
            placeholder="Votre mail"
            class="mb-4 inputFormCreateArticle"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Catégorie"
          label-for="input-4"
          class="label contener-categories"
        >
          <b-button
            v-for="(category, idx) in categories"
            :key="idx"
            :pressed="form.selectedCategory === category"
            @click="selectCategory(category)"
            class="p-4 text-uppercase btn-caption border-0"
          >{{category }}</b-button>
        </b-form-group>

        <b-button
          @click.prevent="sendArticle"
          type="submit"
          block
          pill
          variant="primary"
          :disabled="emptyFields"
        >Valider votre article</b-button>
      </template>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      form: {
        url: '',
        title: '',
        description: '',
        imgUrl: '',
        publisherName: '',
        publisherEmail: '',
        selectedCategory: ''
      },
      errorMessage: '',
      categories: ['écologie', 'mobilité', 'politique', 'bons plans'],
      previewLoaded: false
    }
  },

  computed: {
    emptyFields() {
      for (let field in this.form) {
        if (this.form[field] == '') return true
      }
      return false
    },
    validEmail() {
      var regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
      return regex.test(this.form.url)
    }
  },

  methods: {
    selectCategory(category) {
      this.form.selectedCategory = category
    },
    async fetchPreview() {
      this.previewLoaded = false
      this.errorMessage = ''
      if (!this.validEmail) {
        this.errorMessage = 'Désolé, cet URL est incorrect'
      } else {
        const preview = await this.$axios.$get('/articles/preview', {
          params: { url: this.form.url }
        })
        Object.assign(this.form, preview)
        this.previewLoaded = true
        this.errorMessage = ''
      }
    },
    async sendArticle() {
      await this.$axios.$post('/articles', {
        title: this.form.title,
        description: this.form.description,
        img_url: this.form.imgUrl,
        url: this.form.url,
        publisher_name: this.form.publisherName,
        publisher_email: this.form.publisherEmail,
        category: this.form.selectedCategory
      })
      this.$router.push('/articles/validate')
    }
  }
}
</script>

<style lang="scss">
#createArticlePage {
  header {
    z-index: 4;
  }
  .fa-bars {
    font-size: 2em;
  }

  .contener-categories div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }

  .contener-categories div .btn-caption {
    border-radius: 15px !important;
  }

  header {
    color: white;
    background-color: rgb(37, 169, 232);
    position: fixed;
    width: 100vw;
  }

  .form-contener {
    padding: 70px 7vw 0;
  }

  .text_message_error {
    color: white;
    text-align: center;
    margin-top: 20px;
    font-size: 15px;
  }

  label {
    text-transform: uppercase;
    color: white;
    margin-bottom: 10px;
  }

  button.active {
    background-color: white !important;
    color: rgb(37, 169, 232) !important;
    opacity: 1;
  }

  .btn-caption {
    background-color: rgba(255, 255, 255, 0.2);
    opacity: 0.5;
  }
}
</style>
