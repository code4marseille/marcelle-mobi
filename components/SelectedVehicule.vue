<template>
  <div id="bandeau_details" v-if="$store.state.map.selectedVehicule !== null">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="bgLogo">
            <img class="logoVehicule" src="~/assets/images/voiture.svg" />
          </div>
        </div>
        <div class="col-4 descriptionVehicule">
          Modele: {{$store.state.map.selectedVehicule.name}}
          Immatriculation: {{$store.state.map.selectedVehicule.licencePlate}}
        </div>
        <div class="col-5 align-self-center">
          <a href="#">
            <button type="button" class="btn buttonGoApp">Vers l'appli</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
#bandeau_details {
  z-index: 998;
  text-align: center;
  background-color: rgb(207, 206, 206);
  opacity: 1;
  width: 100%;
  box-shadow: 5px 5px 5px gray;
  height: 66%;
  left: 0;
  border-radius: 10px 10px 0px 0px;
}

.logoVehicule {
  width: 50px;
  height: 60px;
}

.bgLogo {
  background-color: white;
  margin: 5px;
}

.buttonGoApp {
  background: #25a9e8;
  border-radius: 100px;
  color: #ffffff;
  text-align: center;
  opacity: 1 !important;
}

.descriptionVehicule {
  font-size: 0.6rem;
}
</style>
