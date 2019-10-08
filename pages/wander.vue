<template>
  <div id="wander">
    <div id="map"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
export default {
  mounted() {
    mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

    const markers = [
      {
        coordinates: [5.373907, 43.295336]
      },

    ];

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

    const addMarkerToMap = (coordinates) => {
      var el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
                  .setLngLat(coordinates)
                  .addTo(map);
    };

    addMarkerToMap(markers[0].coordinates);
  }
}
</script>
<style lang='scss'>
 #wander {
    #map {
      width: 100%;
      height: 100vh;
    }
    .marker {
      background-image: url('../assets/images/pin.svg');
      background-size: cover;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }

</style>
