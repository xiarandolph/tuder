import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        url: 'http://localhost:8081',
        courses: ["test"],
    },
    mutations: {
        update_courses: (state, data) => {
            console.log(data);
            console.log(state);
            state.courses = data;
        }
    },
    actions: {
        get_courses: (state) => {
            var token = localStorage.getItem("user");
            token = token.substring(1, token.length - 1);
            axios.get('http://localhost:8081' + '/get_all_courses', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(r => r.data)
                .then(courses => {
                    return courses;
                })
        }
    },
    getters: {
        get_courses: state => {
          return state.courses
        }
    }
})
