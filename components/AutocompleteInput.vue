 <template>
  <div style="display:flex; position:absolute">
    <vue-bootstrap-typeahead
      class="mb-4"
      v-model="addressSearch"
      :data="addresses"
      :serializer="item => item.properties.label"
      placeholder="Veuillez entrer une adresse"
      @hit="selectedAddress = $event"
      required
      style="width:100%"
    />

    <!-- <b-form-select
      ref="cityTypeahead"
      v-model="insee"
      :options="inseeCodes.inseeCodes"
      class="mb-3"
      value-field="inseeCode"
      text-field="city"
      style="width:20%"
      required
      @click="addressSearch"
    ></b-form-select>-->
  </div>
  <!-- <b-modal
       title="BootstrapVue"
       id="notFound"
       style="display:flex; flex-direction:row; justify-content:center"
       ok-only
     >
       <p
         class="my-4"
         style="text-align:center"
       >Adresse non trouvée dans Marseille Provence Métropole</p>
       <img src="~/assets/images/mpm.png" style="width:100%" alt />
     </b-modal>
  </div>-->
</template>

 <script>
import _ from 'underscore'
import inseeCodes from '~/static/inseeCodes'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
  components: {
    VueBootstrapTypeahead,
    inseeCodes
  },
  data() {
    return {
      addresses: [],
      addressSearch: '',
      selectedAddress: null,
      inseeCodes,
      insee: ''
    }
  },
  watch: {
    addressSearch(query) {
      return this.$axios
        .$get('https://api-adresse.data.gouv.fr/search/', {
          params: {
            q: query,
            limit: 10,
            citycode: this.insee === '' ? 13055 : this.insee
          }
        })
        .then(result => (this.addresses = result.features))
    },

    insee: function checkInsee(value) {
      value === '' ? (this.inseeBoolean = false) : (this.inseeBoolean = true)
    }
  },
  filters: {
    stringify(value) {
      return JSON.stringify(value, null, 2)
    }
  }
}
</script>
