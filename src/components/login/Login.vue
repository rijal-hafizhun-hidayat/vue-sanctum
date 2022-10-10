<template>
    
    <div class="container">
        <loading v-model:active="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage" />
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="log">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" v-model="login.username" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" v-model="login.password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { reactive, ref } from '@vue/reactivity'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'Login',
    components: { Loading },
    setup(){
        let login = reactive({
            username: '',
            password: '',
            loggedInd: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token')
        });

        let error = reactive({
            username: '',
            password: '',
            message: ''
        });

        const route = useRouter()
        let isLoading = false
        let fullPage = true

        localStorage.clear()

        function log(){
            axios.get(`http://localhost:8000/sanctum/csrf-cookie`)
            .then(() => {
                axios.post(`http://localhost:8000/api/login`, {
                    username: login.username,
                    password: login.password
                }).then((res) => {
                    if(res.data.status == true){
                
                        isLoading = true
                        setTimeout(() => {
                            isLoading = false
                        },5000)

                        localStorage.setItem('loggedIn', true)
                        localStorage.setItem('token', res.data.token)
                        
                        return route.push({
                            name: 'dashboard'
                        })
                    }
                    else{
                        loggedInd = false;
                    }
                }).catch((err) => {
                    //console.log(err);
                    if(err.response.data.status == false){
                        error.message = err.response.data.message
                        Swal.fire({
                            title: 'Failed',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
                    }

                    error.username = err.response.data.errors.username
                    error.password = err.response.data.errors.password

                    Swal.fire({
                        title: 'Failed',
                        text: [error.username, error.password],
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                })
            }).catch((err) => {
                console.log(err)
            })
        }

        return{
            login, error, route, fullPage, isLoading, log
        };
    }
}
</script>

<style scoped>
    .container{
        margin-top: 50px;
        width: 600px;
    }
</style>