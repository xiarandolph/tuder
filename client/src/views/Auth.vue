<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-tabs
                                  v-model="current_tab" color="primary" dark slider-color="primary" right=true
                                >
                                    <v-tab>
                                        Register
                                    </v-tab>
                                    <v-tab>
                                        Login
                                    </v-tab>
                                </v-tabs>
                            </v-toolbar>
                            <v-alert color="red" type="error" :value="error" v-if="current_tab==0">Failed to register.</v-alert>
                            <v-alert :value="!error" color="green" type="success" v-if="current_tab==0">Succcessfully registered!</v-alert>
                            <v-card-text>
                                <v-form v-if="current_tab==0">
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" placeholder="student@rpi.edu" v-model="email" required></v-text-field>
                                   
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" required></v-text-field>

                                    <v-text-field id="first" name="first" label="First Name" v-model="first_name" required></v-text-field>

                                    <v-text-field id="last" name="last" label="Last Name" v-model="last_name" required></v-text-field>
                                </v-form>
                                <v-form v-if="current_tab==1">
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" placeholder="student@rpi.edu" v-model="email"></v-text-field>

                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn v-if="current_tab==1" color="primary" v-on:click="login(email, password)">Login</v-btn>

                                <v-btn v-if="current_tab==0" color="primary" v-on:click="register(email, password, last_name, first_name)">Register</v-btn>
                            </v-card-actions>
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
    data: () => ({
        drawer: null,
        current_tab: 0,
        password: "",
        email: "",
        error: false,
        registered: false,
    }),

    props: {
        source: String
    },

    methods: {
        login: function(email, password) {
            console.log("login");

            $.ajax({
                type: "POST",
                url: store.state.url + "/login",
                data: {"email": email, "pass": password},
                success: (data) => {
                    if (data != false) {
                        localStorage.setItem('user', JSON.stringify(data));
                        this.error = !data;

                        if (!this.error) {
                            /*
                            $.ajax({
                                type: "GET",
                                url: store.state.url + "/get_all_courses",

                                beforeSend: function (xhr) {
                                    var token = localStorage.getItem("user");
                                    token = token.substring(1, token.length - 1);
                                    console.log("token");
                                    xhr.setRequestHeader ("Authorization", "Bearer " + token);
                                    xhr.setRequestHeader("Access-Control-Allow-Origin", store.state.url)
                                },

                                success: function(data) {
                                    var courses = [];
                                    for (let i = 0; i < data.length; i++) {
                                        var course = data[i]["title"];
                                        courses.push(course);
                                    }
                                    store.commit('update_courses', courses);
                                }
                            });*/

                            router.push('/create_user');
                        }
                    }
                }
            });
        },

        register: function(email, password, last_name, first_name) {
            console.log("register");
            $.ajax({
                type: "POST",
                url: store.state.url + "/register",
                data: {"email": email, "pass": password, "first": first_name, "last": last_name},
                success: (data) => {
                    console.log(data);

                    this.error = !data;
                    if (!this.error) {
                        this.registered = true;
                    }

                }
            });
        }
    },
}
</script>
