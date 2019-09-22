<template>
  <v-sheet id="sidebarComponent" class="overflow-hidden" style="position: fixe;">
    <v-btn @click.stop="drawer = !drawer" text white class="btn-fa-bars text-white">
      <i class="fas fa-bars"></i>
    </v-btn>

    <v-navigation-drawer v-model="drawer" absolute temporary class="sidebar">
      <v-list dense>
        <v-list-item @click.stop="drawer = !drawer" class="items-container text-right">
          <v-icon class="text-white text-right">fas fa-times</v-icon>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" link class="items-container">
          <v-list-item-icon>
            <v-icon class="text-white px-3">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <nuxt-link :to="item.link">
              <v-list-item-title
                class="text-uppercase text-white items-sidebar display-1"
              >{{ item.title }}</v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Accueil', link: '/', icon: 'fas fa-cloud' },
        { title: 'Se déplacer', link: '/map', icon: 'fas fa-map-marker-alt' },
        { title: 'Marius', link: '/marius', icon: 'far fa-user' },
        { title: 'Bon à savoir', link: '/articles', icon: 'fas fa-info' },
        {
          title: 'Ajouter un article',
          link: '/articles/create',
          icon: 'far fa-edit'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#sidebarComponent {
  .btn-fa-bars {
    position: fixed;
    z-index: 450; /* z-index max = 4xx */
    margin: 15px 0 0 0;
    left: 1vw;
  }

  .items-container {
    border-bottom: 0.5px solid white;
    padding: 10px;
  }
  .sidebar {
    background: linear-gradient(156.38deg, #0e5da4 57.92%, #25a9e8 99.79%);
    z-index: 470;
  }
}
</style>
