<template>
  <v-sheet id="sidebarComponent" class="overflow-hidden" style="position: fixe;">
    <v-btn @click.stop="drawer = !drawer" text white class="btn-fa-bars text-white">
      <i class="fas fa-bars"></i>
    </v-btn>

    <v-navigation-drawer v-model="drawer" absolute temporary class="sidebar">
      <v-list dense>
        <v-list-item @click.stop="drawer = !drawer" class="items-container text-right">
          <img src="~/assets/images/cancel.svg" alt="close" class="close-svg" />
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.title" link class="items-container">
          <v-list-item-icon>
            <!-- <v-icon class="text-white px-3">{{ item.icon }}</v-icon> -->
            <img svg-inline :src="item.icon" class="icon-sidebar" />
          </v-list-item-icon>

          <v-list-item-content>
            <nuxt-link :to="item.link" class="stretched-link">
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
        {
          title: 'Accueil',
          link: '/',
          icon: require('~/assets/images/navbarHome.svg')
        },
        {
          title: 'Se déplacer',
          link: '/map',
          icon: require('~/assets/images/navbarMap.svg')
        },
        {
          title: 'Marius',
          link: '/marius',
          icon: require('~/assets/images/navbarMarius.svg')
        },
        {
          title: 'Bon à savoir',
          link: '/articles',
          icon: require('~/assets/images/navbarBlog.svg')
        },
        {
          title: 'Proposer un article',
          link: '/articles/create',
          icon: require('~/assets/images/navbarCreateArticle.svg')
        },
        {
          title: 'À propos',
          link: '/apropos',
          icon: require('~/assets/images/help.svg')
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

  .fa-bars {
    background-color: rgba(39, 167, 232, 0.7);
    border-radius: 10px;
    padding: 10px;
  }

  .items-container {
    border-bottom: 0.5px solid white;
    padding: 10px;
  }
  .sidebar {
    background: linear-gradient(156.38deg, #0e5da4 57.92%, #25a9e8 99.79%);
    z-index: 470;
    position: fixed;
  }

  .active {
    background-color: none !important;
  }

  .icon-sidebar {
    min-width: 40px;
    min-height: 40px;
    width: 6vw;
    height: 5vw;
    margin: 0 20px 0 1vh;
  }
  .close-svg {
    font-size: 30%;
    width: 10%;
    margin: 1vh 1vw 1vh auto;
  }
}
</style>
