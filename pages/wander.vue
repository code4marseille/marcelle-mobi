<template>
  <div id="wander">
    <div id="map"></div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const grant_token = process.env.CODE4MARSEILLE_API_KEY;

export default {
  mounted() {
    mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

    const markers = [];

    const addMarkerToMap = coordinates => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
                  .setLngLat(coordinates)
                  .addTo(map);
    };

    const createMarker = ({ result }) => {
      markers.push(result);
      addMarkerToMap(result.center);
    }

    const drawBestResult = ({ current, alternatives }) => {
      const options = [current, ...alternatives];
      const withoutCar = options.filter(({ tags }) => !tags.includes('car'));

      const sortedOptions = withoutCar.sort((a, b) => a.duration - b.duration);
      const bestOption = sortedOptions[0];

      console.log({ bestOption });
    }

    const getItinary = () => {
      if (markers.length < 2) {
        return;
      }

      const departure = markers[markers.length - 2];
      const arrival = markers[markers.length - 1];

      const [lng_departure, lat_departure] = departure.center;
      const [lng_arrival, lat_arrival] = arrival.center;

      const params = {
        grant_token,
        lat_departure,
        lng_departure,
        lat_arrival,
        lng_arrival,
        mode: "walking",
      };

      axios
        .get('http://marcelle-mobi-api.herokuapp.com/itineraries/calculate', { params })
        .then(({ data }) => drawBestResult(data))
        .catch(error => console.log({ error }))
    }

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5.373907, 43.295336],
      zoom: 16,
      hash: true
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: "fr",
      proximity: [5.373907, 43.295336],
      bbox: [5.3072, 43.1716, 5.43, 43.44],
      marker: false,
    });

    geocoder.setFlyTo(false);
    geocoder.on("result", result => {
      createMarker(result);
      geocoder.clear();
      getItinary();
    });

    map.addControl(geocoder);
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
