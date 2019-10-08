<!-- pages/le_nom_de_ma_page.vue => localhost:3000/le_nom_de_ma_page -->
<template>
  <div id="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
export default {
  mounted() {
    // const map = L.map('map', { zoomControl: false })
    //              .setView([43.295336, 5.373907], 16);

    // L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   maxZoom: 18,
    //   id: 'streets-v11',
    //   accessToken: process.env.MAPBOX_API_KEY
    // }).addTo(map);

    // L.control.zoom({
    //   position:'topright'
    // }).addTo(map);

    const initMap = () => {
      mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11", 
        center: [5.373907, 43.295336],
        zoom: 16, 
        hash: true
      })

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          marker: false,
        }),
      );
    }

    initMap();
  }
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}

</style>