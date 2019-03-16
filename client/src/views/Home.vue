<template>
<v-app id="inspire">
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Home</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>

  <v-layout align-center justify-center>
      <v-flex sx12 sm4>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            height="450px"
            class="center center"
          >
          </v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">Top western road trips</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>

<!--
  <v-layout align-center justify-center>
    <v-flex xs12 sm6>
      <v-card height="575">
        <v-img class="white--text" height="400px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
        <v-card-title primary-title>
          <div class="headline">NAME</div>
        </v-card-title>
        <v-card-text class="font-weight">Tutor from RPI. Willing to help in mathematics or sceince. Make learning fun again.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros
            to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
  -->

  <v-toolbar color="#eeeeee">
    <v-spacer></v-spacer>
    <v-icon fab dark small color="red">block</v-icon>
    <v-spacer></v-spacer>
    <v-icon fab dark small color="pink">favorite</v-icon>
    <v-spacer></v-spacer>
  </v-toolbar>
</v-app>
</template>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>
