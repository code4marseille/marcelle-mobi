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

  mapboxgl.accessToken = process.env.MAPBOX_API_KEY;
  const grant_token = process.env.CODE4MARSEILLE_API_KEY;

  const lineColors = {
    "bike": '#e63bcd',
    "bss": '#19ddff',
    "walking": '#19ff37',
    "public_transport": '#19adff',
  };

  const layerFactory = (coordinates, tag) => {
    console.log(coordinates);
    const id = coordinates[0][0].toString();
    const lineColor = lineColors[tag];

    return ({
      "id": id,
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": coordinates,
          },
        },
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": lineColor,
        "line-width": 8,
      },
    })
  };

  class Wander {
    constructor() {
      this.markers = [];

      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [5.373907, 43.295336],
        zoom: 16,
        hash: true,
      })

      this.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        language: "fr",
        proximity: [5.373907, 43.295336],
        bbox: [5.3072, 43.1716, 5.43, 43.44],
        marker: false,
      });

      this.geocoder.setFlyTo(false);
      this.map.addControl(this.geocoder);
    }

    _handleResult = ({ result }) => {
      this.geocoder.clear();

      this.markers.push(result);

      this._addMarkerToMap(result.center);
      this._getItinary();
    }

    _addMarkerToMap = coordinates => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(this.map);

      this._fitToBounds();
    };

    _fitToBounds = () => {
      const bounds = new mapboxgl.LngLatBounds();

      this.markers.forEach(marker => bounds.extend(marker.center));
      this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 800 });
    };

    _getItinary = () => {
      if (this.markers.length < 2) {
        return;
      }

      const departure = this.markers[this.markers.length - 2];
      const arrival = this.markers[this.markers.length - 1];

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
        .then(({ data }) => this._drawBestResult(data))
        .catch(error => console.log({ error }))
    }

    _drawBestResult = ({ current, alternatives }) => {
      const options = [current, ...alternatives];
      const withoutCar = options.filter(({ tags }) => !tags.includes('car'));

      const sortedOptions = withoutCar.sort((a, b) => a.duration - b.duration);

      let bestOption = sortedOptions[0];
      const walkingOption = sortedOptions.find(section => section.tags.includes("walking"));
      if (walkingOption && walkingOption.duration < 1200) {
        bestOption = walkingOption;
      }

      const sections = bestOption.sections.map(section => {
        return section.geojson && ({
          coordinates: section.geojson.coordinates,
          mode: section.mode || section.type
        });
      });

      const filtered = sections.filter(el => el);
      console.log({sections, filtered})
      filtered.forEach(section => {
        const polyLine = layerFactory(section.coordinates, section.mode);

        this.map.addLayer(polyLine);
      })

    }

    init() {
      this.geocoder.on("result", result => this._handleResult(result));
    }
  }

  export default {
    mounted() {
      const wander = new Wander();
      wander.init();
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
