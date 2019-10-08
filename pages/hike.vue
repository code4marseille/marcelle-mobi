<!-- pages/le_nom_de_ma_page.vue => localhost:3000/le_nom_de_ma_page -->
<template>
  <div class="text-center pt-5">
    <h1 id="titre">Click HERE</h1>
    <h2>Je suis un example de page en VanillaJS</h2>
    <div id="mapid"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    // VOTRE JS ICI
    head: {
      title: "Marcelle-mobi";
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Déplacez-vous autrement dans Marseille"
        }
      ];
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/leaflet@1.5.1/dist/leaflet.css",

          integrity:
            "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==",

          crossorigin: ""
        }
      ];
    }
    const titre = document.getElementById("titre");
    titre.onclick = () => {
      alert("Vous avez cliqué");
    };
  }
};
</script>
<script src="https://unpkg.com/leaflet@1.5.1/dist/leaflet.js"
   integrity="sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og=="
   crossorigin=""></script>
<style scoped>
h1 {
  color: red;
}

#mapid {
  height: 180px;
}
</style>
