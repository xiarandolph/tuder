<template>
  <div id="app">
    <v-app id="inspire">
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-layout
          align-center
          column
          justify-center
        >
          <h1 class="display-2 font-weight-thin mb-3">TUDER</h1>
          <h4 class="subheading">Tutoring Made Easy!</h4>
        </v-layout>
      </v-parallax>
    </v-app>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>
