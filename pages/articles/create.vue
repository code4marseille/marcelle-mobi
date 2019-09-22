<template>
  <div id="createArticlePage">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-2 text-center flex-grow-1">Votre article</h2>
    </header>
    <div class="form-contener">
      <!-- title -->
      <b-form v-if="show">
        <b-form-group id="input-group-1" label="Titre" label-for="input-1" class="label">
          <b-form-input
            id="input-1"
            v-model="text"
            type="text"
            required
            placeholder="Titre de votre article"
            class="mb-4"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- description -->
      <b-form v-if="show">
        <b-form-group id="input-group-1" label="Description" label-for="input-2" class="label">
          <b-form-input
            id="input-2"
            v-model="description"
            type="text"
            required
            placeholder="Courte description"
            class="mb-4"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- url -->
      <b-form v-if="show">
        <b-form-group id="input-group-1" label="Lien url" label-for="input-3" class="label">
          <b-form-input
            id="input-3"
            v-model="url"
            type="text"
            required
            placeholder="Lien votre article"
            class="mb-4"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- Categories -->
      <b-form v-if="show">
        <b-form-group
          id="input-group-1"
          label="Catégorie"
          label-for="input-4"
          class="label contener-categories"
        >
          <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            :pressed.sync="btn.state"
            @click="deactive(idx)"
            class="p-4 text-uppercase btn-caption border-0"
          >{{ btn.caption }}</b-button>
        </b-form-group>

        <b-button type="submit" variant="primary" class="btn btn-dark-blue">Valider votre article</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      description: '',
      url: '',
      show: true,
      buttons: [
        { caption: 'écologie', state: false },
        { caption: 'mobilité', state: false },
        { caption: 'politique', state: false },
        { caption: 'bons plans', state: false }
      ],
      buttonSelected: 1
    }
  },
  methods: {
    deactive: function(id) {
      for (let i = 0; i < this.buttons.length; i++) {
        if (id != i) {
          this.buttons[i].state = false
          // console.log("toto");
        }
        this.isSelected()
      }
    },

    isSelected: function() {
      // console.log(this.buttons.map(button => button.state))
      const activated = this.buttons.findIndex(function(e) {
        return e.state === true
      })

      this.buttonSelected = activated
      console.log(this.buttonSelected)
    }
  }
}
</script>

<style lang="scss">
#createArticlePage {
  .fa-bars {
    font-size: 2em;
  }
  header {
    color: white;
    background-color: rgb(37, 169, 232);
    display: flex;
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
  }

  .form-contener {
    padding: 0 7vw;
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

  .btn-dark-blue[type='submit'] {
    margin: 15vh auto;
    display: flex;
  }
}
</style>
