<template>
  <div>
    <header class="px-3 py-2">
      <p class="text-uppercase text-center display-4">Votre article</p>
    </header>
    <div class="form-contener">
      <!-- title -->
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Titre" label-for="input-1" class="label">
          <b-form-input
            id="input-1"
            v-model="text"
            type="text"
            required
            placeholder="Titre de votre article"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- description -->
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Description" label-for="input-2" class="label">
          <b-form-input
            id="input-2"
            v-model="description"
            type="text"
            required
            placeholder="Courte description"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- url -->
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Lien url" label-for="input-3" class="label">
          <b-form-input
            id="input-3"
            v-model="url"
            type="text"
            required
            placeholder="Lien votre article"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- Categories -->
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Catégorie" label-for="input-4" class="label">
          <b-button
            v-for="(btn, idx) in buttons"
            :key="idx"
            :pressed.sync="btn.state"
            variant="primary"
          >{{ btn.caption }}</b-button>
        </b-form-group>
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
        { caption: 'écologie', state: true },
        { caption: 'mobilité', state: false },
        { caption: 'politique', state: true },
        { caption: 'bons plans', state: false }
      ]
    }
  }
}
</script>

<style>
.fa-bars {
  font-size: 2em;
}
header {
  color: white;
  background-color: rgb(37, 169, 232);
}

.form-contener {
  padding: 0 7vw;
}

.label {
  text-transform: uppercase;
  color: white;
}
</style>
