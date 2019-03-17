<template>
<v-app id="inspire">
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text">Home</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.stop="drawer = !drawer">
      <v-avatar size="35" color="indigo">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer right="true" v-model="drawer" absolute temporary>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar size="35" color="indigo">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Edit Profile</div>
        </template>
        <v-card>
          <v-form>
            <v-container>
              <v-layout row wrap <v-flex xs12>
                <v-text>Topics (Select Topics Below)</v-text>
                <v-container fluid>

                </v-container>
                <v-text>Courses (Select Courses Below)</v-text>
                <v-container fluid>

                </v-container>
                <v-text>Availability (Select Available Days)</v-text>
                <v-container fluid>
                  <v-checkbox v-model="checkbox1" :label="`Monday`"></v-checkbox>
                  <v-checkbox v-model="checkbox2" :label="`Tuesday`"></v-checkbox>
                  <v-checkbox v-model="checkbox3" :label="`Wednesday`"></v-checkbox>
                  <v-checkbox v-model="checkbox4" :label="`Thursday`"></v-checkbox>
                  <v-checkbox v-model="checkbox5" :label="`Friday`"></v-checkbox>
                  <v-checkbox v-model="checkbox6" :label="`Saturday`"></v-checkbox>
                  <v-checkbox v-model="checkbox7" :label="`Sunday`"></v-checkbox>
                </v-container>
                <v-text>Personality Preferences (Select Up To 5)</v-text>
                <v-container fluid>
                  <v-checkbox v-model="personality1" :label="`Example1`"></v-checkbox>
                  <v-checkbox v-model="personality2" :label="`Example2`"></v-checkbox>
                </v-container>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-navigation-drawer>


  <v-layout align-center justify-center>
    <v-flex sx12 sm4>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" height="450px" class="center center">
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
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros
            to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>


  <v-toolbar color="#eeeeee">
    <v-spacer></v-spacer>
    <v-btn fab>
      <v-icon fab color="red">block</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn fab>
      <v-icon fab color="pink">favorite</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </v-toolbar>
</v-app>
</template>

<script>
export default {
  name: "student",
  
  data: () => ({
    show: false,
    drawer: false,
    items: [{
        title: 'Tutor Mode',
        icon: 'fas fa-exchange-alt'
      },
      {
        title: 'Edit Profile',
        icon: 'fas fa-edit'
      },
      {
        title: 'Sign Out',
        icon: 'fas fa-sign-out-alt'
      },
    ],
    mini: true,
    right: null,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    peronality1: false,
    personality2: false

  })
}
</script>

<!--
<style scoped>
.backgound {
  background-color=#
}
</style>
-->
