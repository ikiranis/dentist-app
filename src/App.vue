<template>
  <div id="app">

    <div v-if="apiWorks">

      <menu-bar />

      <router-view class="mt-5 pt-5"/>

<!--      <b-navbar toggleable="md" type="dark" variant="dark">-->

<!--        &lt;!&ndash; Right aligned nav items &ndash;&gt;-->
<!--        <b-navbar-nav class="ml-auto">-->

<!--          <b-nav-item href="http://apps4net.eu">-->
<!--            Created by apps4net.eu-->
<!--          </b-nav-item>-->

<!--        </b-navbar-nav>-->

<!--      </b-navbar>-->

    </div>

    <div v-else>
      Api not works
    </div>

  </div>

</template>

<script>
  import api from "@/api";
  import MenuBar from "@/components/basic/MenuBar";

  export default {
    components: { MenuBar },

    data: () => ({
      apiWorks: true
    }),

    created: function () {
      this.getApiWorks();
    },

    methods: {

      getApiWorks() {
        api.getApiWorks()
                .then(() => {
                  this.apiWorks = true;
                })
                .catch(error => {
                  this.apiWorks = false;
                  console.log(error);
                });
      }

    }
  }
</script>

<style lang="scss">
  #app {
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    color: #2c3e50;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #logout {
    cursor: pointer;
  }

  .btn-icon {
    cursor: pointer;
  }
</style>