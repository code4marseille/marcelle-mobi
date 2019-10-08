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
    const markers = [43.270038, 5.395930];

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
    };

    const addMarkerToMap = () => {
        geojson.features.forEach(function(marker) {

        var el = document.createElement('div');
        el.className = 'marker';

          // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      });
    };

    initMap();
    addMarkerToMap();
  }
}
</script>
<style scoped>
#map {
  width: 100%;
  height: 100vh;
}

</style>
