<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-btn depressed="true" color="white" block="true">Register</v-btn>
                                <v-btn depressed="true" color="white" block="true">Login</v-btn>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="email" label="Email" type="text" placeholder="student@rpi.edu"></v-text-field>
                                   
                                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
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