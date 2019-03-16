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
                            <v-card-text>
                                <v-form v-if="current_tab==1">
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" placeholder="student@rpi.edu" v-model="email" required></v-text-field>
                                   
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" required></v-text-field>
                                </v-form>

                                <v-form v-if="current_tab==0">
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" placeholder="student@rpi.edu" v-model="email" required></v-text-field>
                                   
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password" required></v-text-field>

                                    <v-text-field id="first" name="first" label="First Name" v-model="first_name" required></v-text-field>

                                    <v-text-field id="last" name="last" label="Last Name" v-model="last_name" required></v-text-field>
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
			current_tab: null,
			password: "",
			email: "",
		}),

		props: {
			source: String
		},

		methods: {
			login: function(email, password) {
				$.ajax({
					type: "POST",
					url: store.state.url + "/login",
					data: {"email": email, "pass": password},
					success: (data) => {
						console.log(data);
					}
				});
			},

			register: function(email, password, last_name, first_name) {
				$.ajax({
					type: "POST",
					url: store.state.url + "/register",
					data: {"email": email, "pass": password, "first": first_name, "last": last_name},
					success: (data) => {
						console.log(data);
					}
				});
			}
		}
    }
</script>