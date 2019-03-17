<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid>
                <v-layout align-center justify-center row>
                    <v-flex xs6>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-tabs v-model="current_tab" color="primary" dark slider-color="primary" centered grow>
                                        <v-tab>Student</v-tab>
                                        <v-tab>Tutor</v-tab>
                                </v-tabs>
                            </v-toolbar>
                            <v-card-text>
                                <v-btn color="success" v-on:click="stuff">text</v-btn>
                                <!--student form-->
                                <v-form v-if="current_tab==0">
                                    <div v-if="page == 1">
                                        <h1 class="display-1">What are you studying?</h1>
                                        <v-text-field
                                          name="topics"
                                          label="Fields of Intrest"
                                          id="topics"
                                        ></v-text-field>
                                    </div>
                                    <div v-if="page == 2">
                                        <h1 class="display-1">What courses are you taking?</h1>
                                        <v-text-field
                                          name="courses"
                                          label="Courses"
                                          id="courses"
                                        ></v-text-field>
                                        
                                        
                                        
                                    </div>
                                    <div v-if="page == 3">
                                        <h1 class="display-1">What time(s) are you free?</h1>
                                        <v-text-field
                                          name="availability"
                                          label="Availability"
                                          id="availability"
                                        ></v-text-field>
                                    </div>
                                    <div v-if="page == 4">
                                        <h1 class="display-1">What are you looking for in a tutor?</h1>
                                        <v-text-field
                                          name="personalities"
                                          label="Personalities"
                                          id="personalities"
                                        ></v-text-field>
                                    </div>
                                    <v-pagination v-model="page" :length="4"></v-pagination>
                                </v-form>

                                <!--tutor form-->
                                <v-form v-if="current_tab==1">

                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import router from '@/router';
import $ from "jquery";
window.jQuery = $;
import store from '@/store';

export default {
    name: 'create_user',
    
    methods: {
        stuff: function() {
            console.log(store.state.courses);
        }
    },

    data: function() {
        return {
            courses: store.state.courses,
            current_tab: 0,
            page: 1,
            courses: store.getters.courses,
            topics: ["Math", "Engineering", "Computer Science", "Science", "Humanities", "Business", "Architecture"],
            added_courses: [],
            course_text: "",
        }
    },

    mounted: function() {
    }
}

</script>

<style scoped>
</style>