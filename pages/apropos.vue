<template>
  <div id="aProposPage">
    <header class="px-3 py-2 d-flex">
      <h2 class="text-uppercase pt-2 text-center flex-grow-1">A PROPOS</h2>
    </header>
    <content class="d-flex justify-content-around">
      <div class="mt-5">
        <first-box>
          <div class="category_apropos" v-b-toggle.collapse-1>
            <p class="text_card_apropos" style="position: absolute; top: 65px; right: 20px;">Données</p>
            <img src="~/assets/images/Data.svg" class="image_data" alt style="width:220px;" />
          </div>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group class="list-group list-group-flush">
                <b-list-group-item class="list-group-item" href="http://www.rtm.fr">RTM</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://openweathermap.org/"
                  active
                >Open Weather Map</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://www.atmosud.org/">Atmo Sud</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://www.navitia.io/">Navitia</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://fluctuo.com/">Fluctuo</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://citiz.coop/">Citiz</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </first-box>

        <second-box>
          <div class="category_apropos mt-4" v-b-toggle.collapse-2>
            <p
              class="text_card_apropos"
              style="position: absolute; top: 65px; right: 20px;"
            >Applications</p>
            <img src="~/assets/images/mobility.svg" class="image_mobility" alt style="width:220px;" />
          </div>
          <b-collapse id="collapse-2" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group class="list-group list-group-flush">
                <b-list-group-item class="list-group-item" href="#">...</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </second-box>

        <third-box>
          <div class="category_apropos mt-4" v-b-toggle.collapse-3>
            <p
              class="text_card_apropos"
              style="position: absolute; top: 65px; right: 20px;"
            >Partenaires</p>
            <img
              src="~/assets/images/partenaire.svg"
              class="image_partenaire"
              alt
              style="width:220px;"
            />
          </div>
          <b-collapse id="collapse-3" class="mt-2">
            <b-card class="collapse_card_apropos">
              <b-list-group class="list-group list-group-flush">
                <b-list-group-item class="list-group-item" href="#">La ville de Marseille</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.departement13.fr"
                >Departement Bouches du Rhone</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://code4marseille.fr"
                >Code4MArseille</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.lecloitre13.fr"
                >Le cloître</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://simplon.co">Simplon</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.lewagon.com/fr/marseille"
                >Le Wagon</b-list-group-item>
                <b-list-group-item class="list-group-item" href="https://www.wf3.fr">WebForce3</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://www.pole-emploi.fr/accueil/"
                >Pôle Emploi</b-list-group-item>
                <b-list-group-item
                  class="list-group-item"
                  href="https://missionlocalemarseille.fr"
                >Mission Locale Marseille</b-list-group-item>
              </b-list-group>
            </b-card>
          </b-collapse>
        </third-box>
      </div>
    </content>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
#aProposPage {
  .category_apropos {
    position: relative;
    width: 330px;
    height: 155px;
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
  }

  .image_data {
    position: absolute;
    bottom: -19px;
    left: -5px;
  }

  .image_mobility {
    position: absolute;
    bottom: -20px;
    left: 5px;
  }

  .image_partenaire {
    position: absolute;
    bottom: -37px;
    left: 2px;
  }

  .text_card_apropos {
    text-transform: uppercase;
    color: #0e5da4;
  }
  .collapse_card_apropos {
    border-radius: 15px;
  }

  .card {
    background-color: transparent !important;
    border: none !important;

    .list-group-item {
      text-decoration: none !important ;
      color: white;
      background-color: transparent !important;
    }

    .list-group-item:active {
      color: #0e5da4;
    }

    .list-group-flush .list-group-item {
      border-bottom-color: white;
      border-top-color: white;
      border-block-end-style: none;
      text-transform: uppercase;
    }
  }
}
</style>
